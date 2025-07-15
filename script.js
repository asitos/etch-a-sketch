function createGrid(rows) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < rows; j++) {
            const div = document.createElement("div");
            div.classList.add("grid-square");
            div.style.width = "calc(100% / 16)";
            div.style.height = "calc(100% / 16)";
            div.style.border = "1px solid #ccc";
            div.style.boxSizing = "border-box";
            div.style.flex = "1 0 calc(100% / 16)";
    
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
let rows = 16;
createGrid(rows);
hoverEffect(rows);
