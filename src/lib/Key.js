import { Player } from 'tone';
import { BoxGeometry, Group, Mesh, MeshBasicMaterial, MeshNormalMaterial, MeshStandardMaterial, Vector3 } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// Class definition for Key
class Key {
  note;
  inputKey;
  isFlat;
  sound;
  theta = Math.PI / 32;
  axis = new Vector3(1, 0, 0);
  point = new Vector3(0, 20, 0);
  keyMesh;
  keyGroup = new Group();

  constructor(note, inputKey, xOffset) {
    this.note = note;
    this.inputKey = inputKey;
    this.isFlat = note.length === 3;

    this.initializeSound(); // Initialize the sound for the key
    this.initializeKeyMesh(); // Initialize the key mesh
    this.initializeKeyGroup(xOffset); // Initialize the key group
  }

  // Initialize the sound for the key using the note
  initializeSound() {
    this.sound = new Player(`./acoustic_grand_piano_mp3/${this.note}.mp3`).toDestination();
  }

  // Initialize the key mesh based on whether it is a flat or natural key
  initializeKeyMesh() {
    if (this.isFlat) {
      let geometry = new BoxGeometry(4.5, 26, 4);
      let material = new MeshBasicMaterial({ color: '#0f0f0f' });
      this.keyMesh = new Mesh(geometry, material);
      this.keyMesh.position.z = 4;
      this.keyMesh.position.y = 7;
    } else {
      let geometry = new BoxGeometry(9, 40, 4);
      let material = new MeshStandardMaterial({ color: '#ffffff' });
      this.keyMesh = new Mesh(geometry, material);
    }
  }

  // Initialize the key group and set its position based on the xOffset
  initializeKeyGroup(xOffset) {
    this.keyGroup.position.x = xOffset;
    this.keyGroup.add(this.keyMesh);
  }

  // Hide the text on the key
  hideKeyText() {
    this.textMesh.visible = false;
  }

  // Render the text on the key using the provided font
  renderKeyText(font) {
    if (this.textMesh) {
      this.textMesh.visible = true;
    } else {
      const geometry = new TextGeometry(this.note[0], {
        font,
        size: 4,
        height: 2,
        
      });
      let material = new MeshNormalMaterial();
      this.textMesh = new Mesh(geometry, material);
      this.textMesh.position.z = 2;
      this.textMesh.position.x = -1.5;
      this.textMesh.position.y = -18;
      this.keyGroup.add(this.textMesh);
    }
  }

  // Rotate the keys
  rotateAroundWorldAxis(rotation) {
    this.keyGroup.position.sub(this.point);
    this.keyGroup.position.applyAxisAngle(this.axis, this.theta * rotation);
    this.keyGroup.position.add(this.point);
    this.keyGroup.rotateOnAxis(this.axis, this.theta * rotation);
  }

  // Play the key, rotate it, highlight it, and stop playing after a delay
  play(highlightColor) {
    this.rotateAroundWorldAxis(1);
    this.sound.start();
    this.keyMesh.material.color.set(highlightColor);
    setTimeout(() => this.sound.stop(), 150000);
  }

  // Stop playing the key, restore its color, and rotate it back
  stopPlaying() {
    this.keyMesh.material.color.set(this.isFlat ? '#000000' : '#ffffff');
    this.rotateAroundWorldAxis(-1);
  }
}

export default Key; // Export the Key class as the default export
