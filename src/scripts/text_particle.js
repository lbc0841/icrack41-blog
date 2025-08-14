const canvas = document.querySelector(".particle-text");
const ctx = canvas?.getContext("2d", { willReadFrequently: true });


function initCanvas() {
    console.log(canvas.getBoundingClientRect().height);
    if (canvas) {
        canvas.height = canvas.getBoundingClientRect().height*2;
        canvas.width = canvas.getBoundingClientRect().width*2;
    }
}

function getRandom(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

initCanvas();

class Particle {
    x = 0;
    y = 0;
    size = 0;
    tempSize = 0;

    constructor() {
        if (canvas) {
            this.x = getRandom(canvas.width / 3, canvas.width - canvas.width / 3);
            this.y = getRandom(canvas.height / 3, canvas.height - canvas.height / 3);
            this.size = 7;
            this.tempSize = this.size;
        }
    }

    // draw particle
    draw() {
        if (ctx) {
            ctx.beginPath();
            ctx.fillStyle = "#fff";
            // ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.rect(this.x, this.y, this.tempSize, this.tempSize);
            ctx.fill();
        }
    }

    // move particle
    moveTo(tx, ty, duration) {
        const speedX = (tx - this.x) /duration;
        const speedY = (ty - this.y) / duration;
        const speedZoom = (this.size - 1) / duration;

        const startTime = Date.now();
        const startX = this.x;
        const startY = this.y;

        const _move = () => {
            const t = Date.now() - startTime;

            this.y = startY + speedY*t;
            this.x = startX + speedX*t;

            // this.tempSize = speedZoom*duration;

            if (t > duration) {
                this.x = tx;
                this.y = ty;
                this.tempSize = this.size;
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
const textDuration = 2500; // 2.5s

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
        ctx.font = `200px 'Impact', sans-serif`;
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

            const x = points[i][0];
            const y = points[i][1];
            p.moveTo(x, y, (x+y)/2);
        }
        for(; i<particles.length; i++){
            const p = particles[i];
            const k = getRandom(0, points.length-1);

            const x = points[k][0];
            const y = points[k][1];
            p.moveTo(x, y, (x+y)/2)
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

function showDescribe_cpp(){
    ctx.fillStyle = "#fff";
    ctx.font = `50px 'ari', sans-serif`;
    ctx.fillText("C++ 是我第一個接觸的語言", 0, 80);
    ctx.fillText("它陪伴我走過學習程式的基礎", 0, 160);
    ctx.fillText("—— 變數、迴圈、if else...", 0, 240);
    ctx.fillText("而現在，C++ 是我解題主要使用的語言", 0, 400);
}

function showDescribe_html(){
    ctx.fillStyle = "#fff";
    ctx.font = `50px 'ari', sans-serif`;
    ctx.fillText("作者在混", 0, 80);
    ctx.fillText("還沒寫好", 0, 160);
}

function showDescribe_css(){
    ctx.fillStyle = "#fff";
    ctx.font = `50px 'ari', sans-serif`;
    ctx.fillText("作者在混", 0, 80);
    ctx.fillText("還沒寫好", 0, 160);
}

function showDescribe_javascript(){
    ctx.fillStyle = "#fff";
    ctx.font = `50px 'ari', sans-serif`;
    ctx.fillText("作者在混", 0, 80);
    ctx.fillText("還沒寫好", 0, 160);
}

function showDescribe_python(){
    ctx.fillStyle = "#fff";
    ctx.font = `50px 'ari', sans-serif`;
    ctx.fillText("作者在混", 0, 80);
    ctx.fillText("還沒寫好", 0, 160);
}

function showDescribe_verilog(){
    ctx.fillStyle = "#fff";
    ctx.font = `50px 'ari', sans-serif`;
    ctx.fillText("作者在混", 0, 80);
    ctx.fillText("還沒寫好", 0, 160);
}

function showDescribe_markdown(){
    ctx.fillStyle = "#fff";
    ctx.font = `50px 'ari', sans-serif`;
    ctx.fillText("作者在混", 0, 80);
    ctx.fillText("還沒寫好", 0, 160);
}

drawParticles();

// showDescribe_cpp();
