/*

  "For a moment, nothing happened. 
  Then, after a second or so, nothing continued to happen."

      - Douglas Adams, The Hitchhiker's Guide to the Galaxy

*/

var mouseX = 0, mouseY = 0;

var windowAspect;

var logo;
var logo_rotating = false;
var graffiti;

var loadables_total = 4;
var loadables_loaded = 0;

var contact_open = false;

$(function(){
  if (bowser.firefox){ 
    $('.sc-link').attr('href','http://www.createjs.com/#!/TweenJS');
    $('.sc-link').html('TweenJS');
  }
  
  $(document).on('loadable_loaded',function(ev){
    loadables_loaded++;
    
    if (loadables_loaded==loadables_total){
      $('#loading').remove();
      animate();
    }
  });
  
  var $container = $("#bg");
  create_scene($container,$container.width()-3,$container.height()-3);
  renderer.setClearColor(0x333333, 1);
  
  controls = new THREE.OrbitControls(camera,renderer.domElement);
  controls.maxDistance = 1000;
  
  if (bowser.msie) loadables_total = 3;
  
  create_logo();
  create_graffiti();
  create_skydome();
  create_geoCage();
  
  if (!bowser.msie) create_sc_audio();
  
  function onWindowResize() {
    windowAspect = window.innerWidth / window.innerHeight;

    position_logo();
    position_graffiti();

    camera.aspect = ($container.width()-3) / ($container.height()-3);
    camera.updateProjectionMatrix();

    renderer.setSize($container.width()-3, $container.height()-3);
  }
  
  window.addEventListener( 'resize', onWindowResize, false );

  function onDocumentMouseMove( event ) {
    mouseX = event.clientX / window.innerWidth;
    mouseY = event.clientY / window.innerHeight;
    try{
      if(!logo_rotating) logo.rotation.set(0.10+(-(mouseY/20)),0.80+(mouseX/10),0.10+(-(mouseY/20)));
      graffiti.rotation.set(0,0.80+(mouseX/10),0);
    }catch(e){
      // do nothing
    }
  }

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  
  animation_callback = function (){
    skyDome.rotation.y += 0.001;
    if (skyDome.rotation.y > 6.28) skyDome.rotation.y = 0;
    
    geoCages[0].mesh.rotation.y += 0.002;
    if (geoCages[0].mesh.rotation.y > 6.28) geoCages[0].mesh.rotation.y = 0;
    geoCages[1].mesh.rotation.y += 0.003;
    if (geoCages[1].mesh.rotation.y > 6.28) geoCages[1].mesh.rotation.y = 0;
    
    audio_analyser.getByteFrequencyData(frequencyData);
    for( i = 0; i < 682; i+=8 ){
      $('#spectrum .bar').eq(i/8).height(100*(frequencyData[i]/256));
    };
  }
  
  rotate_logo();
  
  // generate contact info to avoid spam bots
  $('#contentContact').prepend('<ul>');
  $('#contentContact ul').append('<li class="contact-email">');
  $('#contentContact ul').append('<li class="contact-skype">');
  $('#contentContact ul li.contact-email').html('jean'+'@'+'ticowebmedia.com');
  $('#contentContact ul li.contact-skype').html('jean'+'.'+'ticowebmedia');
  
  // animate contact 
  $('.contact-link').click(function(e){
    e.preventDefault();
    if (contact_open){
      $('#contentText').animate({top: 50},500);
      $('#contentContact').animate({height: 0},500);
      contact_open = false;
    }else{
      $('#contentText').animate({top: 200},500);
      $('#contentContact').animate({height: 150},500);
      contact_open = true;
    }
  });
  
  $('#contactClose').click(function(e){
    e.preventDefault();
    $('#contentText').animate({top: 50},500);
    $('#contentContact').animate({height: 0},500);
    contact_open = false;
  });
});

function rotate_logo(){
  setTimeout(function(){
    logo_rotating = true;
    createjs.Tween.get(logo.rotation).to({y: 7.08}, 2000, createjs.Ease.backInOut).call(function(){logo_rotating = false; });
    rotate_logo();
  }, randomInt(10000,15000));
}

function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}