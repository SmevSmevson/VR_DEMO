import { Scene, Engine, UniversalCamera, Vector3, HemisphericLight, StandardMaterial, MeshBuilder, Texture } from "@babylonjs/core";

const initScene = async function (engine: Engine, canvas: HTMLCanvasElement) {
    // create a new scene
    const scene = new Scene(engine);

    // add a camera to the scene
    const camera = new UniversalCamera("camera1", new Vector3(0, 5, -10), scene);

    // make camera look at the origin
    camera.setTarget(Vector3.Zero());

    // add keyboard control to the camera
    camera.attachControl(canvas, true);

    // add a light to the scene
    const light = new HemisphericLight("light1", new Vector3(0.125, 1, 0.06), scene);

    // give the light lower intensity
    light.intensity = 0.7;

    const pavement = new StandardMaterial("pavement", scene);
	pavement.diffuseTexture = new Texture("assets/textures/granite_pavement_01_albedo.png", scene);
	pavement.bumpTexture = new Texture("assets/textures/granite_pavement_01_normal.png", scene);
    pavement.invertNormalMapY = true;
    pavement.invertNormalMapX = true;

    const grass = new StandardMaterial("grass", scene);
    grass.diffuseTexture = new Texture("assets/textures/grass_albedo.jpg", scene);
    grass.specularTexture = new Texture("assets/textures/grass_specular.jpg", scene);
    grass.specularPower = 0.001; 

    // add a sphere to the scene
    const sphere = MeshBuilder.CreateSphere("sphere1", { segments: 16,　diameter: 1.5 }, scene);
    // move the sphere on the y axis
    sphere.position = new Vector3(0, 1, 0);
    // add pavement material to the sphere
    sphere.material = pavement;
    
    // add a ground tiled ground plane
    const ground = MeshBuilder.CreateTiledGround("ground1", { xmin: -1, zmin: -1, xmax: 1, zmax: 1, subdivisions: { w: 30, h: 30 } }, scene);
    ground.scaling.set(30, 1, 30);

    // add a ground plane
    // const ground = MeshBuilder.CreateGround("ground1", { width: 30, height: 30, subdivisions: 2 }, scene);
    // change the material texture scale
    // (grass.diffuseTexture as Texture).uScale = 30;
	// (grass.diffuseTexture as Texture).vScale = 30;
    // (grass.specularTexture as Texture).uScale = 30;
	// (grass.specularTexture as Texture).vScale = 30;

    ground.material = grass;
    ground.receiveShadows = true;

    // some random rotation to see the shader better
    scene.registerBeforeRender(function () {
		sphere.rotation.x += 0.001;
		sphere.rotation.z += 0.002;
	});

    return scene;
};

export default initScene;