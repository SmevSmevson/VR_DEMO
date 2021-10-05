import { Scene, Engine, UniversalCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";

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

    // add primitive meshes
    const box = MeshBuilder.CreateBox('box1', { size: 1, width: 1, height: 1, depth: 1 }, scene);
    const capsule = MeshBuilder.CreateCapsule('capsule1', { height: 2, radius: 0.5, capSubdivisions: 4, tessellation: 6, subdivisions: 1}, scene);
    const cylinder = MeshBuilder.CreateCylinder('cylinder1', { height: 2, diameter: 1, diameterTop: 1, diameterBottom: 1, tessellation: 6, subdivisions: 1 }, scene);
    const disk = MeshBuilder.CreateDisc('disk1', { radius: 0.5, tessellation: 8, arc: 1, sideOrientation: 2 }, scene);
    const icoSphere = MeshBuilder.CreateIcoSphere('icoSphere1', { radius: 0.5, flat: true, subdivisions: 2 }, scene);
    const sphere = MeshBuilder.CreateSphere('sphere', { segments: 4, diameter: 1, arc: 1, slice: 1}, scene);
    const torus = MeshBuilder.CreateTorus('torus1', { diameter: 1, thickness: 0.1, tessellation: 16 }, scene);

    // change mesh positions
    box.position.x = -6;
    capsule.position.x = -4;
    cylinder.position.x = -2;
    disk.position.x = 0;
    icoSphere.position.x = 2;
    sphere.position.x = 4;
    torus.position.x = 6;

    return scene;
};

export default initScene;