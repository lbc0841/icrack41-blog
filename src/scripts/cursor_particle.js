if(!(/Mobi|Android|iPhone|iPad|iPod|Phone/i.test(navigator.userAgent))){
    const body = document.body;
    let rect = body.getBoundingClientRect();;
    let mouseX = window.innerWidth;
    let mouseY = window.innerHeight;

    body.addEventListener("mousemove", function (e) {
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    function createParticle(x, y) {
        const size = Math.floor(Math.random() * 3) + 3;
        const offsetX = Math.floor(Math.random() * 40);
        const offsetY = Math.floor(Math.random() * 20);

        let particle = document.createElement("span");
        particle.classList.add("cursor-particle");
        particle.textContent = Math.round(Math.random()+0.05);
        particle.style.fontSize = "12px";
        particle.style.left = (x+offsetX-15) + "px";
        particle.style.top = (y+offsetY+10) + "px";
        particle.style.width = size + "px";
        particle.style.height = size + "px";

        // svg.appendChild(square);
        body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 900);
    }


    setInterval(() => {
        createParticle(mouseX, mouseY);
    }, 100);
}

