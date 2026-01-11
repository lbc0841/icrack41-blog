const canvas = document.getElementById('dino');
const ctx = canvas.getContext('2d');

const w = canvas.clientWidth;
const h = canvas.clientHeight;

const dinoImg = new Image()

// init
canvas.width = w;
canvas.height = h;

// var
let score = 0;
let gameSpeed = 12;
let isGameOver = false;
let animationId;

// object
const dino = {
    x: 50,
    y: 150,
    width: 50,
    height: 50,
    color: '#f0f0f0',
    dy: 0,
    jumpForce: 12,
    gravity: 0.6,
    grounded: false
};

const obstacles = [];

// click listener
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (isGameOver) restartGame();
        else jump();
    }
});

canvas.addEventListener('touchstart', () => {
    if (isGameOver) restartGame();
    else jump();
});

function jump() {
    if (dino.grounded) {
        dino.dy = -dino.jumpForce;
        dino.grounded = false;
    }
}

function createObstacle() {
    const height = Math.random() * (50 - 20) + 20;
    obstacles.push({
        x: canvas.width,
        y: canvas.height - height,
        width: 30,
        height: height,
        color: '#ff4d4d'
    });
}

function update() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dino.dy += dino.gravity;
    dino.y += dino.dy;

    // check grounded
    if (dino.y + dino.height > canvas.height) {
        dino.y = canvas.height - dino.height;
        dino.dy = 0;
        dino.grounded = true;
    }

    //ctx.drawImage(dinoImg);
    ctx.fillStyle = dino.color;
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    if (Math.random() < 0.02 && (obstacles.length === 0 || obstacles[obstacles.length-1].x < canvas.width - 200)) {
        createObstacle();
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
        const o = obstacles[i];
        o.x -= gameSpeed;

        ctx.fillStyle = o.color;
        ctx.fillRect(o.x, o.y, o.width, o.height);

        if (
            dino.x < o.x + o.width &&
            dino.x + dino.width > o.x &&
            dino.y < o.y + o.height &&
            dino.y + dino.height > o.y
        ) {
            gameOver();
        }
    }

    ctx.fillStyle = '#535353';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${Math.floor(score)}`, w-120, 30);

    animationId = requestAnimationFrame(update);

    score += 0.1;
}

function gameOver() {
    isGameOver = true;
    cancelAnimationFrame(animationId);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2);
    ctx.font = '20px Arial';
    ctx.fillText('按空白鍵開始', canvas.width/2, canvas.height/2 + 40);
}

function restartGame() {
    score = 0;
    gameSpeed = 5;
    obstacles.length = 0;
    dino.y = 150;
    dino.dy = 0;
    isGameOver = false;
    ctx.textAlign = 'left'; 
    update();
}

gameOver();