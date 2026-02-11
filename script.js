const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("scoreBoard");
const gameOverScreen = document.getElementById("gameOver");
const finalScoreText = document.getElementById("finalScore");

const box = 20;
let score = 0;
let gameActive = true;

// Snake Initial State
let snake = [
    { x: 9 * box, y: 10 * box },
    { x: 8 * box, y: 10 * box }
];

// Food Logic
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

let d = "RIGHT";

// Controls
document.addEventListener("keydown", direction);

function direction(event) {
    if(event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if(event.keyCode == 38 && d != "DOWN") d = "UP";
    else if(event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if(event.keyCode == 40 && d != "UP") d = "DOWN";
}

function draw() {
    if(!gameActive) return;

    // Clear Screen
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Snake
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#00ff88" : "#008844";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw Food
    ctx.fillStyle = "#ff0055";
    ctx.fillRect(food.x, food.y, box, box);

    // Old Head Position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Direction logic
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    // Eat Food?
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        scoreDisplay.innerText = "Score: " + score;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    // Death Conditions
    if(snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        gameActive = false;
        clearInterval(gameInterval);
        finalScoreText.innerText = "Score: " + score;
        gameOverScreen.style.display = "flex";
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for(let i = 0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) return true;
    }
    return false;
}

function resetGame() {
    location.reload();
}

// Start Game
let gameInterval = setInterval(draw, 300);
