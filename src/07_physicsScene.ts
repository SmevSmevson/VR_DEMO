import { Engine, PhysicsImpostor, Color3, Scene, UniversalCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Mesh, CannonJSPlugin } from "@babylonjs/core";

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

    // enable physics
    // scene.enablePhysics(new Vector3(0,-9.81,0), new AmmoJSPlugin());
    scene.enablePhysics(new Vector3(0,-9.81,0), new CannonJSPlugin());

    // add a sphere with physisc to the scene
    const sphere1 = MeshBuilder.CreateSphere("sphere1", { segments: 16, diameter: 2 }, scene);
    sphere1.physicsImpostor = new PhysicsImpostor(sphere1, PhysicsImpostor.SphereImpostor, { mass: 0.5, friction: 0.1, restitution: 0.1 }, scene);
    sphere1.position.y = 5;
    sphere1.position.x = -2;


    // add a second sphere with physisc to the scene
    const sphere2 = MeshBuilder.CreateSphere("sphere2", { segments: 16, diameter: 2 }, scene);
    sphere2.physicsImpostor = new PhysicsImpostor(sphere2, PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
    sphere2.position.y = 5;
    sphere2.position.x = 2;

    // add a ground plane
    const ground = MeshBuilder.CreateGround("ground1", { width: 10, height: 10, subdivisions: 2 }, scene);
    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.PlaneImpostor, { mass: 0, restitution: 0.9 }, scene);

    sphere2.material = new StandardMaterial('color', scene);
    sphere2.physicsImpostor.registerOnPhysicsCollide(ground.physicsImpostor, function(main, collided) {
        // ugh what nasty typecasting 🤮
        ((main.object as Mesh).material as StandardMaterial).diffuseColor = new Color3(Math.random(), Math.random(), Math.random()); 
    });

    return scene;
};

export default initScene;