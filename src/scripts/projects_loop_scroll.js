const projectContainer = document.getElementById('project-view');

function prevProject() {
    let lastItem = projectContainer.lastElementChild;
    if (lastItem) {
        projectContainer.insertBefore(lastItem, projectContainer.firstElementChild);
    }
}

function nextProject() {
    let firstItem = projectContainer.firstElementChild;
    if (firstItem) {
        projectContainer.appendChild(firstItem);
    }
}

projectContainer.addEventListener("wheel", (event) => {

        if(event.deltaY > 0){
            nextProject();
        }
        else if(event.deltaY < 0){
            prevProject();
        }
        event.preventDefault();
    },
    { passive: false },
);

const leftButton = document.getElementById("left-button");
leftButton.onclick = function() {
    prevProject();
};

const rightButton = document.getElementById("right-button");
rightButton.onclick = function() {
    nextProject();
};
