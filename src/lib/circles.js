
import * as THREE from 'three'
import SceneInit from './SceneInit';






// Class definition for Circle
class Circle {
    constructor() {
        this.geometry = new THREE.CircleGeometry(Math.random() * 10, 10000); // Create a circle geometry with random radius and segments
        this.material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, transparent: true, opacity: 0 }); // Create a basic mesh material with random color and transparency
        this.mesh = new THREE.Mesh(this.geometry, this.material); // Create a mesh using the circle geometry and material
        this.mesh.position.set(Math.random() * -200 - -100, Math.random() * -200 - -100, Math.random() * 200 - 50); // Set a random position for the mesh
        this.fadeIn = true; // Boolean to indicate whether the circle is fading in or out
    }

    update() {
        if (this.fadeIn) {
            this.material.opacity += 0.01; // Increase the opacity of the material to fade in
            if (this.material.opacity >= 1) {
                this.fadeIn = false; // If the opacity reaches 1, set fade in boolean to false
            }
        } else {
            this.material.opacity -= 0.01; // Decrease the opacity of the material to fade out
            if (this.material.opacity <= 0) {
                return false; // If the opacity reaches 0, return false to indicate that the circle is no longer visible
            }
        }
        return true; // Return true to indicate that the circle is still visible and needs to be updated
    }
}

export default Circle; // Export the Circle class as the default export