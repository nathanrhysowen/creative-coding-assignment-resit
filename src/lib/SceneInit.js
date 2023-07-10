import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import Circle from './circles';

// SceneInit is a class that sets up and manages a 3D scene using three.js.
export default class SceneInit {
  // The constructor initializes properties of the class.
  constructor(canvasID, camera, scene, stats, controls, renderer, fov = 50) {
    this.fov = fov; // Field of view for the camera
    this.scene = scene; // The 3D scene
    this.stats = stats; // Performance monitor
    this.camera = camera; // The camera
    this.controls = controls; // Controls for the camera
    this.renderer = renderer; // Renderer for the scene
    this.canvasID = canvasID; // ID of the canvas element to render to
    this.circles = []; // Array to hold Circle objects
  }

  // initScene sets up the scene, camera, renderer, controls, and lights.
  initScene() {
    // Create a perspective camera
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 196; // Position the camera

    this.clock = new THREE.Clock(); // Clock for tracking time
    this.scene = new THREE.Scene(); // Create a new scene

    // Uniforms for shaders
    this.uniforms = {
      u_time: { type: 'f', value: 1.0 },
      colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
      colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
    };

    // Get the canvas element and create a WebGL renderer
    const canvas = document.getElementById(this.canvasID);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    // Set the size of the renderer and append it to the body
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Create OrbitControls for the camera
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Create a Stats object for performance monitoring and append it to the body
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    // Create and add an ambient light to the scene
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    this.scene.add(ambientLight);

    // Create and add a spot light to the scene
    let spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    this.scene.add(spotLight);

    // Create a Circle object, add it to the circles array, and add its mesh to the scene
    let circle = new Circle();
    this.circles.push(circle);
    this.scene.add(circle.mesh);

    // Add an event listener to create a new Circle when a key is pressed
    window.addEventListener('keypress', () => this.createCircle());
  }

  // createCircle creates a new Circle, adds it to the circles array, and adds its mesh to the scene
  createCircle() {
    let circle = new Circle();
    this.circles.push(circle);
    this.scene.add(circle.mesh);
  }

  // animate updates and renders the scene for each frame
  animate() {
    // Request the next animation frame
    requestAnimationFrame(() => this.animate());

    // Update each Circle in the circles array
    for (let i = 0; i < this.circles.length; i++) {
      // If the Circle's update method returns false, remove it from the scene and the circles array
      if (!this.circles[i].update()) {
        this.scene.remove(this.circles[i].mesh);
        this.circles.splice(i, 1);
        i--;
      } else {
        // Otherwise, update the rotation of the Circle's mesh to match the camera's rotation
        this.circles[i].mesh.rotation.copy(this.camera.rotation);
      }
    }

    // Render the scene, update the Stats, and update the OrbitControls
    this.render();
    this.stats.update();
    this.controls.update();
  }

  // render updates the u_time uniform and renders the scene
  render() {
    this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }

  // onWindowResize updates the camera and renderer when the window is resized
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}