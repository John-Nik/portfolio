let containerAboutMePage = document.querySelector('.background-game');
let boardWidthAboutMePage = containerAboutMePage.offsetWidth;
let boardHeightAboutMePage = containerAboutMePage.offsetHeight;
let screenWidthAboutMePage = window.innerWidth;
let squareSizeAboutMePage = 32;
let columnsToFitAboutMePage = Math.floor(boardWidthAboutMePage / squareSizeAboutMePage);
let rowsToFitAboutMePage = Math.floor(boardHeightAboutMePage / squareSizeAboutMePage);
let matrixAboutMePage = [];
let bombsPlacedAboutMePage = 0;
let difficultyAboutMePage;
let squaresAboutMePage;
let rowsAboutMePage;
let squaresInBoardAboutMePage = 0;
let squaresInterractedWithAboutMePage = 0;
let squaresInViewportAboutMePage = 0;
let autoplayRunningAboutMePage = true;
let autoplayIntervalToDigSquareAboutMePage;
let windowWidthAboutMePage = window.innerWidth;
let flagSvgAboutMePage = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect x="0.666504" width="17" height="18" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_14_9231" transform="matrix(0.00827206 0 0 0.0078125 -0.0294118 0)"/></pattern><image id="image0_14_9231" width="128" height="128" xlink:href="data:image/png;base64,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"/></defs></svg>';






containerAboutMePage.addEventListener('contextmenu', (e) => {
    e.preventDefault();
})


populateBoardAboutMePage();
function populateBoardAboutMePage() {
    matrixAboutMePage = [];
    containerAboutMePage.innerHTML = '';
    squaresInBoardAboutMePage = 0;
    squaresInterractedWithAboutMePage = 0;
    bombsPlacedAboutMePage = 0;

    difficultyAboutMePage = 0.35;


    containerAboutMePage.style.gridTemplateRows = `repeat(${rowsToFitAboutMePage}, minmax(24px, 1fr))`;

    for (let i = 0; i < rowsToFitAboutMePage; i++) {
        matrixAboutMePage.push([]);
        containerAboutMePage.insertAdjacentHTML('beforeEnd', '<div class="row"></div>')
    }

    rowsAboutMePage = document.querySelectorAll('.row');
    rowsAboutMePage.forEach((row, rowIndex) => {
        for (let i = 0; i < columnsToFitAboutMePage; i++) {
            generateSquareAboutMePage(row, rowIndex, i);
        }

        row.style.gridTemplateColumns = `repeat(${columnsToFitAboutMePage}, minmax(24px, 1fr))`
    })

    squaresAboutMePage = document.querySelectorAll('.square');
}


function generateSquareAboutMePage(htmlRow, matrixRowIndex, squareColumn) {
    let squareHasBomb = false;

    if (Math.random() < difficultyAboutMePage) {
        bombsPlacedAboutMePage++;
        squareHasBomb = true;
    }

    matrixAboutMePage[matrixRowIndex].push({
        isRevealed: false,
        hasBomb: squareHasBomb,
        isFlagged: false,
        position: `${matrixRowIndex}_${squareColumn}`,
        isWithinViewport: true
    })

    squaresInBoardAboutMePage++;
    squaresInViewportAboutMePage++;
    htmlRow.insertAdjacentHTML('beforeEnd', `<div class="square" data-position="${matrixRowIndex}_${squareColumn}"></div>`)
}


autoplayGameAboutMePage();


