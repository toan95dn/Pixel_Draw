let board = document.querySelector(".board");
let titles;
let isDrawing = false;

//OPTIONS

//Erase Button
let eraseButton = document.querySelector("#erase");
let isEraseOn = false;
eraseButton.addEventListener('click', e => {
    if (isEraseOn === true) {
        isEraseOn = false;
        e.target.classList.remove('isClicked');
    }
    else {
        isEraseOn = true;
        e.target.classList.add('isClicked');
    }
});

//RainBow Button
let rainbowButton = document.querySelector("#rainbow");
let isRanbowOn = false;
rainbowButton.addEventListener('click', e => {
    if (isRanbowOn === true) {
        isRanbowOn = false;
        e.target.classList.remove('isClicked');

    }
    else {
        isRanbowOn = true;
        e.target.classList.add('isClicked');
    }
});

//Clear Button
let clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', e => {
    e.target.classList.add('isClicked');

    (function clearBoard() {
        let allTiles = document.querySelectorAll('.title');
        allTiles.forEach(title => title.style.backgroundColor = 'white')
    })()

    setTimeout(() => e.target.classList.remove('isClicked'), 100);
});

//Board 
function createBoard(size) {

    board.style.gridTemplateColumns = `repeat(${size},1fr)`;
    board.style.gridTemplateRows = `repeat(${size},1fr)`;

    for (let i = 0; i < size * size; i++) {
        let title = document.createElement("div");
        title.classList.add("title");
        board.appendChild(title);

        title.addEventListener('mousemove', changeColorWhenPressed);
        title.addEventListener('click', changeColor);
        title.addEventListener('mousedown', () => isDrawing = true);
        window.addEventListener('mouseup', () => isDrawing = false);

    }

}

function changeColorWhenPressed(e) {
    if (isDrawing) {
        changeColor(e);
    }
}

function changeColor(e) {
    if (!isEraseOn) {
        if (!isRanbowOn) {
            let currColor = document.querySelector('input[type = "color"]').value;
            e.target.style.backgroundColor = currColor;
        }
        else {
            let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            e.target.style.backgroundColor = randomColor;
        }
    }
    else {
        e.target.style.backgroundColor = 'white';
    }
}


//SIZE OF GRID
let rangeBar = document.querySelector('input[type = "range"]');
rangeBar.addEventListener("change", () => {
    (function deleteAllOldTitle() {
        while (board.firstChild) {
            board.removeChild(board.firstChild);
        }
    })();
    createBoard(parseInt(rangeBar.value));
})

//INITIALIZE
createBoard(16);



