import { Scene, Engine, UniversalCamera, Vector3, HemisphericLight, PointLight, DirectionalLight, SpotLight, MeshBuilder, ActionManager, ExecuteCodeAction } from "@babylonjs/core";

const initScene = async function (engine: Engine, canvas: HTMLCanvasElement) {
    // create a new scene
    const scene = new Scene(engine);

    // add a camera to the scene
    const camera = new UniversalCamera("camera1", new Vector3(0, 5, -10), scene);

    // make camera look at the origin
    camera.setTarget(Vector3.Zero());

    // add keyboard control to the camera
    camera.attachControl(canvas, true);

    // add a light to the scene and give the light lower intensity
    // 🔆
    const dLight = new DirectionalLight("dLight1", new Vector3(0, -1, 0), scene);
    dLight.intensity = 0.7;
    // ⚪️
    const hLight = new HemisphericLight("hLight1", new Vector3(0, 1, 0), scene);
    hLight.intensity = 0.7;
    // 💡
    const pLight = new PointLight("pLight1", new Vector3(2, 1, 0), scene);
    pLight.intensity = 0.7;
    // 🔦
    const sLight = new SpotLight("sLight1", new Vector3(-4, 1, 0), new Vector3(1, -0.25, 0), Math.PI / 3, 10, scene);
    sLight.intensity = 0.7;

    // add a sphere to the scene
    const sphere = MeshBuilder.CreateSphere("sphere1", { segments: 16, diameter: 2 }, scene);
    
    // move the sphere on the y axis
    sphere.position.y = 1;

    // add a ground plane
    const ground = MeshBuilder.CreateGround("ground1", { width: 6, height: 6, subdivisions: 2 }, scene);

    // actions to cycle through light types
    scene.actionManager = new ActionManager(scene);

    const lights = [dLight, hLight, pLight, sLight];
    let currentLight = 0;
    lights.forEach((light, idx) => idx === currentLight ? light.setEnabled(true) : light.setEnabled(false))

    scene.actionManager.registerAction(
        new ExecuteCodeAction(
            {
                trigger: ActionManager.OnKeyUpTrigger,
                parameter: ' '
            },
            function () { 
                currentLight = (currentLight + 1) % lights.length;
                lights.forEach((light, idx) => idx === currentLight ? light.setEnabled(true) : light.setEnabled(false))
            }
        )
    );

    return scene;
};

export default initScene;