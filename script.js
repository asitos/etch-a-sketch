let isShaderMode = false;
let isOpacitorMode = false;

function modeToggle() {
    const rainbowBtn = document.querySelector("#rainbow-toggle");
    if (isShaderMode) {
        removeShaderEffect(); // Remove shader effect when switching to rainbow mode
        rainbowToggle();
        isShaderMode = false;
        rainbowBtn.textContent = "monochrome";
        resetGridAppearance(); // Reset grid to default appearance
        console.log("switched to rainbow mode");
    } else {
        removeRainbowEffect(); // Remove rainbow effect when switching to shader mode
        shaderToggle();
        isShaderMode = true;
        rainbowBtn.textContent = "rainbow";
        rainbowBtn.style.color = "";
        console.log("switched to shader mode");
    }
}

function resetGridAppearance() {
    const allDivs = document.querySelectorAll(".grid-square");
    allDivs.forEach(div => {
        div.style.backgroundColor = "#fff"; // Or whatever your default background color is
        div.classList.remove("hover-active");
    });
}

function createGrid(rows) {
    const gridContainer = document.querySelector("#grid-container");
    gridContainer.innerHTML = ''; // Clear existing grid, if any

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < rows; j++) {
            const div = document.createElement("div");
            div.classList.add("grid-square");
            div.style.width = `calc(100% / ${rows})`;
            div.style.height = `calc(100% / ${rows})`;
            div.style.border = "0.5px solid #ccc";
            div.style.boxSizing = "border-box";
            div.style.flex = `1 0 calc(100% / ${rows})`;
            div.dataset.opacity = "0"; // Initialize opacity

            gridContainer.appendChild(div);
        }
    }

    console.log("grid created");
}

function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const pastel = `hsl(${hue}, 100%, 85%)`;
    return pastel;
}

function hoverEffect(rows) {
    const allDivs = document.querySelectorAll(".grid-square");
    allDivs.forEach(div => {
        div.addEventListener("mouseover", rainbowHoverEffect);
    });
    console.log("hovering active");
}

function monochromeHoverEffect(event) {
    event.target.classList.add("hover-active");
    event.target.style.backgroundColor = "#ccc";
}

function rainbowHoverEffect(event) {
    event.target.classList.add("hover-active");
    event.target.style.backgroundColor = getRandomColor();
}

function clearGrid() {
    const allDivs = document.querySelectorAll(".grid-square");
    allDivs.forEach(div => {
        div.style.backgroundColor = "#fff";
        div.dataset.opacity = "0";
        div.classList.remove("hover-active");
    });
}

function deleteGrid() {
    const allDivs = document.querySelectorAll(".grid-square");
    allDivs.forEach(div => {
        div.remove();
    });
}

function newGrid() {
    let rows = parseInt(prompt("Enter the number of rows (1-48): ", "16"));

    if (rows > 48 || rows < 0) {
        alert("Please enter a valid value");
        return;
    }

    deleteGrid();
    createGrid(rows);

    // Apply the correct hover effect based on the current mode
    if (isOpacitorMode) {
        shaderToggle();
    } else if (isShaderMode) {
        removeRainbowEffect();
        shaderToggle();
    } else {
        removeRainbowEffect();
        hoverEffect(rows);
    }

    displaySize(rows);
}

function displaySize(rows) {
    const size = document.querySelector("#size-display");
    if (size) {
        size.textContent = `Grid Size:${rows}x${rows}`;
    }
}

function replaceDivs() {
    const allDivs = document.querySelectorAll(".grid-square");
    allDivs.forEach(div => {
        const newDiv = div.cloneNode(true);
        div.parentNode.replaceChild(newDiv, div);
    });
}

function shaderToggle() {
    removeRainbowEffect(); // Ensure rainbow effect is removed
    replaceDivs();
    const updatedDivs = document.querySelectorAll(".grid-square");
    updatedDivs.forEach(div => {
        if (!div.dataset.opacity) {
            div.dataset.opacity = "0";
        }
        div.addEventListener("mouseover", shaderHoverEffect);
    });

    console.log("shader active");
}

function removeShaderEffect() {
    const updatedDivs = document.querySelectorAll(".grid-square");
    updatedDivs.forEach(div => {
        div.removeEventListener("mouseover", shaderHoverEffect);
    });
}

function shaderHoverEffect(event) {
    if (isOpacitorMode) {
        let currentOpacity = parseFloat(event.target.dataset.opacity);

        if (currentOpacity < 1.0) {
            currentOpacity += 0.1;
            event.target.dataset.opacity = currentOpacity.toString();

            const darknessValue = Math.floor((1 - currentOpacity) * 255);
            event.target.style.backgroundColor = `rgb(${darknessValue}, ${darknessValue}, ${darknessValue})`;
            event.target.classList.add("hover-active");
        }
    }
}

function rainbowToggle() {
    removeShaderEffect(); // Ensure shader effect is removed
    replaceDivs();
    const updatedDivs = document.querySelectorAll(".grid-square");
    updatedDivs.forEach(div => {
        div.addEventListener("mouseover", rainbowHoverEffect);
    });

    console.log("rainbow active");
}

function removeRainbowEffect() {
    const updatedDivs = document.querySelectorAll(".grid-square");
    updatedDivs.forEach(div => {
        div.removeEventListener("mouseover", rainbowHoverEffect);
    });
}

function opacitorToggle() {
    const opacitorBtn = document.querySelector("#opacitor");
    isOpacitorMode = !isOpacitorMode;

    if (isOpacitorMode) {
        shaderToggle();
        opacitorBtn.textContent = "normal";
        console.log("opacitor mode on");
    } else {
        removeShaderEffect();
        opacitorBtn.textContent = "opacitor";
        console.log("opacitor mode off");

        if (isShaderMode) {
            shaderToggle();
        } else {
            rainbowToggle();
        }
    }
}

const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener("click", clearGrid);

const newGridBtn = document.querySelector("#new-grid-btn");
newGridBtn.addEventListener("click", newGrid);

const opacitorBtn = document.querySelector("#opacitor");
opacitorBtn.addEventListener("click", opacitorToggle);
opacitorBtn.textContent = "opacitor";

const rainbowBtn = document.querySelector("#rainbow-toggle");
rainbowBtn.addEventListener("click", modeToggle);

// create initial grid of 16x16 square divs
let rows = 16;
createGrid(rows);
hoverEffect(rows);
displaySize(rows);

if (isShaderMode) {
    rainbowBtn.textContent = "rainbow";
} else {
    rainbowBtn.textContent = "monochrome";
}