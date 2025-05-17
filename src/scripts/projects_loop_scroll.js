const projectContainer = document.getElementById('project-view');
projectContainer.innerHTML = projectContainer.innerHTML.repeat(4);

const posCenter = (projectContainer.scrollWidth - projectContainer.clientWidth) / 2;
projectContainer.scrollLeft = posCenter;

function loopScroll(scrollAmount) {

    if (projectContainer.scrollLeft > posCenter + 10 || projectContainer.scrollLeft < posCenter - 10) {

        projectContainer.scrollTo({
            left: posCenter,
            behavior: "smooth",
        });

        return;
    }

    if (scrollAmount < 0) {

        let lastItem = projectContainer.lastElementChild;
        if (lastItem) {
            projectContainer.insertBefore(lastItem, projectContainer.firstElementChild);
            projectContainer.scrollLeft += (lastItem.offsetWidth + 30);
        }
    }
    else if (scrollAmount > 0) {

        let firstItem = projectContainer.firstElementChild;
        if (firstItem) {
            projectContainer.appendChild(firstItem);
            projectContainer.scrollLeft -= (firstItem.offsetWidth + 30);
        }
    }

    projectContainer.scrollTo({
        left: posCenter,
        behavior: "smooth",
    });
}


projectContainer.addEventListener("wheel",

    (event) => {
        event.preventDefault();
        loopScroll(event.deltaY);
    },
    { passive: false },
);