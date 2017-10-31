$(document).ready(function() {

  function init() {
    //si localstorage gameState n'existe pas
    if(localStorage.getItem('gameState') == null) {
      localStorage.setItem('gameState', 'optionScreen');
      displayScreen(localStorage.getItem('gameState'));
    } else {
      if(localStorage.getItem('gameState') == "playScreen") {
        generateGame();
      };
      displayScreen(localStorage.getItem('gameState'));
    };
  };
  function generateGame() {
    var baseX = JSON.parse(localStorage.getItem('gameAxes')).x;
    var baseY = JSON.parse(localStorage.getItem('gameAxes')).y;
    var playScreen = $('section[data-state="playScreen"]');
    var html = "<div style='width:" + baseX * 40 + "px' class='gameContainer'>";
    for (var y = 1; y <= baseY; y++) {
      for (var x = 1; x <= baseX; x++) {
        html += "<div data-x='" + x + "' data-y='" + y + "' class='gameDiv'></div>";
      };
    };
    html += "</div>";
    $(playScreen).html(html);
    insertObjects();
  };
  function insertObjects() {
    if(localStorage.getItem('playerPos') == null) {
      var pos = {
        "x": 1,
        "y": 1
      };
      localStorage.setItem('playerPos', JSON.stringify(pos));
    };
    if(localStorage.getItem('goalPos') == null) {
      var pos = {
        "x": JSON.parse(localStorage.getItem('gameAxes')).x,
        "y": JSON.parse(localStorage.getItem('gameAxes')).y
      };
      localStorage.setItem('goalPos', JSON.stringify(pos));
    };
    var playerPos = JSON.parse(localStorage.getItem('playerPos'));
    var goalPos = JSON.parse(localStorage.getItem('goalPos'));
    $('.gameDiv[data-x="' + playerPos.x + '"][data-y="' + playerPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/link.png">');
    $('.gameDiv[data-x="' + goalPos.x + '"][data-y="' + goalPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/key.png">');
    $('body').on('keydown', function(e) {
      if(e.keyCode == 38 /* up */) {
        movePlayer('UP');
      } else if(e.keyCode == 40 /* down */) {
        movePlayer('DOWN');
      } else if(e.keyCode == 37 /* left */) {
        movePlayer('LEFT');
      } else if(e.keyCode == 39 /* right */) {
        movePlayer('RIGHT');
      }

    });
  }
function checkVictory(currentPlayerPos) {
  if(currentPlayerPos.x == JSON.parse(localStorage.getItem('goalPos')).x && currentPlayerPos.y == JSON.parse(localStorage.getItem('goalPos')).y) {
    displayScreen('victory');
    localStorage.setItem('gameState', 'victory');
  }
}

  function movePlayer(direction) {
    var currentPlayerPos = JSON.parse(localStorage.getItem('playerPos'));
    var gameSize = JSON.parse(localStorage.getItem('gameAxes'));
    if(direction == "UP") {
      if((currentPlayerPos.y - 1) > 0){
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.y -= 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/link.png">');
        checkVictory(currentPlayerPos);
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
      } else {
        console.log('aie !');
      }
    } else if(direction == "DOWN") {
      if((currentPlayerPos.y + 1) <= gameSize.y){
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.y += 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/link.png">');
        checkVictory(currentPlayerPos);
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
      } else {
        console.log('aie !');
      }
    } else if(direction == "LEFT") {
      if((currentPlayerPos.x - 1) > 0){
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.x -= 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/link.png">');
        checkVictory(currentPlayerPos);
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
      } else {
        console.log('aie !');
      }
    } else if(direction == "RIGHT") {
      if((currentPlayerPos.x + 1) <= gameSize.x){
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.x += 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/link.png">');
        checkVictory(currentPlayerPos);
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
      } else {
        console.log('aie !');
      }
    }
  }
  function displayScreen(gameState) {
  $.each($('section[data-state!="' + gameState + '"]'), function(key, value) {
    $(this).addClass('hidden');
  });
  $('section[data-state="' + gameState + '"]').removeClass('hidden');
};
$('button[data-action="startGame"]').on('click', function() {
  var baseX = $('input[name="x"]').val();
  var baseY = $('input[name="y"]').val();
  if(baseX < "1" || baseY < "1") {
    alert('erreur de valeur X ou Y');
  } else {
    var axes = {
      "x": baseX,
      "y": baseY
    };
    localStorage.setItem('gameAxes', JSON.stringify(axes));
    localStorage.setItem('gameState', "playScreen");
    generateGame();
    displayScreen(localStorage.getItem('gameState'));
  };
});
$('button[data-action="reset"]').on('click', function() {
  localStorage.clear();
  location.reload();
});


  init();
});
