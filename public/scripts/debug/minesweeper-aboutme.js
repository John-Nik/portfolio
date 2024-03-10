const container = document.querySelector('.background-game');
let boardWidth = container.offsetWidth;
let boardHeight = container.offsetHeight;
let screenWidth = window.innerWidth;
let squareSize = 32;
let columnsToFit = Math.floor(boardWidth / squareSize);
let rowsToFit = Math.floor(boardHeight / squareSize);
let matrix = [];
let bombsPlaced = 0;
let difficulty;
let squares;
let rows;
let squaresInBoard = 0;
let squaresInterractedWith = 0;
let squaresInViewport = 0;
let autoplayRunning = true;
let autoplayIntervalToDigSquare;
let windowWidth = window.innerWidth;
let flagSvg = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect x="0.666504" width="17" height="18" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_14_9231" transform="matrix(0.00827206 0 0 0.0078125 -0.0294118 0)"/></pattern><image id="image0_14_9231" width="128" height="128" xlink:href="data:image/png;base64,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"/></defs></svg>';






container.addEventListener('contextmenu', (e) => {
    e.preventDefault();
})


populateBoard();
function populateBoard() {
    matrix = [];
    container.innerHTML = '';
    squaresInBoard = 0;
    squaresInterractedWith = 0;
    bombsPlaced = 0;

    difficulty = 0.35;


    container.style.gridTemplateRows = `repeat(${rowsToFit}, minmax(24px, 1fr))`;

    for (let i = 0; i < rowsToFit; i++) {
        matrix.push([]);
        container.insertAdjacentHTML('beforeEnd', '<div class="row"></div>')
    }

    rows = document.querySelectorAll('.row');
    rows.forEach((row, rowIndex) => {
        for (let i = 0; i < columnsToFit; i++) {
            generateSquare(row, rowIndex, i);
        }

        row.style.gridTemplateColumns = `repeat(${columnsToFit}, minmax(24px, 1fr))`
    })

    squares = document.querySelectorAll('.square');
}


function generateSquare(htmlRow, matrixRowIndex, squareColumn) {
    let squareHasBomb = false;

    if (Math.random() < difficulty) {
        bombsPlaced++;
        squareHasBomb = true;
    }

    matrix[matrixRowIndex].push({
        isRevealed: false,
        hasBomb: squareHasBomb,
        isFlagged: false,
        position: `${matrixRowIndex}_${squareColumn}`,
        isWithinViewport: true
    })

    squaresInBoard++;
    squaresInViewport++;
    htmlRow.insertAdjacentHTML('beforeEnd', `<div class="square" data-position="${matrixRowIndex}_${squareColumn}"></div>`)
}


autoplayGame();


function autoplayGame() {
    let condensedMatrix = matrix.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue);
    })
    
    autoplayRunning = true;

    randomlySelectSquare();
    function randomlySelectSquare() {
        if (condensedMatrix.length == 0) {
            clearInterval(autoplayIntervalToDigSquare);
            populateBoard();
            autoplayGame();
        } else {
            let randomGeneratedNumber = Math.floor(Math.random() * condensedMatrix.length);
            let position = condensedMatrix[randomGeneratedNumber].position;
            let Y = position.split('_')[0];
            let X = position.split('_')[1];
            
            if (condensedMatrix[randomGeneratedNumber].hasBomb) {
                matrix[Y][X].isFlagged = true;
                let squareToUpdate = document.querySelector(`[data-position="${Y}_${X}"]`);
                squareToUpdate.innerHTML = flagSvg;
                condensedMatrix.splice(randomGeneratedNumber, 1);
                return;
            }

            digSquare(Y, X);
            condensedMatrix.splice(randomGeneratedNumber, 1);
            if (countBombs(Y, X) == 0) {
                condensedMatrix = condensedMatrix.filter((square) => { if (!square.isRevealed && !square.isFlagged) {return square} });
            }
        }
    }

    autoplayIntervalToDigSquare = setInterval(randomlySelectSquare, 1100);
}

