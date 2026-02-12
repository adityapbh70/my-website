const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("scoreBoard");
const gameOverDiv = document.getElementById("gameOver");

// Sound Elements (Audio context ya elements se link)
const eatSound = new Audio("https://www.soundjay.com/buttons/beep-01a.mp3");
const dieSound = new Audio("https://www.soundjay.com/buttons/beep-05.mp3");

const box = 20;
let score = 0;
// High Score ko local storage se uthana
let highScore = localStorage.getItem("snakeHighScore") || 0;

let snake = [
    { x: 9 * box, y: 10 * box },
    { x: 8 * box, y: 10 * box }
];

let food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
};

let d = "RIGHT";
let gameRunning = true;
let speed = 200; // Shuruati slow speed
let gameLoop;

// Keyboard Controls
document.addEventListener("keydown", direction);

function direction(event) {
    if(event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if(event.keyCode == 38 && d != "DOWN") d = "UP";
    else if(event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if(event.keyCode == 40 && d != "UP") d = "DOWN";
}

// Mobile Buttons Function
function changeDir(newDir) {
    if(newDir == "LEFT" && d != "RIGHT") d = "LEFT";
    if(newDir == "UP" && d != "DOWN") d = "UP";
    if(newDir == "RIGHT" && d != "LEFT") d = "RIGHT";
    if(newDir == "DOWN" && d != "UP") d = "DOWN";
}

// Rounded rectangle banane ka function (Snake design ke liye)
function drawRoundedRect(x, y, width, height, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
}

function draw() {
    if(!gameRunning) return;

    // 1. Background Clear
    ctx.fillStyle = "#8fb01c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw Food
    ctx.fillStyle = "#222";
    ctx.fillRect(food.x + 4, food.y + 4, box - 8, box - 8);

    // 3. Draw Snake
    for(let i = 0; i < snake.length; i++) {
        let sizeOffset = i === 0 ? 0 : 2; 
        let
