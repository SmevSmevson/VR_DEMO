import { Scene, Engine, SceneLoader, UniversalCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";
// import { OBJFileLoader } from '@babylonjs/loaders';

var initScene = async function (engine: Engine, canvas: HTMLCanvasElement) {
    // create a new scene
    const scene = new Scene(engine);

    // add a camera to the scene
    var camera = new UniversalCamera("camera1", new Vector3(0, 5, -10), scene);

    // make camera look at the origin
    camera.setTarget(Vector3.Zero());

    // add keyboard control to the camera
    camera.attachControl(canvas, true);

    // add a light to the scene
    var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

    // give the light lower intensity
    light.intensity = 0.7;

    // import a custom mesh
    const lantern = SceneLoader.Append("/assets/models/", "lantern2.obj", scene, function (scene) { 
        console.log('successfully loaded model')
    });
    
    return scene;
};

export default initScene;