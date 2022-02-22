const seed = document.getElementById("seed");
const mode = document.querySelector(".mode");
const btn = document.querySelector(".btn");
const table = document.querySelector(".table");

// create and display colors
btn.addEventListener("click", function () {
    fetch(
        `https://www.thecolorapi.com/scheme?hex=${seed.value.substring(
            1
        )}&mode=${mode.value}`
    )
        .then((res) => res.json())
        .then((data) => {
            // if 5 colors are already displayed, remove them
            while (table.firstChild) {
                table.removeChild(table.firstChild);
            }

            for (let i = 0; i < data.count; i++) {
                // create columns that contain both color and its hex code
                let column = document.createElement("div");
                column.classList.add("column");

                // create a div element that shows only color
                let sampleColor = document.createElement("div");
                sampleColor.classList.add("sampleColor");
                sampleColor.style.backgroundColor = `${data.colors[i].hex.value}`;
                sampleColor.value = `${data.colors[i].hex.value}`;
                sampleColor.setAttribute("onclick", "clipboard(this)");

                // create a p element that shows hexcode of color
                let hexCode = document.createElement("p");
                hexCode.classList.add("hexCode");
                hexCode.innerText = `${data.colors[i].hex.value}`;
                hexCode.value = `${data.colors[i].hex.value}`;
                hexCode.setAttribute("onclick", "clipboard(this)");

                column.append(sampleColor, hexCode);
                table.insertBefore(column, null);
            }
        });
});

// copy hexcode to clipboard
function clipboard(color) {
    navigator.clipboard.writeText(color.value);

    // animation for "Copied to clipboard!"
    var tl = gsap.timeline();
    tl.to(".signal", {
        visibility: "visible",
        opacity: 1,
        duration: 1.5,
        y: -100,
        ease: "expo",
    });
    tl.to(".signal", {
        opacity: 0,
        duration: 1,
        y: -50,
    });
}
