var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// Functions

function nextSequence() {
  var randomChosenColour = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColour);
  // console.log("Game Sequence ----> ");
  // console.log(gamePattern);
  return randomChosenColour;
}

function flash(colour) {
  $("#" + colour).fadeOut(100).fadeIn(100);
}

function sound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function changeH1(head) {
  $("h1").text(head)
}

function nextLevel() {
  userClickedPattern = [];
  level++;
  changeH1("Level " + level);
  var next = nextSequence();
  sound(next);
  flash(next);
}

function levelComplete() {
  if (gamePattern.length !== userClickedPattern.length) return false;
  else {
    for (var i = 0; i < gamePattern.length; i++) {
      if(gamePattern[i]!==userClickedPattern[i])return false;
    }
  }
  return true;
}

function buttonCheck() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if(gamePattern[i]!==userClickedPattern[i])return false;
  }
  return true;
}

// Events

$(document).on("keypress", function() {
  if (level === 0) {
    gamePattern = [];
    nextLevel();
  }
});

$(".btn").on("click", function() {
  if(level>0){
    userClickedPattern.push(this.id);
    flash(this.id);

    if (buttonCheck()) {
      sound(this.id);
      if (levelComplete()) {
        setTimeout(function(){
          nextLevel();
        },500);
      }
    } else {
      sound("wrong");
      changeH1("You Lose at Level: "+level+". Press Any Key to Restart!")
      $("body").css("background-color","red");
      setTimeout(function(){
        $("body").css("background-color","#011F3F");
      },200);
      level = 0;
    }
  }
});
