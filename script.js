const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let dino = {
    x: 50,
    y: 300,
    width: 40,
    height: 40,
    gravity: 1,
    jumpPower: 15,
    velocityY: 0,
    isJumping: false
};

let obstacles = [];
let frame = 0;
let score = 0;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !dino.isJumping) {
        dino.isJumping = true;
        dino.velocityY = -dino.jumpPower;
    }
});

function createObstacle() {
    const obstacleHeight = Math.random() * 50 + 20; // Engelin yüksekliği
    obstacles.push({
        x: canvas.width,
        y: 300 - obstacleHeight,
        width: 20,
        height: obstacleHeight
    });
}

function drawDino() {
    ctx.fillStyle = 'green';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawObstacles() {
    ctx.fillStyle = 'red';
    for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

function update() {
    // Dinozorun zıplaması
    if (dino.isJumping) {
        dino.y += dino.velocityY;
        dino.velocityY += dino.gravity;

        if (dino.y >= 300) {
            dino.y = 300;
            dino.isJumping = false;
            dino.velocityY = 0;
        }
    }

    // Engellerin hareketi
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= 5; // Engellerin hızı

        // Engeller ekrandan çıkınca sil
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            score++;
            i--;
        }
    }

    // Çarpışma kontrolü
    for (let obstacle of obstacles) {
        if (dino.x < obstacle.x + obstacle.width &&
            dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + obstacle.height &&
            dino.y + dino.height > obstacle.y) {
            alert('Oyun Bitti! Skor: ' + score);
            document.location.reload();
        }
    }
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Skor: ' + score, 10, 20);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDino();
    drawObstacles();
    drawScore();
    update();

    // Engelleri belirli aralıklarla oluştur
    if (frame % 100 === 0) {
        createObstacle();
    }

    frame++;
    requestAnimationFrame(gameLoop);
}

gameLoop();