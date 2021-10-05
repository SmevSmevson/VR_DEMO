import { Color3, Scene, Engine, UniversalCamera, Vector3, HemisphericLight, StandardMaterial, Mesh, MeshBuilder, ShadowGenerator, Texture, DirectionalLight, RenderTargetTexture, AbstractMesh } from "@babylonjs/core";

const initScene = async function (engine: Engine, canvas: HTMLCanvasElement) {
    // create a new scene
    const scene = new Scene(engine);

    // add a camera to the scene
    var camera = new UniversalCamera("camera1", new Vector3(0, 5, -10), scene);

    // make camera look at the origin
    camera.setTarget(Vector3.Zero());

    // add keyboard control to the camera
    camera.attachControl(canvas, true);

    // add a light to the scene
    const light = new DirectionalLight("light1", new Vector3(45, -30, 20), scene);

    // light color to white
    light.diffuse = new Color3(1, 1, 1);

    // give the light lower intensity
    light.intensity = 0.7;
    light.shadowEnabled = true;

    const pavement = new StandardMaterial("pavement", scene);
	pavement.diffuseTexture = new Texture("assets/textures/granite_pavement_01_albedo.png", scene);
	pavement.bumpTexture = new Texture("assets/textures/granite_pavement_01_normal.png", scene);
    pavement.invertNormalMapX = true;
    pavement.invertNormalMapY = true;

    const grass = new StandardMaterial("grass", scene);
    grass.diffuseTexture = new Texture("assets/textures/grass_albedo.jpg", scene);
    // grass.bumpTexture = new Texture("assets/textures/grass_bump.jpg", scene).irradianceTexture;
    grass.specularTexture = new Texture("assets/textures/grass_specular.jpg", scene);
    grass.specularPower = 0.001; 

    (grass.diffuseTexture as Texture).uScale = 30;
	(grass.diffuseTexture as Texture).vScale = 30;
    (grass.specularTexture as Texture).uScale = 30;
	(grass.specularTexture as Texture).vScale = 30;

    // add a sphere to the scene
    const sphere = MeshBuilder.CreateSphere("sphere1", {segments: 16,　diameter: 1.5 }, scene);
    // move the sphere on the y axis
    sphere.position = new Vector3(0, 1, 0);
    // add pavement material to the sphere
    sphere.material = pavement;
    
    // add cylinders to the scene
    const cylinder1 = Mesh.CreateCylinder("cylinder1", 2, 1, 1, 16, 0, scene);
    cylinder1.material = pavement;
    cylinder1.position = new Vector3(2, 1, 3);
    const cylinder2 = Mesh.CreateCylinder("cylinder1", 2, 1, 1, 16, 0, scene);
    cylinder2.material = pavement;
    cylinder2.position = new Vector3(-2, 1, 3);

    const shadowGenerator = new ShadowGenerator(1024, light);
    const sg = shadowGenerator.getShadowMap();
    if (sg !== null) {
       (sg.renderList as AbstractMesh[]).push(sphere);
       (sg.renderList as AbstractMesh[]).push(cylinder1);
       (sg.renderList as AbstractMesh[]).push(cylinder2);
    }
    shadowGenerator.useExponentialShadowMap = true;
    shadowGenerator.darkness = 0.5;
    
    // add a ground plane
    var ground = MeshBuilder.CreateGround("ground1", { width: 30, height: 30, subdivisions: 2 }, scene);
    ground.material = grass;
    ground.receiveShadows = true;

    // initialize xr with ground as floorMeshes for teleportation
    const xr = await scene.createDefaultXRExperienceAsync({
        floorMeshes: [ground]
    });

    scene.registerBeforeRender(function () {
		sphere.rotation.x += 0.01;
		sphere.rotation.z += 0.02;
	});

    return scene;
};

export default initScene;