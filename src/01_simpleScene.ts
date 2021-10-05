import { Scene, UniversalCamera, Vector3, HemisphericLight, MeshBuilder, Engine } from "@babylonjs/core";

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
    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

    // give the light lower intensity
    light.intensity = 0.7;

    // add a sphere to the scene
    const sphere = MeshBuilder.CreateSphere("sphere1", { segments: 16, diameter: 2 }, scene);
    
    // move the sphere on the y axis
    sphere.position.y = 1;

    // add a ground plane
    const ground = MeshBuilder.CreateGround("ground1", { width: 6, height: 6, subdivisions: 2 }, scene);

    return scene;
};

export default initScene;