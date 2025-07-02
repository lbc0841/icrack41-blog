const enteringPath = document.querySelectorAll('.et-path');
const enteringProgress = document.querySelectorAll('.entering-progress');
const etZoomIn = document.querySelectorAll('.et-zoom-in');

const etZoomInObserver = new IntersectionObserver((entrise) => {
    entrise.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = "anim-et-zoom-in 0.3s ease-out";
            entry.target.style.visibility = "visible";
        }
        else {
            entry.target.style.animation = "none";
            entry.target.style.visibility = "hidden";
        }
    });
    }, {threshold: 0.15}
);

const enteringPathObserver = new IntersectionObserver((entrise) => {
    entrise.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = "anim-et-path 0.8s ease-out";
            entry.target.style.visibility = "visible";
        }
        else {
            entry.target.style.animation = "none";
            entry.target.style.visibility = "hidden";
        }
    });
    }, {threshold: 0.4}
);

const enteringProgressObserver = new IntersectionObserver((entrise) => {
    entrise.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = "anim-entering-progress 0.3s ease-out";
            entry.target.style.visibility = "visible";
        }
        else {
            entry.target.style.animation = "none";
            entry.target.style.visibility = "hidden";
        }
    });
    }, {threshold: 0.4}
);

etZoomIn.forEach(item => {
    etZoomInObserver.observe(item);
});

enteringProgress.forEach(item => {
    enteringProgressObserver.observe(item);
});

enteringPath.forEach(item => {
    enteringPathObserver.observe(item);
});