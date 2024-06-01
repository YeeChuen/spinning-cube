// important variable
let camera, scene, renderer, cube;

// create a init function that initialize the variable above
function init() {
  // initialize a scene, we need a scene
  // when we're using three.js, use keyword 'new' and capital THREE.
  scene = new THREE.Scene();

  // we need a camera (the viewer's perspective)
  // initialize camera (in this case, we're using perspective camera, there is also Orthographic projection)
  camera = new THREE.PerspectiveCamera(
    75, // <-- angle
    window.innerWidth / window.innerHeight, // <-- ratio
    0.1, // <-- near plane
    1000 // <-- far plane
  );

  // render it out
  // initialize renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  // set renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);

  // add this element to HTML
  document.body.appendChild(renderer.domElement);

  // create our object in the scene
  const geometry = new THREE.BoxGeometry(3, 3, 3);
  // create a mapping to our desired texture
  const texture = new THREE.TextureLoader().load("textures/crate.jpg");
  const material = new THREE.MeshBasicMaterial({ map: texture });
  // create the cube, combining the geometry and material
  cube = new THREE.Mesh(geometry, material);

  // add the object to the scene
  scene.add(cube);

  // re-position the camera so viewer can see the cube
  camera.position.z = 5;
}

// draw the scene everytime the screen is refresh (60fps)
function animate() {
  requestAnimationFrame(animate);

  // cube auto movement
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// however, we still need to resize the 3D object whenever the window is resized.
function onWindowResize() {
    // update the camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();

    // reset the size of renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false)

init();
animate();