function autoplayGameAboutMePage() {
    let condensedMatrixAboutMePage = matrixAboutMePage.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue);
    })
    
    autoplayRunningAboutMePage = true;

    randomlySelectSquare();
    function randomlySelectSquare() {
        if (condensedMatrixAboutMePage.length == 0) {
            clearInterval(autoplayIntervalToDigSquareAboutMePage);
            populateBoardAboutMePage();
            autoplayGameAboutMePage();
        } else {
            let randomGeneratedNumber = Math.floor(Math.random() * condensedMatrixAboutMePage.length);
            let position = condensedMatrixAboutMePage[randomGeneratedNumber].position;
            let Y = position.split('_')[0];
            let X = position.split('_')[1];
            
            if (condensedMatrixAboutMePage[randomGeneratedNumber].hasBomb) {
                matrixAboutMePage[Y][X].isFlagged = true;
                let squareToUpdate = document.querySelector(`[data-position="${Y}_${X}"]`);
                squareToUpdate.innerHTML = flagSvgAboutMePage;
                condensedMatrixAboutMePage.splice(randomGeneratedNumber, 1);
                return;
            }

            digSquareAboutMePage(Y, X);
            condensedMatrixAboutMePage.splice(randomGeneratedNumber, 1);
            if (countBombsAboutMePage(Y, X) == 0) {
                condensedMatrixAboutMePage = condensedMatrixAboutMePage.filter((square) => { if (!square.isRevealed && !square.isFlagged) {return square} });
            }
        }
    }

    autoplayIntervalToDigSquareAboutMePage = setInterval(randomlySelectSquare, 1100);
}

function startGameAboutMePage() {
    populateBoardAboutMePage();  
}


function userLeftClickAboutMePage(clickedSquare) {
    if (!clickedSquare.currentTarget.classList.contains('revealed')) {
        let Y = clickedSquare.currentTarget.dataset.position.split('_')[0];
        let X = clickedSquare.currentTarget.dataset.position.split('_')[1];

        digSquareAboutMePage(Y, X);
        isGameFinishedAboutMePage();
    }
}


function digSquareAboutMePage(Y, X) {
    let squareToUpdate = document.querySelector(`[data-position="${Y}_${X}"]`)

    if (matrixAboutMePage[Y][X].isFlagged == false) {
        matrixAboutMePage[Y][X].isRevealed = true;
        squaresInterractedWithAboutMePage++;

        if (matrixAboutMePage[Y][X].hasBomb) {
            squareToUpdate.innerHTML = '<img src="/icons/bomb.svg"></img>';
            squareToUpdate.classList.add('revealed');
            userDugBombPosition = `${Y}_${X}`;
        } else {
            if (countBombsAboutMePage(Y, X) == 0) {
                emptySquareAboutMePage(Y, X);
            } else {
                squareToUpdate.innerHTML = countBombsAboutMePage(Y, X);
                squareToUpdate.classList.add(`B${countBombsAboutMePage(Y, X)}`);
            }
        }

        squareToUpdate.classList.add('revealed');
    }
}


function userRightClickAboutMePage(rightClickedSquare) {
    rightClickedSquare.preventDefault();
    let Y = rightClickedSquare.currentTarget.dataset.position.split('_')[0];
    let X = rightClickedSquare.currentTarget.dataset.position.split('_')[1];
    
    if (rightClickedSquare.currentTarget.classList.contains('revealed') == false) {
        if (matrixAboutMePage[Y][X].isFlagged == false) {

            matrixAboutMePage[Y][X].isFlagged = true;
            squaresInterractedWithAboutMePage++;
            bombsPlacedAboutMePage = bombsPlacedAboutMePage - 1;
            rightClickedSquare.currentTarget.innerHTML = flagSvgAboutMePage;
        } else {

            matrixAboutMePage[Y][X].isFlagged = false;
            squaresInterractedWithAboutMePage = squaresInterractedWithAboutMePage - 1;
            bombsPlacedAboutMePage++;
            rightClickedSquare.currentTarget.innerHTML = '';
        }
    }

    isGameFinishedAboutMePage();
}




function countBombsAboutMePage(Y, X) {
    let bombsCounted = 0;
    let surroundingSquares = checkSurroundingSquaresAboutMePage(Y, X);

    surroundingSquares.forEach((square) => {
        if (square.hasBomb) {
            bombsCounted++;
        }
    })

    return bombsCounted;
}


