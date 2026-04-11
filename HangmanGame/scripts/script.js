const keyboardDiv = document.querySelector(".keyboard");

// Creating keyboard button
for (let i = 97; i <= 122; i++) { // 97 → 122 → (a → z)
    const button = document.createElement("button");
    // Converts ASCII → character
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
}

