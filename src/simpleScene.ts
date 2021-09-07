import { Scene, FreeCamera, Vector3, HemisphericLight, Mesh, MeshBuilder } from "@babylonjs/core";

var simpleScene = async function (scene: Scene, canvas: HTMLCanvasElement) {
    // add a camera to the scene
    var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

    // make camera look at the origin
    camera.setTarget(Vector3.Zero());

    // add keyboard control to the camera
    camera.attachControl(canvas, true);

    // add a light to the scene
    var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

    // give the light lower intensity
    light.intensity = 0.7;

    // add a sphere to the scene
    var sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);

    // move the sphere on the y axis
    sphere.position.y = 1;

    // add a ground plane
    var ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);

    // initialize xr with ground as floorMeshes for teleportation
    const xr = await scene.createDefaultXRExperienceAsync({
        floorMeshes: [ground]
    });

    return scene;
};

export default simpleScene;