const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const guessedText = document.querySelector(".guesses-text b");


let currentWord, wrongGuessCount = 0;
const maxGuesses = 6;

// get randomWords 
const getRandomWords = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => '<li class="letter"></li>').join("")
}

const initGame = (button, clickedLetter) => {
    //check if the clickedLetter is exits or not
    if (currentWord.includes(clickedLetter)) {
        // showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if (letter == clickedLetter) {
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
    console.log(button, clickedLetter);

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