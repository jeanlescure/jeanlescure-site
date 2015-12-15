/*

  "Homer:  The sum of the square roots of any two sides of an isosceles 
  triangle is equal to the square root of the remaining side.
  
  Man in stall:  That's a right triangle, you idiot!
  
  Homer:  D'oh!"
  
      - The Simpsons

*/

var geoCages;

function geoCage(size, complexity, material){
  this.geometry;
  this.mesh;
  this.mesh_vertices_opoints;
  this.mesh_vertices_states;
  
  this.init = function() {
    this.geometry = new THREE.IcosahedronGeometry( size, complexity );
    this.mesh = new THREE.Mesh( this.geometry, material );
    this.mesh.rotation.y = (randomInt(0,100) / 100) * 6.28;
  };
  
  this.create_tween = function(rnd_vertex){
    if (this.mesh_vertices_states[rnd_vertex] === 0){
      this.mesh_vertices_states[rnd_vertex] = 1;
      var points_at = 
        {
          x: this.mesh.geometry.vertices[rnd_vertex].x,
          y: this.mesh.geometry.vertices[rnd_vertex].y,
          z: this.mesh.geometry.vertices[rnd_vertex].z
        };
      var points_to = 
        {
          x: this.mesh_vertices_opoints[rnd_vertex][0] + (randomInt(100,500) * ((randomInt(0,1)) ? 1 : -1)),
          y: this.mesh_vertices_opoints[rnd_vertex][1] + (randomInt(100,500) * ((randomInt(0,1)) ? 1 : -1)),
          z: this.mesh_vertices_opoints[rnd_vertex][2] + (randomInt(100,500) * ((randomInt(0,1)) ? 1 : -1))
        };

      var self = this;

      var tween = createjs.Tween.get(points_at).to(
        points_to,
        randomInt(2000,4000),
        createjs.Ease.backInOut
      ).call(function(){
        self.mesh_vertices_states[rnd_vertex] = 0;
        //console.log(['done',idx,mesh.geometry.vertices[idx].x]);
      }).on('change', function(){
        self.mesh.geometry.vertices[rnd_vertex].x = this._target.x;
        self.mesh.geometry.vertices[rnd_vertex].y = this._target.y;
        self.mesh.geometry.vertices[rnd_vertex].z = this._target.z;
        self.mesh.geometry.verticesNeedUpdate = true;
        self.mesh.geometry.normalsNeedUpdate = true;
      }
      );
    }
  }

  this.init();
}

function create_geoCage(){
  var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, opacity: 0.1, transparent: true } ); 
  var wireframeMaterial_b = new THREE.MeshBasicMaterial( { color: 0xbada55, wireframe: true, opacity: 0.1, transparent: true } ); 
  
  geoCages = [];
  geoCages.push(new geoCage( 2000, 1, wireframeMaterial ));
  geoCages.push(new geoCage( 2200, 1, wireframeMaterial_b ));
  // set the geometry to dynamic
  // so that it allows updates
  $.each(geoCages, function( idx, geoCage ){
    geoCage.mesh.geometry.dynamic = true;
    scene.add( geoCage.mesh );

    geoCage.mesh_vertices_opoints = [];
    geoCage.mesh_vertices_states = [];
    geoCage.geometry.vertices.map(function(vertex){
      geoCage.mesh_vertices_opoints.push([vertex.x,vertex.y,vertex.z]);
      geoCage.mesh_vertices_states.push(0);
    });
    
    randomize_vertices(idx);
  });
}

function randomize_vertices(idx){
  setTimeout(function(){
    var rnd_vertex = randomInt(0,geoCages[idx].mesh_vertices_opoints.length-1);
    //console.log([rnd_vertex,mesh.geometry.vertices[rnd_vertex].x]);

    geoCages[idx].create_tween(rnd_vertex);
    
    //console.log('rnd');
    randomize_vertices(idx);
  },
  randomInt(100,500));
}