function startGame() {
    populateBoard();  
}


function userLeftClick(clickedSquare) {
    if (!clickedSquare.currentTarget.classList.contains('revealed')) {
        let Y = clickedSquare.currentTarget.dataset.position.split('_')[0];
        let X = clickedSquare.currentTarget.dataset.position.split('_')[1];

        digSquare(Y, X);
        isGameFinished();
    }
}


function digSquare(Y, X) {
    let squareToUpdate = document.querySelector(`[data-position="${Y}_${X}"]`)

    if (matrix[Y][X].isFlagged == false) {
        matrix[Y][X].isRevealed = true;
        squaresInterractedWith++;

        if (matrix[Y][X].hasBomb) {
            squareToUpdate.innerHTML = '<img src="/icons/bomb.svg"></img>';
            squareToUpdate.classList.add('revealed');
            userDugBombPosition = `${Y}_${X}`;
        } else {
            if (countBombs(Y, X) == 0) {
                emptySquare(Y, X);
            } else {
                squareToUpdate.innerHTML = countBombs(Y, X);
                squareToUpdate.classList.add(`B${countBombs(Y, X)}`);
            }
        }

        squareToUpdate.classList.add('revealed');
    }
}


function userRightClick(rightClickedSquare) {
    rightClickedSquare.preventDefault();
    let Y = rightClickedSquare.currentTarget.dataset.position.split('_')[0];
    let X = rightClickedSquare.currentTarget.dataset.position.split('_')[1];
    
    if (rightClickedSquare.currentTarget.classList.contains('revealed') == false) {
        if (matrix[Y][X].isFlagged == false) {

            matrix[Y][X].isFlagged = true;
            squaresInterractedWith++;
            bombsPlaced = bombsPlaced - 1;
            rightClickedSquare.currentTarget.innerHTML = flagSvg;
            tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
        } else {

            matrix[Y][X].isFlagged = false;
            squaresInterractedWith = squaresInterractedWith - 1;
            bombsPlaced++;
            rightClickedSquare.currentTarget.innerHTML = '';
            tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
        }
    }

    isGameFinished();
}




function countBombs(Y, X) {
    let bombsCounted = 0;
    let surroundingSquares = checkSurroundingSquares(Y, X);

    surroundingSquares.forEach((square) => {
        if (square.hasBomb) {
            bombsCounted++;
        }
    })

    return bombsCounted;
}


function checkSurroundingSquares(Y, X) {
    let surroundingSquares = [];

    // checks to see if the line above or below the clicked line is outside of the matrix bounds. If not, it does the same test to the left and right columns. If they are within bounds, it pushes the square to the surroundingSquares Array with the positional information in it
    for (let i = -1; i < 2; i++) {
        if (matrix[Number(Y) + Number(i)] != undefined) {
            for (let j = -1; j < 2; j++) {
                if (matrix[Number(Y) + Number(i)][Number(X) + Number(j)] != undefined) {
                    if (Number(Y) + Number(i) != Y || Number(X) + Number(j) != X) {
                        surroundingSquares.push( matrix[Number(Y) + Number(i)][Number(X) + Number(j)] )
                    }
                }
            }
        }
    }

    return surroundingSquares;
}


function emptySquare(Y, X) {
    let surroundingSquares = checkSurroundingSquares(Y, X);

    surroundingSquares.forEach((square) => {
        let Y = square.position.split('_')[0];
        let X = square.position.split('_')[1];

        if (matrix[Y][X].isRevealed == false && matrix[Y][X].isFlagged == false) {
            let squareToUpdate = document.querySelector(`[data-position="${Y}_${X}"]`)
            let bombsAround = countBombs(Y, X);

            squaresInterractedWith++;
            matrix[Y][X].isRevealed = true;
            squareToUpdate.classList.add('revealed');
            squareToUpdate.classList.add(`B${bombsAround}`);
            if (bombsAround != 0) {
                squareToUpdate.innerHTML = bombsAround
            } else {
                emptySquare(Y, X);
            }
        }
    })
}


