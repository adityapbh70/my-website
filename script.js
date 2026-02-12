const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("scoreBoard");
const gameOverDiv = document.getElementById("gameOver");

const box = 20;
let score = 0;
let snake = [{ x: 9 * box, y: 10 * box }, { x: 8 * box, y: 10 * box }];
let food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
};
let d = "RIGHT";
let gameRunning = true;
let speed = 200; 
let gameLoop;

document.addEventListener("keydown", direction);

function direction(event) {
    if(event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if(event.keyCode == 38 && d != "DOWN") d = "UP";
    else if(event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if(event.keyCode == 40 && d != "UP") d = "DOWN";
}

// Rounded rectangle banane ka function (Snake body ke liye)
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

    // 1. Background (Nokia Green)
    ctx.fillStyle = "#8fb01c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw Food (Pixel Square)
    ctx.fillStyle = "#222";
    ctx.fillRect(food.x + 4, food.y + 4, box - 8, box - 8);

    // 3. Draw Snake
    for(let i = 0; i < snake.length; i++) {
        // Head bada hoga, body thodi choti
        let sizeOffset = i === 0 ? 0 : 2; 
        let radius = i === 0 ? 8 : 4;
        
        drawRoundedRect(
            snake[i].x + sizeOffset, 
            snake[i].y + sizeOffset, 
            box - (sizeOffset * 2) - 1, 
            box - (sizeOffset * 2) - 1, 
            radius, 
            "#222"
        );

        // Snake ki Aankhein (Head par)
        if (i === 0) {
            ctx.fillStyle = "#8fb01c"; 
            if (d === "RIGHT" || d === "LEFT") {
                ctx.fillRect(snake[i].x + 12, snake[i].y + 4, 3, 3);
                ctx.fillRect(snake[i].x + 12, snake[i].y + 12, 3, 3);
            } else {
                ctx.fillRect(snake[i].x + 4, snake[i].y + 4, 3, 3);
                ctx.fillRect(snake[i].x + 12, snake[i].y + 4, 3, 3);
            }
        }
    }

    // 4. Movement Logic
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    // 5. Collision with Food
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        scoreDisplay.innerText = score.toString().padStart(4, '0');
        updateSpeed();
        food = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    // 6. Collision with Walls or Self
    if(snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        gameRunning = false;
        clearInterval(gameLoop);
        gameOverDiv.style.display = "flex";
    }

    snake.unshift(newHead);
}

function updateSpeed() {
    if (score % 5 === 0 && speed > 60) {
        speed -= 15;
        clearInterval(gameLoop);
        gameLoop = setInterval(draw, speed);
    }
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

gameLoop = setInterval(draw, speed);
