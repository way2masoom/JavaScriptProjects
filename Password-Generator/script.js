// selection the input box
const passwordBox = document.getElementById("password");
const length = 12; // length of the password

// Character sets
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+";

// Combine all characters
const allChars = upperCase + lowerCase + numbers + symbols;

// Function to generate password
function createPassword() {
    let password = "";
    // Ensure at least one character from each type
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // loop to Fill remaining characters
    while (password.length < length) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // displaying the password in the passwordBox
    passwordBox.value = password;
}

// Copy to clipboard function
function copyPassword() {
    if (passwordBox.value === "") return;
    navigator.clipboard.writeText(passwordBox.value);
    alert("Password Copied!");
}
