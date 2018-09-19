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

var loadables_total = 3;
var loadables_loaded = 0;

function initDesktop(){
  $('.stackable').not(':target,#home').css('opacity', 0);
  setTimeout(function(){
    $('.stackable').not(':target,#home').css('opacity', 1);
  }, 1000);

  var hash = location.hash;

  if (hash.length > 2){
    $('#player').fadeOut();
    $('a[href="'+hash+'"]').parent().addClass('selected');
  }else{
    $('a[href="#"]').parent().addClass('selected');
  }

  $('#menu a').click(function(ev){
    $('#menu li').removeClass('selected')
    $(ev.target).parent().addClass('selected');

    if ($(ev.target).attr('href') === '#') {
      $('#player').fadeIn();
    }else{
      $('#player').fadeOut();
    }
  });
  
  $(document).on('loadable_loaded',function(ev){
    loadables_loaded++;
    
    if (loadables_loaded==loadables_total){
      $('#loading').remove();
      animate();
      position_logo();
  
      rotate_logo();
    }
  });
  
  var $container = $("#bg");
  create_scene($container,$container.width()-3,$container.height()-3);
  renderer.setClearColor(0xffffff, 1);
  
  controls = new THREE.OrbitControls(camera,renderer.domElement);
  controls.maxDistance = 1000;
  
  if (bowser.msie) loadables_total = 3;
  
  create_logo();
  create_skydome();
  create_geoCage();
  
  if (!bowser.msie) create_sc_audio();
  
  function onWindowResize() {
    windowAspect = window.innerWidth / window.innerHeight;

    camera.aspect = ($container.width()-3) / ($container.height()-3);
    camera.updateProjectionMatrix();

    renderer.setSize($container.width()-3, $container.height()-3);

    position_logo();
  }
  
  window.addEventListener( 'resize', onWindowResize, false );

  function onDocumentMouseMove( event ) {
    mouseX = event.clientX / window.innerWidth;
    mouseY = event.clientY / window.innerHeight;
    try{
      if(!logo_rotating) logo.rotation.set(-(0.30+(mouseY/20)),-(0.90-(mouseX/10)),-(0.20+(-(mouseY/20))));
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

  // generate contact info to avoid spam bots
  $('#contact .content ul').append('<li id="contact-email">');
  $('#contact .content ul').append('<li id="contact-skype">');
  $('#contact .content ul #contact-email').html('jean'+'@'+'ticowebmedia.com');
  $('#contact .content ul #contact-skype').html('jean'+'.'+'m'+'.'+'lescure');
};

function rotate_logo(){
  setTimeout(function(){
    logo_rotating = true;
    createjs.Tween.get(logo.rotation).to({y: -7.08}, 2000, createjs.Ease.backInOut).call(function(){logo_rotating = false; });
    rotate_logo();
  }, randomInt(10000,15000));
}

function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}