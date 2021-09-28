var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var count = 0;
var newGame = true;

// Delay the next line with this implementation:
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  };
  
// Reinitializes all values to start new game...
function startOver(){
    level=0;
    gamePattern = [];
    userClickedPattern = [];
    count = 0;
    newGame = true;
};

// ******************* Plays sound of button
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

//* ******************* User clicked highlights Button
function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(() => {
        $("." + currentColour).removeClass("pressed");
    }, 100);
};

// Highlights ACTIVE button
function highlight(color){
    $("#" + color).fadeOut(100).fadeIn(100);
};

//* *******************
function checkAnswer(currentColor){
        if (userClickedPattern.at(count) === gamePattern.at(count)) {
            console.log("Level: " + level +" Correct");
            console.log("gamePattern: " + gamePattern);
            console.log("userPattern: " + userClickedPattern);
            count++;
            if(count === level){
                nextSequence();
            }
        }else{
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 200);
            playSound('wrong');
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
        return;
};

// Game waits and listens for USER to click on color button
$(".btn").click(function(event){
        if (newGame !== true){
        var color = event.target.id;
        userClickedPattern.push(color);
        animatePress(color);
        playSound(color);
        if(count<=level){
            checkAnswer(color);
        }
    }
});

// Simon loops through all buttons from start to end for player to see
const simonLoops = async () => {
    for (const item in gamePattern){
        await sleep(700);
        var curCol = gamePattern[item];
        playSound(curCol);
        highlight(curCol);
    };
};

// Randomly generates next pattern color into array
function randomGen(){
    var randomNumber = Math.floor(Math.random()*4); /*Random number 0-4 */
    var randomChosenColour = buttonColours[randomNumber]; /* randomChosenColour = color */
    gamePattern.push(randomChosenColour); /*Adds next simon button */
    simonLoops(); 
};

// Start of next sequence, next level
function nextSequence(){
    if(!newGame){
        count=0;
        level++;
        userClickedPattern = [];
        setTimeout(() => {
            $("#level-title").text("LEVEL ( " + level + " )");
            randomGen();
        }, 1000);
    }  
};

//* ******************* Initial START of game
$(document).on("keydown",function(){
    if (newGame){
    $("h1").text("Starting Game...");
    setTimeout(() => {
        newGame = false;
        nextSequence();    
        }, 1000);
    };
});
