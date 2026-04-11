const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");


// get randomWords 
const getRandomWords = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => '<li class="letter"></li>').join("")
}

// Creating keyboard button
for (let i = 97; i <= 122; i++) { // 97 → 122 → (a → z)
    const button = document.createElement("button");
    // Converts ASCII → character
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
}

//Calling RandomWords Function
getRandomWords();