const body = document.body;
body.addEventListener("mousemove", function (e) {
    let rect = body.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    creatParticles(x, y);
});

function creatParticles(x, y) {
    const size = Math.floor(Math.random() * 5) + 2;
    const offsetX = Math.floor(Math.random() * 20) - 10;
    const offsetY = Math.floor(Math.random() * 20) - 10;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.classList.add("cursor-particle");
    svg.style.left = (x+offsetX) + "px";
    svg.style.top = (y+offsetY) + "px";

    const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    square.setAttribute("x", "0");      // 左上角 x 座標
    square.setAttribute("y", "0");      // 左上角 y 座標
    square.setAttribute("width", size); // 正方形邊長
    square.setAttribute("height", size);
    square.setAttribute("fill", "white");

    // let particle = document.createElement("div");
    // particle.classList.add("cursor-particle");
    // particle.style.left = x + "px";
    // particle.style.top = y + "px";

    svg.appendChild(square);
    body.appendChild(svg);

    setTimeout(() => {
        svg.remove();
    }, 250);
}