/*

  "Art should comfort the disturbed and disturb the comfortable."

      - Banksy

*/

// In case you're wondering, The models and materials used
// in this website were created by me using Illustrator and Blender.

function create_graffiti(){
  // load model
  THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
  var loader = new THREE.OBJMTLLoader();
  loader.load( '/obj/graffiti.obj', '/obj/graffiti.mtl', function ( object ) {
    graffiti = object;
    
    graffiti.scale.set(100,100,100);
    windowAspect = window.innerWidth / window.innerHeight;
    position_graffiti();
    graffiti.rotation.set(0,-1.1,0);
    
    scene.add( object );
    
    $(document).trigger('loadable_loaded');
  }, function(x){}, function(x){} );
}

function position_graffiti(){
  graffiti.position.set((320 * windowAspect),-325,-(1500 / windowAspect));
}