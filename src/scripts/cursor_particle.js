// cursor particle
const body = document.body;
let rect = body.getBoundingClientRect();;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

body.addEventListener("mousemove", function (e) {
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

function createParticle(x, y) {
    const size = Math.floor(Math.random() * 3) + 3;
    const offsetX = Math.floor(Math.random() * 20);
    const offsetY = Math.floor(Math.random() * 20);

    let particle = document.createElement("div");
    particle.classList.add("cursor-particle");
    particle.style.left = (x+offsetX) + "px";
    particle.style.top = (y+offsetY) + "px";
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.background = "#0ff";

    // svg.appendChild(square);
    body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 900);
}

setInterval(() => {
    createParticle(mouseX, mouseY);
}, 100);
