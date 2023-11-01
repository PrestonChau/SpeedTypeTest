const phrases = [
    "The quick brown fox jumps over the lazy dog.",
    "Life is like a box of chocolates, you never know what you're gonna get.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "The only way to do great work is to love what you do.",
    "In three words I can sum up everything I've learned about life: it goes on."
];

let startTime;
let timerInterval;
let typingStarted = false;

function getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
}

function init() {
    if (!typingStarted) {
        const randomPhrase = getRandomPhrase();
        document.getElementById("quote").innerText = randomPhrase;
    }
    document.getElementById("input").value = '';
    document.getElementById("result").innerText = '';
    startTime = null;
}

function startTimer() {
    if (!typingStarted) {
        typingStarted = true;
        startTime = new Date().getTime();
        // Start the timer
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 10); // Update every 10 milliseconds
    }
}

function updateTimer() {
    if (startTime) {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        const seconds = Math.floor(elapsedTime / 1000);
        const milliseconds = (elapsedTime % 1000).toString().padStart(3, '0');
        document.getElementById("timer").innerText = `Time: ${seconds}.${milliseconds} seconds`;
    }
}

function checkTypingSpeed() {
    const originalText = document.getElementById("quote").innerText.trim();
    const typedText = document.getElementById("input").value.trim();

    if (typedText === originalText) {
        const endTime = new Date().getTime();
        const elapsedTime = endTime - startTime;
        const seconds = elapsedTime / 1000;
        const milliseconds = elapsedTime % 1000;
        const words = originalText.split(' ').length;
        const wordsPerMinute = Math.round((words / (seconds / 60)));
        document.getElementById("result").innerText = `Your typing speed is ${wordsPerMinute} words per minute.`;
        // Stop the timer
        clearInterval(timerInterval);
    } else {
        document.getElementById("result").innerText = "Incorrect typing. Please try again.";
    }
}

// Event listeners to start the timer when the first key is pressed
document.getElementById("input").addEventListener("keydown", startTimer);

// Initialize the game when the page loads
window.onload = init;
