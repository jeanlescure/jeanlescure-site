/*

  "...remember when you're feeling very small and insecure
  how amazingly unlikely is your birth
  and pray that there's intelligent life somewhere up in space
  cause theres bugger all down here on Earth."
  
      - Man in Pink, Monty Python's The Meaning of Life

*/

var scene;
var camera;
var renderer;
var animation_callback;
var pointLight;

function create_scene($container,width,height){
  // set the scene size
  var WIDTH = width,
    HEIGHT = height;

  // set some camera attributes
  var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

  // create a WebGL renderer, camera
  // and a scene
  renderer = new THREE.WebGLRenderer();
  camera =
    new THREE.PerspectiveCamera(
      VIEW_ANGLE,
      ASPECT,
      NEAR,
      FAR);

  scene = new THREE.Scene();

  // add the camera to the scene
  scene.add(camera);

  // the camera starts at 0,0,0
  // so pull it back
  camera.position.z = 300;

  // start the renderer
  renderer.setSize(WIDTH, HEIGHT);
  
  // create a point light
  pointLight =
    new THREE.SpotLight(0xFFFFFF);

  // set its position
  pointLight.position.x = 0;
  pointLight.position.y = 0;
  pointLight.position.z = 530;

  // add to the scene
  scene.add(pointLight);

  // attach the render-supplied DOM element
  $container.append(renderer.domElement);
}

function animate(){
  requestAnimationFrame( animate );
  
  if (typeof animation_callback === 'function'){
    animation_callback();
  }
  
  renderer.render(scene, camera);
}