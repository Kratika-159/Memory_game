const tilesContainer = document.querySelector('.tiles');
const colors = ["Turquoise", "Lavender", "Coral", "Crimson", "gold", "SpringGreen", "Fuchsia", "Royalblue"];
const colorsPicklist = [...colors,...colors];
const tileCount = colorsPicklist.length;

for(let i=0;i<tileCount;i++){
    const randomIndex = Math.floor(Math.random()*colorsPicklist.length);
    const color = colorsPicklist[randomIndex];
    const tile = buildMyTile(color);

    colorsPicklist.splice(randomIndex,1);
    tilesContainer.appendChild(tile);

}

let revealedCount = 0;
let activeTile = null;
let awaitingFinish = false;


function buildMyTile(color){
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", "false");



    element.addEventListener('click' ,()=>{
        const revealed = element.getAttribute("data-revealed");
        
        if(awaitingFinish || revealed == "true" || element == activeTile){
            return;
        }

        element.style.backgroundColor = color;

        if(!activeTile){
            activeTile = element;
            return;
        }

        const colorToMatch = activeTile.getAttribute("data-color");

        if(colorToMatch === color){
            element.setAttribute("data-revealed", "true");
            activeTile.setAttribute("data-revealed", "true");

            activeTile = null;
            awaitingFinish = false;
            revealedCount +=2;

            if(revealedCount === tileCount){
                alert("You won the match");
            }
            return;
        }

        awaitingFinish = true;
        
        setTimeout(()=>{
        activeTile.style.backgroundColor = null;
        element.style.backgroundColor = null;
        awaitingFinish = false;
        activeTile = null;
        }, 1000)


    });
    return element;
}