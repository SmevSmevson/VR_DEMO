import { Scene, UniversalCamera, Vector2, Vector3, HemisphericLight, StandardMaterial, ShaderMaterial, MeshBuilder, Texture, Engine } from "@babylonjs/core";

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

    const customShaderMaterial = new ShaderMaterial("colorfulShades", scene, "./assets/shaders/colorful", {
        attributes: ["position", "normal", "uv"],
        uniforms: ["world", "worldView", "worldViewProjection", "viewProjection", "view", "projection", "time", "direction", "resoloution"],
      });
    customShaderMaterial.setFloat("time", 0);
    customShaderMaterial.setVector2('resoloution', new Vector2(canvas.width, canvas.height));

    // add a sphere to the scene
    const sphere = MeshBuilder.CreateSphere("sphere1", { segments: 16,　diameter: 1.5 }, scene);
    // move the sphere on the y axis
    sphere.position = new Vector3(0, 1, 0);
    // add pavement material to the sphere
    sphere.material = customShaderMaterial;

    let time = 1;
    // some random rotation to see the shader better
    scene.registerBeforeRender(function () {
        time += 0.01;
        customShaderMaterial.setFloat('time', time);
        customShaderMaterial.setVector2('resoloution', new Vector2(canvas.width, canvas.height));
	});

    return scene;
};

export default initScene;