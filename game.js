// SCRIPT CODE 
// Create an empty array
const gamePattern = []; 

// Array to hold button colors 
const buttonColours = [
    "red", 
    "blue", 
    "green", 
    "yellow"
]


// Generate a random color.
function nextSequence() {
    const NUMBER = 3;
    const randomNumber = Math.floor(Math.random() * (NUMBER + 1)); 
    const randomChosenColour = buttonColours[randomNumber]; 
    return gamePattern.push(randomChosenColour); 
} 
