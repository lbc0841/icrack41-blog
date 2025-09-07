document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("pre").forEach(pre => {

        const copyButton = document.createElement("button");
        const copyIcon = document.createElement("span");
        const copyLabel = document.createElement("span");

        copyButton.type = "button";
        copyButton.className = "copy-button";

        copyIcon.className = "fa-regular fa-copy";
        copyIcon.style.marginRight = "8px";

        copyLabel.textContent = "Copy";

        copyButton.addEventListener("click", async() => {
            const code = pre.firstChild;
            const text = code.innerText;

            try{
                navigator.clipboard.writeText(text);
                copyLabel.textContent = "Copied";
                copyIcon.className = "fa-solid fa-check";
            }
            catch{
                copyLabel.textContent = ":( Failed";
                copyIcon.className = "";
            }

            setTimeout(() => (
                copyIcon.className = "fa-regular fa-copy",
                copyLabel.textContent = "Copy"
            ), 1500);
        });

        copyButton.appendChild(copyIcon);
        copyButton.appendChild(copyLabel);
        pre.appendChild(copyButton);
    });
});