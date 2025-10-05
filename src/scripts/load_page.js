

window.addEventListener("load", function () {
	const loading = document.getElementById("loading-anim");
    const pageContent = this.document.getElementById("page-content");

	this.setTimeout(function(){

		if(loading) loading.style.display = "none";

        if(pageContent){
			pageContent.style.animation = "anim-entering-page 0.2s ease-out";
			pageContent.style.opacity = "1";
		} 
	}, 10);

	// this.setTimeout(function(){
	// }, 2000);
});










