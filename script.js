const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("scoreBoard");
const gameOverDiv = document.getElementById("gameOver");

const box = 20;
let score = 0;
let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
};
let d = "RIGHT";
let gameRunning = true;
let speed = 200; // Shuruati speed (Slow)
let gameLoop;

document.addEventListener("keydown", direction);

function direction(event) {
    if(event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if(event.keyCode == 38 && d != "DOWN") d = "UP";
    else if(event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if(event.keyCode == 40 && d != "UP") d = "DOWN";
}

function draw() {
    if(!gameRunning) return;

    // Background
    ctx.fillStyle = "#8fb01c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // --- Snake Drawing Logic ---
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "#222"; // Snake Color
        
        // Rounded corners banane ke liye
        let radius = (i === 0) ? 8 : 4; // Head thoda zyada round hoga
        drawRoundedRect(ctx, snake[i].x, snake[i].y, box - 1, box - 1, radius);

        // Sirf Head (i === 0) par aankhein (Eyes) lagao
        if (i === 0) {
            ctx.fillStyle = "#8fb01c"; // Aankhon ka rang screen jaisa
            
            // Direction ke hisab se aankhein set karna
            if (d === "RIGHT" || d === "LEFT") {
                ctx.fillRect(snake[i].x + 12, snake[i].y + 4, 3, 3); // Top Eye
                ctx.fillRect(snake[i].x + 12, snake[i].y + 12, 3, 3); // Bottom Eye
            } else {
                ctx.fillRect(snake[i].x + 4, snake[i].y + 12, 3, 3); // Left Eye
                ctx.fillRect(snake[i].x + 12, snake[i].y + 12, 3, 3); // Right Eye
            }
            ctx.fillStyle = "#222"; // Color wapas set karein
        }
    }

    // Food (Retro Style)
    ctx.fillStyle = "#222";
    ctx.fillRect(food.x + 4, food.y + 4, box - 8, box - 8); 

    // ... baaki movement wala code same rahega ...
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    // (Aage ka code jo pehle tha wahi use karein)
}

// Rounded rectangles banane ke liye helper function
function drawRoundedRect(ctx, x, y, width, height, radius) {
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
