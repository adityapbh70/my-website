const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("scoreBoard");

const box = 20;
let score = 0;
let snake = [{ x: 9 * box, y: 10 * box }];
let d = "RIGHT";

// Nokia wala khana (aksar ek chota dot hota tha)
let food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
};

document.addEventListener("keydown", direction);

function direction(event) {
    if(event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if(event.keyCode == 38 && d != "DOWN") d = "UP";
    else if(event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if(event.keyCode == 40 && d != "UP") d = "DOWN";
}

function draw() {
    // Screen clear
    ctx.fillStyle = "#8fb01c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < snake.length; i++) {
        // Snake ka rang (Dark Grey/Black pixels)
        ctx.fillStyle = "#222";
        ctx.fillRect(snake[i].x, snake[i].y, box - 2, box - 2); // Gap se pixelated look aayega
    }

    // Food (Ek pixelated dot)
    ctx.fillStyle = "#222";
    ctx.beginPath();
    ctx.arc(food.x + box/2, food.y + box/2, 5, 0, Math.PI * 2);
    ctx.fill();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        scoreDisplay.innerText = "Score: " + score;
        food = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    // Game Over Logic
    if(snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over! Score: " + score);
        location.reload();
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for(let i = 0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) return true;
    }
    return false;
}

// Keypad phones ki speed thodi slow hoti thi
let game = setInterval(draw, 150);
