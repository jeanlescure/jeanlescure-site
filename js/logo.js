/*

  "A lot of mothers will do anything for their children, except let them be themselves."

      - Banksy, Wall and Piece

*/

// In case you're wondering, The models and materials used
// in this website were created by me using Illustrator and Blender.

function create_logo(){
  // load model
  THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
  var loader = new THREE.OBJMTLLoader();
  loader.load( '/obj/logo.obj', '/obj/logo.mtl', function ( object ) {
    logo = object;
    
    logo.scale.set(45,45,45);
    windowAspect = window.innerWidth / window.innerHeight;
    
    logo.rotation.set(-0.30,-0.90,-0.2);
    
    scene.add( logo );

    pointLight.target = logo;
    
    $(document).trigger('loadable_loaded');
  }, function(x){}, function(x){} );
}

function position_logo(){
  var vector = new THREE.Vector3();
  vector.set(
    ( window.innerWidth / window.innerWidth ) * 2 - 1,
    - ( window.innerHeight / window.innerHeight ) * 2 + 1,
    0
  );

  vector.unproject( camera );

  var dir = vector.sub( camera.position ).normalize();

  var distance = - camera.position.z / dir.z;

  var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );

  logo.position.set(pos.x - 170, pos.y + 20, 0);
}