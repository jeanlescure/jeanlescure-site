/*

  "I'm not a criminal. Woah, that makes me sound more like a criminal, doesn't it?"

      - Spike, Cowboy Bebop

*/

var audio_playlist;
var audio;
var audio_context;
var audio_src;
var audio_analyser;
var frequencyData;

var CLIENT_ID = '9a3c591c694115f82409fbc9cb68ef04';

function create_sc_audio(){
  // Temporarily disabling Soundcloud API until they get their shit together
  // about CORS settings on their servers.
  // if (!bowser.firefox){
  if (false){
    // initialize client with app credentials
    SC.initialize({
      client_id: CLIENT_ID,
      redirect_uri: 'http://www.jlescure.com'
    });

    // get playlist
    SC.get("/playlists/64166811", {}, function(playlist){
      audio_playlist = playlist.tracks.map(function(item){ return [item.title,item.stream_url,item.id]; });

      setup_audio();

      // populate playlist
      audio_playlist.map(function(track){$('#player ul').append('<li><a href="#" data-src="'+track[1]+'?client_id='+CLIENT_ID+'">'+track[0]+'</a></li>');});

      $('#player ul a').click(function(el){
        el.preventDefault();
        $(this).parent().addClass('playing').siblings().removeClass('playing');
        audio.load($(this).attr('data-src'));
        audio.play();
      });

      // begin loading of first song
      var $first = $('#player ul a:first');
      $first.click();
      audio.pause();

      $(document).trigger('loadable_loaded');
    });
  }else{
    moz_fallback();
  }
}

function setup_audio(){
  audio = audiojs.createAll({
    trackEnded: function() {
      var next = $('#player ul li.playing').next();
      if (!next.length) next = $('#player ul li').first();
      next.addClass('playing').siblings().removeClass('playing');
      audio.load($('a', next).attr('data-src'));
      audio.play();
    }
  })[0];
  
  // as of mid 2015 we need to add this or SoundCloud will go "NO AUDIO FOR YOU!"
  audio.element.crossOrigin = "anonymous";

  audio_context = new (window.AudioContext || window.webkitAudioContext)();
  audio_src = audio_context.createMediaElementSource(audio.element);
  audio_analyser = audio_context.createAnalyser();

  // we have to connect the MediaElementSource with the analyser 
  audio_src.connect(audio_analyser);

  // and the analyser to the context destination (that, or silence will ensue)
  audio_analyser.connect(audio_context.destination);

  // init frequency var and spectrum bars
  frequencyData = new Uint8Array(audio_analyser.frequencyBinCount);
  for( i = 0; i < 682; i+=8 ){
    $('#spectrum').append('<div class="bar"></div>');
  };
}

function moz_fallback(){
  //Load local playlist since Firefox has bug for createMediaElementSource
  audio_playlist = [
    ['ProleteR - Stereosun','/tracks/01.mp3'],
    ['Restless Leg Syndrome - Fiddle Dee Dee','/tracks/02.mp3'],
    ['Mr Frisbee - No Swingity','/tracks/03.mp3'],
    ['Electro Swing Italia - Liquid Lunch (E.S.I. Remix)','/tracks/04.mp3'],
    ['ProleteR - 01 By the River','/tracks/05.mp3']
  ];

  setup_audio();
  
  // populate playlist
  audio_playlist.map(function(track){$('#player ul').append('<li><a href="#" data-src="'+track[1]+'">'+track[0]+'</a></li>');});

  $('#player ul a').click(function(el){
    el.preventDefault();
    $(this).parent().addClass('playing').siblings().removeClass('playing');
    audio.load($(this).attr('data-src'));
    audio.play();
  });

  // begin loading of first song
  var $first = $('#player ul a:first');
  $first.click();
  audio.pause();

  $(document).trigger('loadable_loaded');
}