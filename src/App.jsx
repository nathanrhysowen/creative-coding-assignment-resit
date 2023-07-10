import { useEffect } from 'react';

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import SceneInit from './lib/SceneInit';
import Piano from './lib/Piano';



function App() {
 // useEffect is a React hook that runs side effects after render
 useEffect(() => {
  // Initialize a new SceneInit object with the id of the canvas element
  let test = new SceneInit('myThreeJsCanvas');
  // Initialize the scene
  test.initScene();
  // Start the animation loop
  test.animate();

  // Initialize a new Piano object
  let p = new Piano();
  // Add the piano to the scene
  test.scene.add(p.getPianoGroup());

  // Initialize a new FontLoader
  let fontLoader = new FontLoader();
  // Load the font and render the text on the piano keys when the font is loaded
  fontLoader.load('./fonts/Helvetica-Bold.typeface.json', (font) => {
    p.renderText(font);
  });

  

  // Define a function to handle keydown events
  const onKeyDown = (event) => {
    // Ignore repeated events
    if (event.repeat) {
      return;
    }
    // Play the note corresponding to the pressed key
    p.maybePlayNote(event.key);
  };

  // Define a function to handle keyup events
  let onKeyUp = (event) => {
    // Stop playing the note corresponding to the released key
    p.maybeStopPlayingNote(event.key);
  };

  // Add the event listeners to the window
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('keydown', onKeyDown);

  

  // Return a cleanup function to remove the event listeners when the component unmounts
  return () => {
    window.removeEventListener('keyup', onKeyUp);
    window.removeEventListener('keydown', onKeyDown);
  };
});

// Render a canvas element for Three.js to render the scene into
return (
  <div>
    <canvas id="myThreeJsCanvas"></canvas>
  </div>
);
}

export default App;
