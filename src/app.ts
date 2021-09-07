import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene } from "@babylonjs/core";
import simpleScene from './simpleScene';


class App {
    constructor() {
        // get dom canvas reference
        var canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

        // initialize babylon engine
        var engine = new Engine(canvas, true);

        // create a new scene
        var scene = new Scene(engine);

        // Create the scene
        simpleScene(scene, canvas).then(scene => {
            // start the render loop
            engine.runRenderLoop(() => scene.render());

            // Resize
            window.addEventListener("resize", function () {
                engine.resize();
            });
        });
    }
}
new App();