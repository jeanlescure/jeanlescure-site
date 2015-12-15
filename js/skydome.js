/*

  "And when where not saving the environment, we're thinkin' of you, naked, thigh deep in tofu."
  
      - Bud & Doyle, Bio-Dome
      
*/

function create_skydome(){
  var geometry = new THREE.SphereGeometry(3000, 60, 40);
  var loader = new THREE.TextureLoader();
  loader.load('/img/clouds.jpg',function( object ){
    var uniforms = {
      texture: { type: 't', value: object }
    };

    var material = new THREE.ShaderMaterial( {
      uniforms:       uniforms,
      vertexShader:   document.getElementById('sky-vertex').textContent,
      fragmentShader: document.getElementById('sky-fragment').textContent
    });

    skyDome = new THREE.Mesh(geometry, material);
    skyDome.scale.set(-1, 1, 1);
    skyDome.rotation.y = 2;
    skyDome.eulerOrder = 'XZY';
    skyDome.renderDepth = 1000.0;
    scene.add(skyDome);
    
    $(document).trigger('loadable_loaded');
  });
}