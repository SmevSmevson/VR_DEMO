import { Scene, Engine, TransformNode, UniversalCamera, Vector3 } from "@babylonjs/core";
import * as GUI from '@babylonjs/gui'

let currentScene = 0;

const initUI = async function (engine: Engine, canvas: HTMLCanvasElement) {
    // create a new scene
    const scene = new Scene(engine);

    // add a camera to the scene
    var camera = new UniversalCamera("camera1", new Vector3(0, 5, -10), scene);

    // make camera look at the origin
    camera.setTarget(Vector3.Zero());

    // add keyboard control to the camera
    camera.attachControl(canvas, true);

    const anchor = new TransformNode("anchor", scene);

   // Create the 3D UI manager
    const manager = new GUI.GUI3DManager(scene);

    // Let's add a button
    const nextButton = new GUI.Button3D("next");
    manager.addControl(nextButton);
    nextButton.linkToTransformNode(anchor);
    nextButton.position.z = -1.5;
    nextButton.position.x = 5;

    nextButton.onPointerUpObservable.add(function(){
        currentScene ++;
        console.log(currentScene);
    });   
    
    const textNext = new GUI.TextBlock();
    textNext.text = "next";
    textNext.color = "white";
    textNext.fontSize = 24;
    nextButton.content = textNext;  

    // Let's add a button
    const previousButton = new GUI.Button3D("previous");
    manager.addControl(previousButton);
    previousButton.linkToTransformNode(anchor);
    previousButton.position.z = -1.5;
    previousButton.position.x = -5;

    previousButton.onPointerUpObservable.add(function(){
        currentScene --;
        console.log(`scene: ${ currentScene }`);
    });   
    
    const textPrevious = new GUI.TextBlock();
    textPrevious.text = "previous";
    textPrevious.color = "white";
    textPrevious.fontSize = 24;
    previousButton.content = textPrevious;  
};

export { initUI, currentScene };