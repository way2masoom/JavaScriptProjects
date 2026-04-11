const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const guessedText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again")

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;


const resetGame = () => {
    //reseating all game variable and UI Elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessedText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("")
    gameModal.classList.remove("show");

}

// get randomWords 
const getRandomWords = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}
const gameOver = (isVictory) => {
    // after 600ms of game complete.. showing modal with relevant details
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct words was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <br> ${currentWord}</br>`;
        gameModal.classList.add("show");

    }, 300);
}

const initGame = (button, clickedLetter) => {
    //check if the clickedLetter is exits or not
    if (currentWord.includes(clickedLetter)) {
        // showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if (letter == clickedLetter) {
                correctLetters.push(letter)
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else {
        // If clicked letter doesn't exits then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessedText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`;

    // calling gameOver function if any of these condition meets
    if (wrongGuessCount == maxGuesses) return gameOver(false);
    if (correctLetters.length == currentWord.length) return gameOver(true);

}

// Creating keyboard button and adding event listeners
for (let i = 97; i <= 122; i++) { // 97 → 122 → (a → z)
    const button = document.createElement("button");
    // Converts ASCII → character
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);

    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}

//Calling RandomWords Function
getRandomWords();

playAgainBtn.addEventListener("click", getRandomWords);