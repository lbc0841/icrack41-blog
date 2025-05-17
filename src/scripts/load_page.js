

window.addEventListener("load", function () {
	const loading = document.getElementById("loading-anim");
    const slotContainer = this.document.getElementById("page-content");

	this.setTimeout(function(){

		if(loading) loading.style.display = "none";
        if(slotContainer) slotContainer.style.visibility = "visible";
	}, 1000);
});










