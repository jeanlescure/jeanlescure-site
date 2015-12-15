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
    
    logo.scale.set(100,100,100);
    windowAspect = window.innerWidth / window.innerHeight;
    position_logo();
    logo.rotation.set(0,0.80,0);
    
    scene.add( object );
    
    $(document).trigger('loadable_loaded');
  }, function(x){}, function(x){} );
}

function position_logo(){
  logo.position.set(-(140 * windowAspect),-(50 * (630 / (window.innerHeight / 2))),-(880 / windowAspect));
}