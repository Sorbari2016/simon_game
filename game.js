// SCRIPT CODE WITH JQUERY

// Create an empty array
const gamePattern = []; 

// 
const userClickedPattern = []; 


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

    // Increase level by 1, each time the function is called
    level++

    // update level 
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


// To detect keypress, & change heading to the level
$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
    
})