function checkSurroundingSquaresAboutMePage(Y, X) {
    let surroundingSquares = [];

    // checks to see if the line above or below the clicked line is outside of the matrixAboutMePage bounds. If not, it does the same test to the left and right columns. If they are within bounds, it pushes the square to the surroundingSquares Array with the positional information in it
    for (let i = -1; i < 2; i++) {
        if (matrixAboutMePage[Number(Y) + Number(i)] != undefined) {
            for (let j = -1; j < 2; j++) {
                if (matrixAboutMePage[Number(Y) + Number(i)][Number(X) + Number(j)] != undefined) {
                    if (Number(Y) + Number(i) != Y || Number(X) + Number(j) != X) {
                        surroundingSquares.push( matrixAboutMePage[Number(Y) + Number(i)][Number(X) + Number(j)] )
                    }
                }
            }
        }
    }

    return surroundingSquares;
}


function emptySquareAboutMePage(Y, X) {
    let surroundingSquares = checkSurroundingSquaresAboutMePage(Y, X);

    surroundingSquares.forEach((square) => {
        let Y = square.position.split('_')[0];
        let X = square.position.split('_')[1];

        if (matrixAboutMePage[Y][X].isRevealed == false && matrixAboutMePage[Y][X].isFlagged == false) {
            let squareToUpdate = document.querySelector(`[data-position="${Y}_${X}"]`)
            let bombsAround = countBombsAboutMePage(Y, X);

            squaresInterractedWithAboutMePage++;
            matrixAboutMePage[Y][X].isRevealed = true;
            squareToUpdate.classList.add('revealed');
            squareToUpdate.classList.add(`B${bombsAround}`);
            if (bombsAround != 0) {
                squareToUpdate.innerHTML = bombsAround
            } else {
                emptySquareAboutMePage(Y, X);
            }
        }
    })
}


function isGameFinishedAboutMePage() {
    if (squaresInViewportAboutMePage === squaresInterractedWithAboutMePage) {
        if (autoplayRunningAboutMePage) {
            populateBoardAboutMePage();
        } else {
            winGame();
        }
    }
}


window.addEventListener('resize', () => {
    let newBoardWidth = containerAboutMePage.offsetWidth;
    let newBoardHeight = containerAboutMePage.offsetHeight;
    let newColumnsToFit = Math.floor(newBoardWidth / squareSizeAboutMePage);
    let newRowsToFit = Math.floor(newBoardHeight / squareSizeAboutMePage);
    let deltaNewColumnsOldColumns = newColumnsToFit - columnsToFitAboutMePage;
    let deltaNewRowsOldRows = newRowsToFit - rowsToFitAboutMePage;
    screenWidthAboutMePage = window.innerWidth;



    if (newColumnsToFit > columnsToFitAboutMePage) {
        clearInterval(autoplayIntervalToDigSquareAboutMePage);
        let lastColumnSquares = [];

        rowsAboutMePage.forEach((row) => {
            if (row.lastChild.classList.contains('revealed') && row.lastChild.textContent != '') {
                lastColumnSquares.push(row.lastChild)
            }
        })

        
        for (let i = 0; i < deltaNewColumnsOldColumns; i++) {
            rowsAboutMePage.forEach((row, rowIndex) => {
                let rowLength = matrixAboutMePage[rowIndex].length;

                generateSquareAboutMePage(row, rowIndex, rowLength)

                row.lastChild.addEventListener('click', (clickedSquare) => {
                    userLeftClickAboutMePage(clickedSquare);
                })

                row.lastChild.addEventListener('contextmenu', (rightClickedSquare) => {
                    userRightClickAboutMePage(rightClickedSquare);
                })

                row.style.gridTemplateColumns = `repeat(${newColumnsToFit}, minmax(24px, 1fr))`  
            })
        }

        lastColumnSquares.forEach((square) => {
            updateOldSiblingSquaresNearNewlyAddedSquaresAboutMePage(square);
        })

        columnsToFitAboutMePage = newColumnsToFit;
        boardWidthAboutMePage = newBoardWidth;
        squaresAboutMePage = document.querySelectorAll('.square');
        autoplayGameAboutMePage();
    }

    if (newRowsToFit > rowsToFitAboutMePage) {
        clearInterval(autoplayIntervalToDigSquareAboutMePage);
        for (let i = 0; i < deltaNewRowsOldRows; i++) {
            let matrixLastRowIndex = matrixAboutMePage.length - 1;

            matrixAboutMePage.push([]);
            containerAboutMePage.insertAdjacentHTML('beforeEnd', '<div class="row"></div>');

            for (let j = 0; j < columnsToFitAboutMePage; j++) {
                generateSquareAboutMePage(containerAboutMePage.lastChild, matrixLastRowIndex, j)
                
                containerAboutMePage.lastChild.lastChild.addEventListener('click', (clickedSquare) => {
                    userLeftClickAboutMePage(clickedSquare);
                })

                containerAboutMePage.lastChild.lastChild.addEventListener('contextmenu', (rightClickedSquare) => {
                    userRightClickAboutMePage(rightClickedSquare);
                })
            }
            containerAboutMePage.lastChild.style.gridTemplateColumns = `repeat(${columnsToFitAboutMePage}, minmax(24px, 1fr))`;
        }


        containerAboutMePage.lastChild.previousSibling.childNodes.forEach((square) => {
            if (square.classList.contains('revealed') && square.textContent != '') {
                updateOldSiblingSquaresNearNewlyAddedSquaresAboutMePage(square);
            }
        })

        containerAboutMePage.style.gridTemplateRows = `repeat(${newRowsToFit}, minmax(24px, 1fr))`;
        rowsToFitAboutMePage = newRowsToFit;
        boardHeightAboutMePage = newBoardHeight;
        rowsAboutMePage = document.querySelectorAll('.row');
        autoplayGameAboutMePage();
    }
})

