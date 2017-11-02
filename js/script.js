$(document).ready(function() {
  function getRandNumber(max, min = 1) {
    return Math.floor((Math.random() * max) + min)
  }
  //verification si la position est deja occupée
  function checkPosMob(maxX, maxY) {
    var flag = false;
    var it = 0;
    while (!flag) {
      it ++;
      var x = getRandNumber(maxX);
      var y = getRandNumber(maxY);
      console.log(x);
      console.log(y);
      console.log("iteration = " + it);
      console.log("-------------");
      if(x !== JSON.parse(localStorage.getItem('playerPos')).x && y !== JSON.parse(localStorage.getItem('playerPos')).y ) {
        if(x !== JSON.parse(localStorage.getItem('goalPos')).x && y !== JSON.parse(localStorage.getItem('goalPos')).y) {
          flag = true;
          return {
            "x": x,
            "y": y
          };
        }
      }
    }
  }

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
        "x": (Math.floor((JSON.parse(localStorage.getItem('gameAxes')).x)*Math.random())+1),
        "y": (Math.floor((JSON.parse(localStorage.getItem('gameAxes')).y)*Math.random())+1)
      };
      localStorage.setItem('goalPos', JSON.stringify(pos));
    };
    //test si mobPos existe dans le localStorage
    if(localStorage.getItem('mobPos') == null) {
      //création de la variable de position
      var pos = checkPosMob(JSON.parse(localStorage.getItem('gameAxes')).x, JSON.parse(localStorage.getItem('gameAxes')).y);
      localStorage.setItem('mobPos', JSON.stringify(pos));
    };

    var playerPos = JSON.parse(localStorage.getItem('playerPos'));
    var goalPos = JSON.parse(localStorage.getItem('goalPos'));
    var mobPos = JSON.parse(localStorage.getItem('mobPos'));

    $('.gameDiv[data-x="' + playerPos.x + '"][data-y="' + playerPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/link.png">');
    $('.gameDiv[data-x="' + goalPos.x + '"][data-y="' + goalPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/door.jpeg">');
    $('.gameDiv[data-x="' + mobPos.x + '"][data-y="' + mobPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/mob.png">');

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
    var audioBumpWall = new Audio('../sound/invalid.mp3');
    if(direction == "UP") {
      if((currentPlayerPos.y - 1) > 0){
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.y -= 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/link.png">');
        checkVictory(currentPlayerPos);
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
      } else {
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.y += 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/link.png">');
        audioBumpWall.play();
        checkVictory(currentPlayerPos);
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
      }
    } else if(direction == "DOWN") {
      if((currentPlayerPos.y + 1) <= gameSize.y){
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.y += 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/link.png">');
        checkVictory(currentPlayerPos);
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
      } else {
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.y -= 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/link.png">');
        audioBumpWall.play();
        checkVictory(currentPlayerPos);
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
      }
    } else if(direction == "LEFT") {
      if((currentPlayerPos.x - 1) > 0){
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.x -= 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/link.png">');
        checkVictory(currentPlayerPos);
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
      } else {
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.x += 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/link.png">');
        audioBumpWall.play();
        checkVictory(currentPlayerPos);
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
      }
    } else if(direction == "RIGHT") {
      if((currentPlayerPos.x + 1) <= gameSize.x){
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.x += 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/link.png">');
        checkVictory(currentPlayerPos);
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
      } else {
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.x -= 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/link.png">');
        audioBumpWall.play();
        checkVictory(currentPlayerPos);
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
      };
    }
      checkLoose();
      moveMob();
      while(JSON.parse(localStorage.getItem('mobPos')).x == JSON.parse(localStorage.getItem('goalPos')).x && JSON.parse(localStorage.getItem('mobPos')).y == JSON.parse(localStorage.getItem('goalPos')).y) {
        moveMob();
        $('.gameDiv[data-x="' + JSON.parse(localStorage.getItem('goalPos')).x + '"][data-y="' + JSON.parse(localStorage.getItem('goalPos')).y + '"]').html('<img style="width:100%;height:100%;" src="/img/goal.png">');
      };
      checkLoose();
  };

  function moveMob() {
    var currentMobPos = JSON.parse(localStorage.getItem('mobPos'));
    var gameSize = JSON.parse(localStorage.getItem('gameAxes'));
    if(getRandNumber(2) == 1) {
      if(getRandNumber(2) == 1) {
        //se deplace en haut
        if((currentMobPos.y - 1) > 0){
          $('.gameDiv[data-x="' + currentMobPos.x + '"][data-y="' + currentMobPos.y + '"]').html('');
          currentMobPos.y -= 1;
          $('.gameDiv[data-x="' + currentMobPos.x + '"][data-y="' + currentMobPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/mob.png">');
          localStorage.setItem('mobPos', JSON.stringify(currentMobPos));
        }
      } else {
        //se deplace en bas
        if((currentMobPos.y + 1) <= gameSize.y){
          $('.gameDiv[data-x="' + currentMobPos.x + '"][data-y="' + currentMobPos.y + '"]').html('');
          currentMobPos.y += 1;
          $('.gameDiv[data-x="' + currentMobPos.x + '"][data-y="' + currentMobPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/mob.png">');
          localStorage.setItem('mobPos', JSON.stringify(currentMobPos));
        }
      }
    } else {
      if(getRandNumber(2) == 1) {
        //se deplace a droite
        if((currentMobPos.x - 1) > 0){
          $('.gameDiv[data-x="' + currentMobPos.x + '"][data-y="' + currentMobPos.y + '"]').html('');
          currentMobPos.x -= 1;
          $('.gameDiv[data-x="' + currentMobPos.x + '"][data-y="' + currentMobPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/mob.png">');
          localStorage.setItem('mobPos', JSON.stringify(currentMobPos));
        }
      } else {
        //se deplace a gauche
        if((currentMobPos.x + 1) <= gameSize.x){
          $('.gameDiv[data-x="' + currentMobPos.x + '"][data-y="' + currentMobPos.y + '"]').html('');
          currentMobPos.x += 1;
          $('.gameDiv[data-x="' + currentMobPos.x + '"][data-y="' + currentMobPos.y + '"]').html('<img style="width:100%; height:100%" src="../image/mob.png">');
          localStorage.setItem('mobPos', JSON.stringify(currentMobPos));
        }
      }
    }
  }
  function checkLoose() {
    var currentPlayerPos = JSON.parse(localStorage.getItem('playerPos'));
    var currentMobPos = JSON.parse(localStorage.getItem('mobPos'));
    if(currentPlayerPos.x == currentMobPos.x && currentPlayerPos.y == currentMobPos.y) {
      setTimeout(function(){
        displayScreen('loose');
      }, 300);
      localStorage.setItem('gameState', 'loose');
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
