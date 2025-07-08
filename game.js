// SCRIPT CODE WITH JQUERY

// Array to store button colors 
const buttonColours = [
    "red", 
    "blue", 
    "green", 
    "yellow"
]

// Arrays to store the computer picks, & user color picks.
let gamePattern = [], userClickedPattern = []; 

// To track if the game has started, and level.
let started = false, level = 0;

// We use the keypress as a means to start the game
$(document).keydown(function() { //Add event listeners to the keys
    if (!started) {
        $("#level-title").text("Level " + level); // Change heading to Level 1 
    nextSequence();    // Get computer color
    started = true;
  }
    
});

// Add Eventlisteners to the button
const btn = $(".btn"); 
btn.on("click", function() {
    const userChosenColour= ($(this).attr("id")); // To get the id attribute of the button clicked
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour)
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1); 
}); 


// Check if answers aligns
function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (gamePattern.length === userClickedPattern.length) {
        
        setTimeout(nextSequence, 500);
         
        }                
        
    } else {
        playSound("wrong");
        $("body").addClass("game-over"); 

        $("#level-title").text("Game Over, Press Any Key to Restart")

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);


        startOver(); 
    }
    
}

// Generate computer random color.
function nextSequence() {

    // Reset this once the function runs
    userClickedPattern = []; 

    // Increase level by 1, each time the function is called
    level++

    // update the heading with current level
    $("#level-title").text("Level " + level)

    // Generate a random color.
    const NUMBER = 3;
    const randomNumber = Math.floor(Math.random() * (NUMBER + 1)); 
    const randomChosenColour = buttonColours[randomNumber]; 
    
    // Use the color generated to select the button with the same id, Add flash
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour); 


    gamePattern.push(randomChosenColour);  
} 


// Play sound to follow color picks. 
function playSound(name) {
    let audio = new Audio("../assets/sounds/" + name + ".mp3");
    audio.play();
} 

// Animation to follow color picks.
function animatePress(currentColour) {
    const pressedBtn = $("#" + currentColour);
    pressedBtn.addClass("pressed"); 

    setTimeout(function() {
        pressedBtn.removeClass("pressed");
    }, 100);
}


// To restart the game 
function startOver() {
    level = 0; 
    gamePattern = []; 
    started = false; 
}