function updateOldSiblingSquaresNearNewlyAddedSquaresAboutMePage(square) {
    let Y = square.dataset.position.split('_')[0];
    let X = square.dataset.position.split('_')[1];

    let oldBombsSurrounding = square.textContent;
    let oldBombsSurroundingClass = 'B' + oldBombsSurrounding;
    let bombsCurrentlyAround = countBombsAboutMePage(Y, X);
    
    
    square.innerHTML = bombsCurrentlyAround;
    square.classList.replace(oldBombsSurroundingClass, `B${bombsCurrentlyAround}`);
}

watchIfUserSwitchesPageAboutMePage();
function watchIfUserSwitchesPageAboutMePage() {
    const watchUserInputAboutMePage = document.querySelector('.is-minesweeper-playing-in-about-page');
    
    const mutationObserverAboutMePage = new MutationObserver(() => {
        if (watchUserInputAboutMePage.childElementCount == 0) {
            clearInterval(autoplayIntervalToDigSquareAboutMePage);
            matrixAboutMePage = [];
            squaresInBoardAboutMePage = 0;
            squaresInterractedWithAboutMePage = 0;
            bombsPlacedAboutMePage = 0;
            boardWidthAboutMePage = 0;
            boardHeightAboutMePage = 0;
            screenWidthAboutMePage = 0;
            columnsToFitAboutMePage = 0;
            rowsToFitAboutMePage = 0;
            matrixAboutMePage = [];
            difficultyAboutMePage;
            squaresAboutMePage;
            rowsAboutMePage;
            squaresInBoardAboutMePage = 0;
            squaresInterractedWithAboutMePage = 0;
            squaresInViewportAboutMePage = 0;
            autoplayRunningAboutMePage = false;
            userDugBombPosition = '';
            autoplayIntervalToDigSquareAboutMePage;
        } else {
            setTimeout(() => {
                containerAboutMePage = document.querySelector('.background-game');
                boardWidthAboutMePage = containerAboutMePage.offsetWidth;
                boardHeightAboutMePage = containerAboutMePage.offsetHeight;
                screenWidthAboutMePage = window.innerWidth;
                columnsToFitAboutMePage = Math.floor(boardWidthAboutMePage / squareSizeAboutMePage);
                rowsToFitAboutMePage = Math.floor(boardHeightAboutMePage / squareSizeAboutMePage);
                autoplayRunningAboutMePage = true;
                populateBoardAboutMePage();
                autoplayGameAboutMePage();
            }, 150)
        }
    })

    mutationObserverAboutMePage.observe(watchUserInputAboutMePage, { childList: true });
}