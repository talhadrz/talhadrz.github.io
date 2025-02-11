const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // Yılan ve yem boyutu
let snake = [{ x: 9 * box, y: 9 * box }]; // Yılanın başlangıç konumu
let direction = "RIGHT"; // Yılanın başlangıç yönü
let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box }; // Yem konumu

// Yılanı çiz
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "green" : "lightgreen"; // Yılanın başı yeşil, diğer segmentler açık yeşil
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}

// Yemi çiz
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

// Oyun döngüsü
function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Ekranı temizle
    drawSnake();
    drawFood();

    // Yılanın yeni konumu
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // Yılanın yemi yemesi
    if (snakeX === food.x && snakeY === food.y) {
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box }; // Yeni yem konumu
    } else {
        snake.pop(); // Yılanın son segmentini sil
    }

    // Yılanın yeni başını ekle
    const newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);

    // Yılanın kendisine çarpmasını önlemek için
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(gameInterval); // Oyun durdurulur
        alert("Oyun Bitti! Yeniden Başlatmak için Sayfayı Yenileyin.");
    }
}

// Yılanın kendisine çarpıp çarpmadığını kontrol et
function collision(head, array) {
    for (let i = 1; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Klavye ile yön kontrolü
document.addEventListener("keydown", directionControl);

function directionControl(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode === 38 && direction !== "DOWN") {
        direction = "UP