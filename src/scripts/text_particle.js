const canvas = document.querySelector(".particle-text");
const ctx = canvas?.getContext("2d", { willReadFrequently: true });


function initCanvas() {
    if (canvas) {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }
}

function getRandom(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}


initCanvas();

class Particle {
    x = 0;
    y = 0;
    size = 0;

    constructor() {
        if (canvas) {
            this.x = getRandom(canvas.width / 5, canvas.width - canvas.width / 5);
            this.y = getRandom(canvas.height / 5, canvas.height - canvas.height / 5);
            this.size = 2;
        }
    }

    // draw particle
    draw() {
        if (ctx) {
            ctx.beginPath();
            ctx.fillStyle = "#fff";
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    // move particle
    moveTo(tx, ty) {
        const duration = 400; // 500ms
        const speedX = (tx - this.x) / duration;
        const speedY = (ty - this.y) / duration;

        const startTime = Date.now();
        const startX = this.x;
        const startY = this.y;
        const _move = () => {
            const t = Date.now() - startTime;
            this.x = startX + speedX * t;
            this.y = startY + speedY * t;

            if (t > duration) {
                this.x = tx;
                this.y = ty;
                return;
            }

            requestAnimationFrame(_move);
        }

        _move();
    }
}

const particles = [];

function drawParticles() {
    clearCanvas();
    updateCanvas();
    particles.forEach((p) => p.draw());
    requestAnimationFrame(drawParticles);
}

function clearCanvas() {
    ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
}

const texts = ["C++", "HTML", "CSS", "JavaScript", "Python", "Verilog", "Markdown"];
let lastUpdate = Date.now();
let currentTextIndex = 0;
const textDuration = 3000; // 3s

function getText() {
    if(Date.now() - lastUpdate >= textDuration){
        currentTextIndex++;
        currentTextIndex %= texts.length;
        lastUpdate = Date.now();
    }

    return texts[currentTextIndex];
}

let text;
function updateCanvas() {
    const newText = getText();
    if (newText == text) return;

    text = newText;

    if (ctx) {
        const width = canvas?.width;
        const height = canvas?.height;

        ctx.fillStyle = "#000";
        ctx.textBaseline = "middle";
        ctx.font = `${300}px 'Impact', sans-serif`;
        ctx.fillText(text, width / 2 - ctx.measureText(text).width / 2, height / 2);
        const points = getPoints();
        clearCanvas();

        let i = 0;
        for (; i < points.length; i++) {
            let p = particles[i];
            if (!p) {
                p = new Particle();
                particles.push(p);
            }
            p.moveTo(points[i][0], points[i][1]);
        }
        for(; i < particles.length; i++){
            let p = particles[i];
            let k = getRandom(0, points.length-1);
            p.moveTo(points[k][0], points[k][1]);
        }
    }
}

function getPoints() {
    const points = [];

    if (ctx) {
        const { width, height, data } = ctx.getImageData(0, 0, canvas?.width, canvas?.height);

        const gap = 8;
        for (let x = 0; x < width; x += gap) {
            for (let y = 0; y < height; y += gap) {
                const index = (y * width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                const a = data[index + 3];

                if (r == 0 && g == 0 && b == 0 && a == 255) {
                    points.push([x, y]);
                }
            }
        }
    }

    // console.log(points.length);
    return points;
}


drawParticles();