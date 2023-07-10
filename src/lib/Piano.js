import { Group } from 'three';
import Key from './Key';


// Class definition for Piano
class Piano {
  flatKeys = []; // Array to store flat keys
  naturalKeys = []; // Array to store natural keys
  displayText = true; // Boolan to determine whether to display text on keys
  highlightColor = '#61DBFB'; // Color used for highlighting keys
  pianoGroup = new Group(); // Group to hold all the piano keys

  constructor() {
    this.initializeKeys(); // Initialize the keys
    this.initializePianoGroup(); // Initialize the piano group
  }

  // Initialize the flat and natural keys
  initializeKeys() {
    let flatKeyData = [
      ['Db3', '2', 5],
      ['Eb3', '3', 15],
      ['Gb3', '5', 35],
      ['Ab3', '6', 45],
      ['Bb3', '7', 55],
      ['Db4', 's', 75],
      ['Eb4', 'd', 85],
      ['Gb4', 'g', 105],
      ['Ab4', 'h', 115],
      ['Bb4', 'j', 125],
    ];

    let naturalKeyData = [
      ['C3', 'q', 0],
      ['D3', 'w', 10],
      ['E3', 'e', 20],
      ['F3', 'r', 30],
      ['G3', 't', 40],
      ['A3', 'y', 50],
      ['B3', 'u', 60],
      ['C4', 'z', 70],
      ['D4', 'x', 80],
      ['E4', 'c', 90],
      ['F4', 'v', 100],
      ['G4', 'b', 110],
      ['A4', 'n', 120],
      ['B4', 'm', 130],
    ];

    // Create flat keys using the flatKeyData
    this.flatKeys = flatKeyData.map(([note, inputKey, position]) => new Key(note, inputKey, position));

    // Create natural keys using the naturalKeyData
    this.naturalKeys = naturalKeyData.map(([note, inputKey, position]) => new Key(note, inputKey, position));
  }

  // Initialize the piano group
  initializePianoGroup() {
    this.pianoGroup.position.x = -65;
    this.pianoGroup.rotation.x = -Math.PI / 4;

    // Add all the flat and natural keys to the piano group
    this.pianoGroup.add(
      ...this.flatKeys.map((key) => key.keyGroup),
      ...this.naturalKeys.map((key) => key.keyGroup)
    );
  }

  // Hide the text on the natural keys
  hideText() {
    this.naturalKeys.forEach((key) => key.hideKeyText());
  }

  // Render the text on the natural keys 
  renderText(font) {
    this.naturalKeys.forEach((key) => key.renderKeyText(font));
  }

  // Get the piano group
  getPianoGroup() {
    return this.pianoGroup;
  }

  // Get the key based on the input key
  getKeyFromInput(inputKey) {
    return this.flatKeys.find((k) => k.inputKey === inputKey) || this.naturalKeys.find((k) => k.inputKey === inputKey);
  }

  // Play the note if the key exists
  maybePlayNote(eventKey) {
    let key = this.getKeyFromInput(eventKey);
    if (key) key.play(this.highlightColor);
  }

  // Stop playing the note if the key exists
  maybeStopPlayingNote(eventKey) {
    let key = this.getKeyFromInput(eventKey);
    if (key) key.stopPlaying();
  }
}

export default Piano; // Export the Piano class as the default export
