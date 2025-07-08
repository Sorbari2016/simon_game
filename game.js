// SCRIPT CODE WITH JQUERY

// Create an empty array
let gamePattern = []; 

// 
let userClickedPattern = []; 


// Array to hold button colors 
const buttonColours = [
    "red", 
    "blue", 
    "green", 
    "yellow"
]


// To check if the game has started
let started = false; 

// To track the levels
let level = 0; 

// Generate a random color.
function nextSequence() {

    // Reset this once the function runs
    userClickedPattern = []; 

    // Increase level by 1, each time the function is called
    level++

    // update the heading with current level
    $("#level-title").text("Level " + level)

    const NUMBER = 3;
    const randomNumber = Math.floor(Math.random() * (NUMBER + 1)); 
    const randomChosenColour = buttonColours[randomNumber]; 
    
    // Use the color generated to select the button with the same id, Add flash
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour); 


    gamePattern.push(randomChosenColour);  
} 

const btn = $(".btn"); 
btn.on("click", function() {
    const userChosenColour= ($(this).attr("id")); 
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour)
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1); 
})

// Function to play sound randomly and by the user
function playSound(name) {
    let audio = new Audio("../assets/sounds/" + name + ".mp3");
    audio.play();
} 

function animatePress(currentColour) {
    const pressedBtn = $("#" + currentColour);
    pressedBtn.addClass("pressed"); 

    setTimeout(function() {
        pressedBtn.removeClass("pressed");
    }, 100);
}


// We use the keypress as a means to start the game
// To detect keypress, & start the game
$(document).keydown(function() { //Add evnet listeners to the keys
    if (!started) {
        $("#level-title").text("Level " + level); // Change heading to Level 1 
    nextSequence();    // Get computer color
    started = true;
  }
    
})


function checkAnswer(currentLevel) {
    
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (gamePattern.length === userClickedPattern.length) {
        
        setTimeout(nextSequence, 100);
         
        }                
        
    } else {
        let wrongAudio = new Audio("../assets/wrong.mp3")
        wrongAudio.play(); 

        const body = $("body"); 
        body.addClass("game-over"); 

        setTimeout(function() {
            body.removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart")

        startOver(); 
    }
    
}


// To restart the game 
function startOver() {
    level = 0; 
    gamePattern = []; 
    started = false; 
}




