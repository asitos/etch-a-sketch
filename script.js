function createGrid(rows) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < rows; j++) {
            const div = document.createElement("div");
            div.classList.add("grid-square");
            div.style.width = `calc(100% / ${rows})`;
            div.style.height = `calc(100% / ${rows})`;
            div.style.border = "1px solid #ccc";
            div.style.boxSizing = "border-box";
            div.style.flex = `1 0 calc(100% / ${rows})`;
    
            document.querySelector("#grid-container").appendChild(div);
        }
    }

    console.log("grid created");
}

function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);      // any hue
    const pastel = `hsl(${hue}, 100%, 85%)`;            // soft saturation + lightness
    return pastel;
}

function hoverEffect(rows) {
    const allDivs = document.querySelectorAll(".grid-square");
    allDivs.forEach(div => {
        div.addEventListener("mouseover",
            (event) => { 
                event.target.classList.add("hover-active");
                event.target.style.backgroundColor = getRandomColor();
            }
        );
    });
    console.log("hovering active");
}
    
    
function clearGrid() {
    const allDivs = document.querySelectorAll(".hover-active");
    allDivs.forEach(div => {
        div.style.backgroundColor = "#fff";
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
        alert("Please enter a valid value and learn to read retard");
    } else {
        deleteGrid();
        createGrid(rows);
        hoverEffect(rows);
        displaySize(rows);
    }
}

function displaySize(rows) {
    const size = document.querySelector("#size-display");
    if (size) {
        size.textContent = `Grid Size:${rows}x${rows}` 
    }
}


const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener("click", clearGrid);

const newGridBtn = document.querySelector("#new-grid-btn");
newGridBtn.addEventListener("click", newGrid);

// create initial grid of 16x16 square divs
let rows = 16;
createGrid(rows);
hoverEffect(rows);
displaySize(rows);
