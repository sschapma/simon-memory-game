var settings = {
  sequence: [],
  round: 0,
  lightPosition: 0,
  clicked: 0
}

$(document).ready(function() {
  var tone = $("#sound");

  function animate(colorCode) {

    if (colorCode == "a") {
      $("#a").css("border-color", "#1aff00");
      $("#beep").attr("src", "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
      setTimeout(function() {
        $("#a").css("border-color", "#0b7000");
      }, 700);
    } else if (colorCode == "b") {
      $("#b").css("border-color", "#ff0b00");
      $("#beep").attr("src", "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
      setTimeout(function() {
        $("#b").css("border-color", "#c30800");
      }, 700);
    } else if (colorCode == "c") {
      $("#c").css("border-color", "#ffec00");
      $("#beep").attr("src", "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
      setTimeout(function() {
        $("#c").css("border-color", "#c3b400");
      }, 700);
    } else if (colorCode == "d") {
      $("#d").css("border-color", "#29abd0");
      $("#beep").attr("src", "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
      setTimeout(function() {
        $("#d").css("border-color", "#196d85");
      }, 700);
    }

    tone[0].pause();
    tone[0].load();
    tone[0].play();
  }

  function newGame() {
    var text = "";
    var colorId = "abcd";

    for (var i = 0; i < 1; i++) {
      text += colorId.charAt(Math.floor(Math.random() * colorId.length));
      settings.sequence.push(text);
    }

    function gameLoop() {
      setTimeout(function() {
        animate(settings.sequence[settings.lightPosition]);
        settings.lightPosition++;

        if (settings.lightPosition < settings.sequence.length) {
          gameLoop();
        } else {
          settings.lightPosition = 0;
          listen();
        }
      }, 1000)
    }

    if (settings.sequence.length == 21) {
      setTimeout(function() {
        console.log("You Win!");
        $("#win").show();
        $("#win").addClass("bigEntrance");
        document.getElementById('winner').play();
        settings.clicked = 0;
        $("#a, #b, #c, #d").off("mousedown");
      }, 500);
    } else {
      gameLoop();
    }
  }

  function listen() {

    $("#a, #b, #c, #d").on("mousedown", function() {

      if (this.id == settings.sequence[settings.clicked]) {

        if (settings.clicked === settings.sequence.length - 1) {
          $("#a, #b, #c, #d").off("mousedown");
          settings.clicked = 0;
          $("#start").trigger("click");
        } else {
          console.log("Right!");
          settings.clicked++;
        }

      } else {
        console.log("WRONG");
        $("#fail").show();
        $("#fail").addClass("bigEntrance");
        document.getElementById('loser').play();

        settings.clicked = 0;
        $("#a, #b, #c, #d").off("mousedown");
      }
    });
  }

  //BEGIN GAME
  $("#a, #b, #c, #d").on("click", function() {
    animate(this.id)
  });

  $("#start").on("click", function() {
    $("#start").hide();
    $("#simon, #count").css("filter", "blur(0px)");
    $("#simon, #count").css("-webkit-filter", "blur(0px)");
    settings.round++;
    newGame(); // make id and play it
    setTimeout(function() {
      $("#count").html(settings.round)
    }, 500);
    //playit();
  });

  $("#fail").on("click", function() {
    $("#fail").hide();
    settings.sequence = [];
    settings.round = 0;
    settings.lightPosition = 0,
      settings.clicked = 0;
    $("#start").trigger("click");
  });

  $("#win").on("click", function() {
    $("#win").hide();
    settings.sequence = [];
    settings.round = 0;
    settings.lightPosition = 0,
      settings.clicked = 0;
    $("#start").trigger("click");
  });
}); //document ready