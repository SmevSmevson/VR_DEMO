import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import "@babylonjs/materials/normal";
import { Engine } from "@babylonjs/core";
import { initUI, currentScene} from './sceneSelectionUI';
import scene01Init from './01_simpleScene';
import scene02Init from './02_lightsScene';
import scene03Init from './03_shapesScene';
import scene04Init from './04_materialsScene';
import scene05Init from './05_customShaderScene';
import scene06Init from './06_shadowsScene';
import scene07Init from './07_physicsScene';
import scene08Init from './08_importMeshScene';
import scene09Init from './09_importComplexMeshScene';


const App = async() => {
    // get dom canvas reference
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

    // initialize babylon engine
    const engine = new Engine(canvas, true);

    // Create the scenes
    await scene01Init(engine, canvas);
    await scene02Init(engine, canvas);
    await scene03Init(engine, canvas);
    await scene04Init(engine, canvas);
    await scene05Init(engine, canvas);
    await scene06Init(engine, canvas);
    await scene07Init(engine, canvas);
    await scene08Init(engine, canvas);
    await scene09Init(engine, canvas);
    
    // Create the UI
    await initUI(engine, canvas);
    // set autoClear to false so it won't clear the rendered scene behind it
    engine.scenes[engine.scenes.length - 1].autoClear = false;
    
    // start the render loop
    engine.runRenderLoop(() => {
        // render current playable scene
        engine.scenes[Math.abs(currentScene) % (engine.scenes.length - 1)].render();
        // render UI on top of the scene
        engine.scenes[engine.scenes.length - 1].render();
    });

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });
}

App();