function isGameFinished() {
    if (squaresInViewport === squaresInterractedWith) {
        if (autoplayRunning) {
            populateBoard();
        } else {
            winGame();
        }
    }
}


let isDesktopRes;
let panelShownPriorWindowResize;
window.addEventListener('resize', () => {
    let newBoardWidth = container.offsetWidth;
    let newBoardHeight = container.offsetHeight;
    let newColumnsToFit = Math.floor(newBoardWidth / squareSize);
    let newRowsToFit = Math.floor(newBoardHeight / squareSize);
    let deltaNewColumnsOldColumns = newColumnsToFit - columnsToFit;
    let deltaNewRowsOldRows = newRowsToFit - rowsToFit;
    screenWidth = window.innerWidth;



    if (newColumnsToFit > columnsToFit) {
        clearInterval(autoplayIntervalToDigSquare);
        let lastColumnSquares = [];

        rows.forEach((row) => {
            if (row.lastChild.classList.contains('revealed') && row.lastChild.textContent != '') {
                lastColumnSquares.push(row.lastChild)
            }
        })

        
        for (let i = 0; i < deltaNewColumnsOldColumns; i++) {
            rows.forEach((row, rowIndex) => {
                let rowLength = matrix[rowIndex].length;

                generateSquare(row, rowIndex, rowLength)

                row.lastChild.addEventListener('click', (clickedSquare) => {
                    userLeftClick(clickedSquare);
                })

                row.lastChild.addEventListener('contextmenu', (rightClickedSquare) => {
                    userRightClick(rightClickedSquare);
                })

                row.style.gridTemplateColumns = `repeat(${newColumnsToFit}, minmax(24px, 1fr))`  
            })
        }

        lastColumnSquares.forEach((square) => {
            updateOldSiblingSquaresNearNewlyAddedSquares(square);
        })

        columnsToFit = newColumnsToFit;
        boardWidth = newBoardWidth;
        squares = document.querySelectorAll('.square');
        autoplayGame();
    }

    if (newRowsToFit > rowsToFit) {
        clearInterval(autoplayIntervalToDigSquare);
        for (let i = 0; i < deltaNewRowsOldRows; i++) {
            let matrixLastRowIndex = matrix.length - 1;

            matrix.push([]);
            container.insertAdjacentHTML('beforeEnd', '<div class="row"></div>');

            for (let j = 0; j < columnsToFit; j++) {
                generateSquare(container.lastChild, matrixLastRowIndex, j)
                
                container.lastChild.lastChild.addEventListener('click', (clickedSquare) => {
                    userLeftClick(clickedSquare);
                })

                container.lastChild.lastChild.addEventListener('contextmenu', (rightClickedSquare) => {
                    userRightClick(rightClickedSquare);
                })
            }
            container.lastChild.style.gridTemplateColumns = `repeat(${columnsToFit}, minmax(24px, 1fr))`;
        }


        container.lastChild.previousSibling.childNodes.forEach((square) => {
            if (square.classList.contains('revealed') && square.textContent != '') {
                updateOldSiblingSquaresNearNewlyAddedSquares(square);
            }
        })

        container.style.gridTemplateRows = `repeat(${newRowsToFit}, minmax(24px, 1fr))`;
        rowsToFit = newRowsToFit;
        boardHeight = newBoardHeight;
        rows = document.querySelectorAll('.row');
        autoplayGame();
    }
})

function updateOldSiblingSquaresNearNewlyAddedSquares(square) {
    let Y = square.dataset.position.split('_')[0];
    let X = square.dataset.position.split('_')[1];

    let oldBombsSurrounding = square.textContent;
    let oldBombsSurroundingClass = 'B' + oldBombsSurrounding;
    let bombsCurrentlyAround = countBombs(Y, X);
    
    
    square.innerHTML = bombsCurrentlyAround;
    square.classList.replace(oldBombsSurroundingClass, `B${bombsCurrentlyAround}`);
}