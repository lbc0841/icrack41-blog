

window.addEventListener("load", function () {
	const loading = document.getElementById("loading-anim");
    const pageContent = this.document.getElementById("page-content");

	this.setTimeout(function(){

		if(loading) loading.style.display = "none";

        if(pageContent){
			pageContent.style.animation = "page-content-appear 0.2s ease-out";
			pageContent.style.opacity = "1";
		} 

	}, 600);
});










