import { Scene, Engine, SceneLoader, UniversalCamera, Vector3, HemisphericLight, MeshBuilder, Mesh, Texture, StandardMaterial, Color3, TransformNode, PointLight } from "@babylonjs/core";
import * as GUI from '@babylonjs/gui'
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
    var light = new HemisphericLight("light1", new Vector3(0, -1, 0), scene);
    var lightBulb = new PointLight("light2", new Vector3(0, 2.4, 0), scene);

    // give the light lower intensity
    light.intensity = 0.7;

    // give the light a lower intensity and different hue
    lightBulb.intensity = 0.6;
    lightBulb.radius = 2.5;
    lightBulb.diffuse = new Color3(1, 0.95, 0.94)


    // create scene materials
    const woodMaterial = new StandardMaterial("wood", scene);
    const glassMaterial = new StandardMaterial("glass", scene);
    const wallMaterial = new StandardMaterial("wall", scene);
    const carpetMaterial = new StandardMaterial("carpet", scene);
    const colorMaterial = new StandardMaterial("color", scene);
    
    // set material textures
    woodMaterial.diffuseTexture = new Texture("./assets/textures/wood_albedo.png", scene);;
    glassMaterial.diffuseTexture = new Texture("./assets/textures/frosted-glass_albedo.jpg", scene);
    glassMaterial.alpha = 0.5;
    wallMaterial.diffuseTexture = new Texture("./assets/textures/wall_albedo.jpg", scene);
    carpetMaterial.diffuseTexture = new Texture("./assets/textures/carpet_albedo.jpg", scene);
    colorMaterial.diffuseColor = new Color3(0.058, 0.074, 0.356);

    // import a custom mesh
    const room = await SceneLoader.ImportMeshAsync("", "./assets/models/room3.glb");

    // set up materials on the mesh
    const dividerMesh_h = room.meshes[4]; // scene.getMeshByName("Wood_dividers_h_Cube.003");
    const dividerMesh_v = room.meshes[5]; // scene.getMeshByName("Wood_dividers_v_Cube.004");
    const roomCarpet = room.meshes[1]; // scene.getMeshByName("Room_floor_Cube");
    const roomPaint = room.meshes[7]; // scene.getMeshByName("Room_wall_painted_Cube.006");
    const roomWallpaper = room.meshes[6]; //scene.getMeshByName("Room_wallpaper_Cube.005");
    const roomWindow = room.meshes[8]; // scene.getMeshByName("Room_window_Cube.007");
    const woodMesh_h = room.meshes[3]; // scene.getMeshByName("Wood_h_Cube.002");
    const woodMesh_v = room.meshes[2]; //scene.getMeshByName("Wood_v_Cube.001");

    
    if (dividerMesh_h && dividerMesh_v && roomCarpet && roomPaint && roomWallpaper && roomWindow && woodMesh_h && woodMesh_v) {
        dividerMesh_h.material = woodMaterial;
        dividerMesh_v.material = woodMaterial;
        roomCarpet.material = carpetMaterial;
        roomPaint.material = colorMaterial;
        roomWallpaper.material = wallMaterial;
        roomWindow.material = glassMaterial;
        woodMesh_h.material = woodMaterial;
        woodMesh_v.material = woodMaterial;

        woodMesh_h.isVisible = false;
        woodMesh_v.isVisible = false;
        dividerMesh_h.isVisible = false;
        dividerMesh_v.isVisible = false;
    }

    const ground = MeshBuilder.CreateGround("ground1", { width: 2, height: 2, subdivisions: 2 }, scene);
    ground.isVisible = false;

    // Create the 3D UI manager
    const manager = new GUI.GUI3DManager(scene);
    var panel = new GUI.StackPanel3D();
    panel.margin = 0.5;

    manager.addControl(panel);
    
    // ui
    const anchor = new TransformNode("anchor", scene);
    panel.linkToTransformNode(anchor);
    anchor.rotation.y = 90 * (Math.PI / 180);
    anchor.position = new Vector3(1, 1, 0);
    anchor.scaling = new Vector3(0.25, 0.25, 0.25);


    // buttons
    const grainHButton = new GUI.Button3D("grain horizontal");
    const grainHButtonText = new GUI.TextBlock();
    grainHButtonText.text = "grain horizontal";
    grainHButtonText.color = "white";
    grainHButtonText.fontSize = 24;
    grainHButton.content = grainHButtonText;  
    panel.addControl(grainHButton);

    const grainVButton = new GUI.Button3D("grain vertical");
    const grainVButtonText = new GUI.TextBlock();
    grainVButtonText.text = "grain vertical";
    grainVButtonText.color = "white";
    grainVButtonText.fontSize = 24;
    grainVButton.content = grainVButtonText;  
    panel.addControl(grainVButton);
    
    const dividerVButton = new GUI.Button3D("vertical divider");
    const dividerVButtonText = new GUI.TextBlock();
    dividerVButtonText.text = "vertical divider";
    dividerVButtonText.color = "white";
    dividerVButtonText.fontSize = 24;
    dividerVButton.content = dividerVButtonText;  
    panel.addControl(dividerVButton);

    const dividerHButton = new GUI.Button3D("horizontal divider");
    const dividerHButtonText = new GUI.TextBlock();
    dividerHButtonText.text = "horizontal divider";
    dividerHButtonText.color = "white";
    dividerHButtonText.fontSize = 24;
    dividerHButton.content = dividerHButtonText;  
    panel.addControl(dividerHButton);

    const lightSwitch = new GUI.Button3D("light switch");
    const lightSwitchText = new GUI.TextBlock();
    lightSwitchText.text = "light";
    lightSwitchText.color = "white";
    lightSwitchText.fontSize = 24;
    lightSwitch.content = lightSwitchText;  
    manager.addControl(lightSwitch);
    lightSwitch.linkToTransformNode(anchor);
    lightSwitch.position = new Vector3(3, 0, -8.5);

    // button events
    grainHButton.onPointerUpObservable.add(function(){
        if (woodMesh_h && woodMesh_v) {
            woodMesh_h.isVisible = !woodMesh_h.isVisible;
            woodMesh_v.isVisible = false;
        }
    });

    grainVButton.onPointerUpObservable.add(function(){
        if (woodMesh_h && woodMesh_v) {
            woodMesh_v.isVisible = !woodMesh_v.isVisible;
            woodMesh_h.isVisible = false;
        }
    });

    dividerHButton.onPointerUpObservable.add(function(){
        if (dividerMesh_h) {
            dividerMesh_h.isVisible = !dividerMesh_h.isVisible;
        }
    });

    dividerVButton.onPointerUpObservable.add(function(){
        if (dividerMesh_v) {
            dividerMesh_v.isVisible = !dividerMesh_v.isVisible;
        }
    });

    lightSwitch.onPointerUpObservable.add(function(){
        lightBulb.setEnabled(!lightBulb.isEnabled());
    });

    // initialize xr with ground as floorMeshes for teleportation
    const xr = await scene.createDefaultXRExperienceAsync({
        floorMeshes: [ground]
    });
    
    return scene;
};

export default initScene;