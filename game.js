let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern =[];
let userClickedPattern = [];
let gameStart = false;
let level = 0;
$(document).mousedown(function(){
    if (gameStart === false){
        $("#level-title").text("level " + level)
        nextSequence();
        gameStart = true;
        };
    });
function gameOver() {
    audio = new Audio("sounds/wrong.mp3")
    audio.play();
};
function playSound(name) {  
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};
function startOver(){
    level = 0;
    gamePattern= [];
    gameStart = false;
};
$(".btn").click(function (){ 
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        };
    } else {
        gameOver();
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    };
};
function nextSequence() {
    userClickedPattern = [];
    level++;  
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("." + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
};
function animatePress (currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};