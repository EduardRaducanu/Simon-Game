var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickedPattern = [];

var gameStart = false;
var level = 0;

$(document).keypress(function(){
    if (gameStart === false){
        $("#level-title").text("level " + level)
        nextSequence();
        gameStart = true;
        }
    })

function gameOver() {
    audio = new Audio("sounds/wrong.mp3")
    audio.play();
}
function playSound(name) {  
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function startOver(){
    level = 0;
    gamePattern= [];
    gameStart = false;
}

$(".btn").on("click", function (){
    
    var userChosenColor = this.id;
    
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        console.log("ok");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {

    userClickedPattern = [];

    level++;
    
    $("#level-title").text("level " + level)
    
    //creating a variable that stores a random number from 0 -> 3
    var randomNumber = Math.floor(Math.random()*4);
    
    //variable that stores the random color based on the random number
    var randomChosenColor = buttonColors[randomNumber];
    
    //storing the random color chosen in the empty array 
    gamePattern.push(randomChosenColor);
    
    //alert when a button is pressed
    $("." + randomChosenColor).fadeOut(100).fadeIn(100);
    
    //calling the playSound function of the random color generated
    playSound(randomChosenColor)

}

function animatePress (currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}
