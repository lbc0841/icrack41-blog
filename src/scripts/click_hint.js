if(!(/Mobi|Android|iPhone|iPad|iPod|Phone/i.test(navigator.userAgent))){
    const body = document.body;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");;
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.style.width = "120px";
    svg.style.height = "120px";
    svg.style.position = "absolute";
    svg.style.zIndex = "100";
    svg.style.pointerEvents = "none";
    svg.style.left = "-100px";
    svg.style.top = "-100px";
    svg.style.mixBlendMode = "difference";

    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.style.fill = "none";
    polygon.style.stroke = "rgba(255, 255, 255, 0.1)";
    polygon.style.strokeWidth = "2";

    const hint = document.createElementNS("http://www.w3.org/2000/svg", "text");
    hint.setAttribute('x', '50%');
    hint.setAttribute('y', '50%');
    hint.setAttribute('font-size', '50px');
    hint.setAttribute('text-anchor', 'middle');
    hint.setAttribute('dominant-baseline', 'middle');
    hint.textContent = "CLICK";
    hint.style.fill = "#c0c0c0";
    hint.style.visibility = "hidden";

    svg.appendChild(polygon);
    svg.appendChild(hint);
    body.appendChild(svg);

    let centerX = 100;
    let centerY = 100;
    let variation = 4;
    let baseRadius = 70;
    const numPoints = 100;

    // 
    let currentRadii = new Array(numPoints).fill(baseRadius);
    let targetRadii = new Array(numPoints).fill(baseRadius);
    let speed = new Array(numPoints).fill(0);

    function generatePoints(radii) {
        let points = [];
        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 8;
            const r = radii[i];
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);
            points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
        }
        return points.join(' ');
    }

    function randomizeTarget() {
        for (let i = 0; i < numPoints; i++) {
            targetRadii[i] = baseRadius + (Math.random() - 0.5) * variation * 2;
            speed[i] = (targetRadii[i]-currentRadii[i])/6;
        }
    }

    function animate() {
        let changed = false;
        for (let i = 0; i < numPoints; i++) {
            if (Math.abs(currentRadii[i] - targetRadii[i]) > 0.5) {
                currentRadii[i] = currentRadii[i] + speed[i]; // 0.08 控制過渡速度
                changed = true;
            }
        }

        polygon.setAttribute('points', generatePoints(currentRadii));
        
        if (!changed) {
            randomizeTarget();
        }
        
        requestAnimationFrame(animate);
    }

    // init
    randomizeTarget();
    polygon.setAttribute('points', generatePoints(currentRadii));

    animate();

    // mousemove listener
    document.addEventListener("mousemove", function (e) {
        svg.style.top  = `${e.clientY - 50}px`;
        svg.style.left = `${e.clientX - 50}px`;
    });

    // hover listener
    let hoverCount = 0;
    const clickableElements = document.querySelectorAll('.clickable');
    clickableElements.forEach(e => {
        e.addEventListener('mouseenter', () => {
            hoverCount++;
            console.log("hoverCount:" + hoverCount);
            if(hoverCount == 1){
                variation = 10;
                baseRadius = 90;
                polygon.style.stroke = "rgba(255, 255, 255, 0.8)";
                polygon.style.animation = "click-hint-enter 0.2s ease-in-out";

                hint.style.visibility = "visible";
            }
        });
        e.addEventListener('mouseleave', () => {
            hoverCount--;
            console.log("hoverCount:" + hoverCount);

            if(hoverCount == 0){
                variation = 4;
                baseRadius = 70;
                polygon.style.stroke = "rgba(255, 255, 255, 0.1)";
                polygon.style.animation = "click-hint-leave 0.2s ease-in-out";

                hint.style.visibility = "hidden";
            }
            else if(hoverCount < 0){
                hoverCount = 0;
            }
        });
    });
}
