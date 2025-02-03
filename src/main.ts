import { ArcRotateCamera, CreateSphere, Engine, HemisphericLight, Mesh, MeshBuilder, Scene, SceneLoader, Vector3 } from 'babylonjs';
import './style.css'
import 'babylonjs-loaders'

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement | null;

const engine = new Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});

const createScene = function() {

  // Create a basic BJS Scene object
  const scene = new Scene(engine);

  // Create an ArcRotateCamera
  const camera = new ArcRotateCamera('camera1', Math.PI / 2, 1, 10, new Vector3(0, 0, 0), scene);
  
  // Attach the camera to the canvas
  camera.attachControl(canvas, false);
  
  // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
  const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
  
  // Create a built-in "sphere" shape using the SphereBuilder
  const sphere = MeshBuilder.CreateSphere('sphere1', {segments: 16, diameter: 2, sideOrientation: Mesh.FRONTSIDE}, scene);

  // Move the sphere upward 1/2 of its height
  sphere.position.y = 1;

  // Create a built-in "ground" shape;
  const ground = MeshBuilder.CreateGround('ground1', {width: 6, height: 6, subdivisions: 2, updatable: false}, scene);

  SceneLoader.ImportMeshAsync('splat', './', 'cls2.splat', scene).then((result) => {
    const splat = result.meshes[0];
    splat.position = new Vector3(0, 0, 0);
  });

  // Return the created scene
  return scene;
}

// call the createScene function
const scene = createScene();

// run the render loop
engine.runRenderLoop(function() {
  scene.render();
});

// the canvas/window resize event handler
window.addEventListener('resize', function(){
  engine.resize();
});