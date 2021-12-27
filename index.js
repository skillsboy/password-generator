const includeLowerCase = document.getElementById("includeLowerCase");
const includeUpperCase = document.getElementById("includeUpperCase");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");
const randomPassword = document.getElementById("randomPassword");
const generatePassword = document.getElementById("generatePassword");
const randomPasswordLength = document.getElementById("randomPasswordLength");


const numbers = "0123456789";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const symbols = "!?@#$%^~&*_-+=";

function getRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
}

function randomizeStringOrder(string) {
    let arr = string.split("");

    for (let i = 0; i < arr.length; i++) {
        const randomPosition = Math.floor(Math.random() * (i + 1));

        const tmp = arr[i];

        arr[i] = arr[randomPosition];
        arr[randomPosition] = tmp;
    }

    return arr.join("");
}

function generateRandomPassword(length, includeNumbers, includeLowerCaseLetters, includeUpperCaseLetters, includeSymbols) {
    let generatedPassword = "";

    const allIncludedCharacters =
        (includeNumbers ? numbers : "") +
        (includeLowerCaseLetters ? lowerCaseLetters : "") +
        (includeUpperCaseLetters ? upperCaseLetters : "") +
        (includeSymbols ? symbols : "");

    if (!allIncludedCharacters) return "";

    if (includeNumbers) {
        generatedPassword += numbers[getRandomNumber(numbers.length - 1)];
    }
    if (includeLowerCaseLetters) {
        generatedPassword += lowerCaseLetters[getRandomNumber(lowerCaseLetters.length - 1)];
    }
    if (includeUpperCaseLetters) {
        generatedPassword += upperCaseLetters[getRandomNumber(upperCaseLetters.length - 1)];
    }
    if (includeSymbols) {
        generatedPassword += symbols[getRandomNumber(symbols.length - 1)];
    }

    length -= generatedPassword.length;

    // generate the rest with all include chars
    for (let i = 0; i < length; i++) {
        generatedPassword += allIncludedCharacters[getRandomNumber(allIncludedCharacters.length - 1)];
    }

    // randomize the password character order
    return randomizeStringOrder(generatedPassword);
}

generatePassword.onclick = function () {
    let randPassword = "";

    if (randomPasswordLength.selectedIndex === 0) return;
    randPassword = generateRandomPassword(randomPasswordLength.value, includeNumbers.checked, includeLowerCase.checked, includeUpperCase.checked, includeSymbols.checked);
    randomPassword.value = randPassword;
};


// add options to select (drop down random password length)
for (let i = 4; i <= 100; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    randomPasswordLength.appendChild(option);
}