/*
GAME FUNCTION:
 - Player must guess a number between min and max
 - Player gets a certain number of guesses
 - Notify player of guesses remaining
 - Notify the player of the correct answer if player loses the game
 - Let player choose to play again
*/

// Game Values
let min = 1, 
    max = 15,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // Validate
    if(isNaN(guess) || guess < min || guess > max){
        // Inform player that input was not valid
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        // clear input
        guessInput.value = '';
    } else {
        // Check if won
        if(guess === winningNum){
            // Game over - won
            gameOver(true, `${winningNum} is correct! You have won!`);
        } else {
            // Wrong number
            guessesLeft -= 1;
            // Check number of remaining guesses
            if(guessesLeft === 0){
                // Game over - lost
                gameOver(false, `Game over, ${winningNum} was the correct number`);
            } else {
                // Games continues - answer wrong
                // Change border color
                guessInput.style.borderColor = 'red';
                // Clear input
                guessInput.value = '';
                // Tell player they guessed the wrong number
                setMessage(`${guess} is not the correct number. There are ${guessesLeft} guesses left`, 'red');
            }
        }
    }
});

// Play again event listener
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
})

// Game over
function gameOver(won, msg) {
    /* Define color variable to control the color of the input border and message text */
    let color;
    won === true ? color = 'green': color = 'red';

    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set message text color
    message.style.color = color;
    // Set message
    setMessage(msg);

    // Play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Set Message
function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}

// Get winning number
function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}