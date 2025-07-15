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


function hoverEffect(rows) {
    const allDivs = document.querySelectorAll(".grid-square");
    allDivs.forEach(div => {
        div.addEventListener("mouseover",
            (event) => { 
                event.target.classList.add("hover-active");
            }
        );
    });
    console.log("hovering active");
}
    
    
// create initial grid of 16x16 square divs

function clearGrid() {
    const allDivs = document.querySelectorAll(".hover-active");
    allDivs.forEach(div => {
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
    let rows = parseInt(prompt("Enter the number of rows: ", "16"));
    if (rows) {
        deleteGrid();
        createGrid(rows);
        hoverEffect(rows);
    }
}


const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener("click", clearGrid);

const newGridBtn = document.querySelector("#new-grid-btn");
newGridBtn.addEventListener("click", newGrid);

let rows = 16;
createGrid(rows);
hoverEffect(rows);
