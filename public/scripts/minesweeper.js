const container = document.querySelector('#game');
let boardWidth = container.offsetWidth;
let boardHeight = container.offsetHeight;
let screenWidth = window.innerWidth;
let squareSize = isMobile(); // returns 24 or 32
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
let userDugBombPosition = '';
let autoplayIntervalToDigSquare;
let isBombsPlacedTextVisibleToUser = false;
const tellUserBombsPlacedContainer = document.querySelector('.bombs-placed-container');
const tellUserBombsPlacedWrapper = document.querySelector('.bombs-placed-container .wrapper');
const tellUserBombsPlaced = document.querySelector('.bombs-placed-text');
let instructions = document.querySelector('.game-instructions-span');
let windowWidth = window.innerWidth;
let flagSvg = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect x="0.666504" width="17" height="18" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_14_9231" transform="matrix(0.00827206 0 0 0.0078125 -0.0294118 0)"/></pattern><image id="image0_14_9231" width="128" height="128" xlink:href="data:image/png;base64,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"/></defs></svg>';
let mobileUserWantsToFlag = 0;
const triggerTapFlagIcon = document.querySelector('.flag-icon-wrap');
const gameSettings = document.querySelector('.gameSettings');





triggerTapFlagIcon.addEventListener('click', () => {
    mobileUserWantsToFlag = (mobileUserWantsToFlag + 1) % 2;
})


chooseDifficulty();

function chooseDifficulty() {
    let userSelectedDifficulty = document.querySelector('.difficulty-feedback.active');
    let difficultyLevel = userSelectedDifficulty.dataset.difficulty;

    const difficultyVariables = [0.12, 0.15, 0.20, 0.25];
    
    difficulty = difficultyVariables[difficultyLevel];
}


container.addEventListener('contextmenu', (e) => {
    e.preventDefault();
})

// changes the instructions showcased to the user depending on the device screen width
if (boardWidth < 1024) {
    instructions.innerHTML = '// Click bottom right flag to switch to flagging or digging squares';
} else {
    instructions.innerHTML = '// Left click to dig square <br> // Right click to flag square'
}


populateBoard();
function populateBoard() {
    // reset everything
    matrix = [];
    container.innerHTML = '';
    squaresInBoard = 0;
    squaresInterractedWith = 0;
    bombsPlaced = 0;

    if (autoplayRunning) {
        difficulty = 0.2;
    } else {
        chooseDifficulty();
    }


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


watchIfUserStartedGame();
autoplayGame();


function autoplayGame() {
    let condensedMatrix = matrix.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue);
    })
    
    autoplayRunning = true;

    unrevealedSquares();
    function unrevealedSquares() {
        let unrevealed_squares = condensedMatrix.filter((square) => { if (!square.isRevealed && !square.isFlagged) {return square} });

        randomlySelectSquare();
        function randomlySelectSquare() {
            if (unrevealed_squares.length == 0) {
                clearInterval(autoplayIntervalToDigSquare);
                populateBoard();
                autoplayGame();
            } else {
                let randomGeneratedNumber = Math.floor(Math.random() * unrevealed_squares.length);
                let position = unrevealed_squares[randomGeneratedNumber].position;
                let Y = position.split('_')[0];
                let X = position.split('_')[1];

                if (unrevealed_squares[randomGeneratedNumber].hasBomb) {
                    matrix[Y][X].isFlagged = true;
                    let squareToUpdate = document.querySelector(`[data-position="${Y}_${X}"]`);
                    squareToUpdate.innerHTML = flagSvg;
                    return;
                }

                digSquare(Y, X);
            }
        }
    }

    autoplayIntervalToDigSquare = setInterval(unrevealedSquares, 1500);
}

class informUserBombsPlacedText {
    static reset() {
        tellUserBombsPlacedContainer.style.display = 'none';
        tellUserBombsPlacedWrapper.style.left = '0px';
        tellUserBombsPlacedWrapper.style.top = '0px';
        tellUserBombsPlacedWrapper.style.fontSize = '3rem';
        tellUserBombsPlacedContainer.style.opacity = '0';
        isBombsPlacedTextVisibleToUser = false;
    }

    static fadeOut() {
        tellUserBombsPlacedContainer.style.opacity = '0';
        isBombsPlacedTextVisibleToUser = false;
    }

    static moveDownRightCorner() {
        tellUserBombsPlacedWrapper.style.left = 'calc(50% - 122px + 48px)';
        tellUserBombsPlacedWrapper.style.top = 'calc(50% - 40px + 68px)';
    }

    static decreaseFontSize() {
        tellUserBombsPlacedWrapper.style.fontSize = '1rem';
    }

    static resetFontSize() {
        tellUserBombsPlacedWrapper.style.fontSize = '3rem';
    }

    static reduceOpacity() {
        tellUserBombsPlacedContainer.style.opacity = '0.7';
    }

    static fullOpacity() {
        tellUserBombsPlacedContainer.style.opacity = '1';
    }

    static centerPosition() {
        tellUserBombsPlacedWrapper.style.left = '0px';
        tellUserBombsPlacedWrapper.style.top = '0px';
    }

    static fadeIn() {
        tellUserBombsPlacedContainer.style.display = 'flex';

        setTimeout(() => {
            tellUserBombsPlacedContainer.style.opacity = '1';
        }, 100)
        
        isBombsPlacedTextVisibleToUser = true;
    }
}

function startGame() {
    populateBoard();

    if (isBombsPlacedTextVisibleToUser) {
        informUserBombsPlacedText.centerPosition();
        informUserBombsPlacedText.fullOpacity();
        informUserBombsPlacedText.resetFontSize();

        setTimeout(() => {
            informUserBombsPlacedText.moveDownRightCorner();
            informUserBombsPlacedText.reduceOpacity();
            informUserBombsPlacedText.decreaseFontSize();
        }, 2500);
        
        setTimeout(() => {
            tellUserBombsPlaced.textContent = '//'

            setTimeout(() => {
                tellUserBombsPlaced.textContent = `// ${bombsPlaced}`;
            }, 750)
        }, 2000)
    } else {
        informUserBombsPlacedText.fadeIn();
        setTimeout(() => {
            informUserBombsPlacedText.moveDownRightCorner();
            informUserBombsPlacedText.reduceOpacity();
            informUserBombsPlacedText.decreaseFontSize();
        }, 2000);
        tellUserBombsPlaced.textContent = `// ${bombsPlaced}`;
    }

    setTimeout(() => {
        squares.forEach((square) => {
            square.addEventListener('click', (clickedSquare) => {
                userLeftClick(clickedSquare)
            })
            
            square.addEventListener('contextmenu', (rightClickedSquare) => {
                userRightClick(rightClickedSquare)
            })
        })
    }, 1500)    
}


function userLeftClick(clickedSquare) {
    if (mobileUserWantsToFlag) {
        userRightClick(clickedSquare);
        return;
    }

    if (!clickedSquare.currentTarget.classList.contains('revealed')) {
        let Y = clickedSquare.currentTarget.dataset.position.split('_')[0];
        let X = clickedSquare.currentTarget.dataset.position.split('_')[1];

        digSquare(Y, X);
        isGameFinished();
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


function digSquare(Y, X) {
    let squareToUpdate = document.querySelector(`[data-position="${Y}_${X}"]`)

    if (matrix[Y][X].isFlagged == false) {
        matrix[Y][X].isRevealed = true;
        squaresInterractedWith++;

        if (matrix[Y][X].hasBomb) {
            squareToUpdate.innerHTML = '<img src="/icons/bomb.svg"></img>';
            squareToUpdate.classList.add('revealed');
            userDugBombPosition = `${Y}_${X}`;
            lostGame();
        } else {
            if (countBombs(Y, X) == 0) {
                emptySquare(Y, X);
            } else {
                squareToUpdate.innerHTML = countBombs(Y, X);
                squareToUpdate.classList.add(`B${countBombs(Y, X)}`);
            }
        }

        squareToUpdate.classList.add('revealed');
    } else {
        squaresInterractedWith = squaresInterractedWith - 1;
        bombsPlaced++;
        tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
        matrix[Y][X].isFlagged = false;
        squareToUpdate.innerHTML = '';
    }
}


function removeUserSquareInterractivity() {
    squares.forEach((square) => {
        square.replaceWith(square.cloneNode(true));
    })
}


function lostGame() {
    const endGameDesc = document.querySelector('.end-game-status');
    const startGameButton = document.querySelector('.start-game-button');
    let randomX = Math.ceil(Math.random() * 2);
    let randomY = Math.ceil(Math.random() * 2);
    const textContentWrapper = document.querySelector('.textContent');
    const gameControlPanel = document.querySelector('.gameSettings');
    let timesShakeExecuted = 0;
    let useNegativeShakeCoords = false;
    const smileyFace = document.querySelector('.dead-smiley-wrapper');
    const footerIconsContainer = document.querySelector('.footer-links-container');
    const socialsIcon = document.querySelector('.socials-icon-wrap');
    const flagIcon = document.querySelector('.flag-icon-wrap');

    footerIconsContainer.classList.toggle('hide-icons');
    socialsIcon.classList.toggle('show');
    flagIcon.classList.toggle('show');


    smileyFace.style.display = 'flex';

    autoplayRunning = true;
    autoplayGame();

    removeUserSquareInterractivity();

    if (screenWidth > 860) {
        setTimeout(() => {
            if (autoplayRunning) {
                informUserBombsPlacedText.fadeOut();
                setTimeout(() => { informUserBombsPlacedText.reset() }, 1500)
            }
        }, 4500);
    } else {
        informUserBombsPlacedText.reset()
    }
    

    if (screenWidth < 860) {
        let showSettingsButton = document.querySelector('.show-settings-panel-button');

        showSettingsButton.innerHTML = 'You-lost<br>Play-again?'
        textContentWrapper.style.display = 'flex';
        setTimeout(() => {
            textContentWrapper.style.opacity = '1';
        })
    } else {
        endGameDesc.innerHTML = "You've lost the game";
        startGameButton.innerHTML = 'Play-again';

        textContentWrapper.style.display = 'flex';
        gameControlPanel.style.display = 'flex';
        setTimeout(() => {
            textContentWrapper.style.opacity = '1';
            gameControlPanel.style.opacity = '1';
        }, 50)
    }
    
    

    setTimeout(() => {
        if (autoplayRunning) {
            let Y = userDugBombPosition.split('_')[0];
            let X = userDugBombPosition.split('_')[1];
            let squareToUpdate = document.querySelector(`[data-position="${Y}_${X}"]`)

            matrix[Y][X].isRevealed = false;
            matrix[Y][X].isFlagged = true;
            squareToUpdate.innerHTML = flagSvg;
            squareToUpdate.classList.remove('revealed');
            squaresInterractedWith++;
        }
    }, 5000)


    container.style.scale = "1.01";
    container.style.left = `${randomX}px`;
    container.style.top = `${randomY}px`;

    let intervalShakeGameBoard = setInterval(() => {
        if (timesShakeExecuted == 9) {
            clearInterval(intervalShakeGameBoard)
        }
        if (useNegativeShakeCoords) {
            useNegativeShakeCoords = false;
            container.style.left = `-${randomX}px`;
            container.style.top = `-${randomY}px`;
        } else {
            useNegativeShakeCoords = true;
            container.style.left = `${randomX}px`;
            container.style.top = `${randomY}px`;
        }
        timesShakeExecuted++;
    }, 30)
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

function winGame() {
    const gameStatusTextBox = document.querySelector('.end-game-status');
    const startGameButton = document.querySelector('.start-game-button');
    const headerTitleContentContainer = document.querySelector('.textContent');
    const gameControlPanel = document.querySelector('.gameSettings');
    const footerIconsContainer = document.querySelector('.footer-links-container');
    const socialsIcon = document.querySelector('.socials-icon-wrap');
    const flagIcon = document.querySelector('.flag-icon-wrap');

    footerIconsContainer.classList.toggle('hide-icons');
    socialsIcon.classList.toggle('show');
    flagIcon.classList.toggle('show');

    
    setTimeout(() => {
        populateBoard();
        autoplayGame();
        autoplayRunning = true;
    }, 30000)
    
    if (screenWidth > 860) {
        setTimeout(() => {
            if (autoplayRunning) {
                informUserBombsPlacedText.fadeOut();
                setTimeout(() => { informUserBombsPlacedText.reset() }, 1500)
            }
        }, 4500);
    } else {
        informUserBombsPlacedText.reset()
    }

    removeUserSquareInterractivity();

    if (screenWidth < 720) {
        let showSettingsButton = document.querySelector('.show-settings-panel-button');

        showSettingsButton.innerHTML = 'You-won<br>Play-again?'
        
        headerTitleContentContainer.style.display = 'flex';
        setTimeout(() => {
            headerTitleContentContainer.style.opacity = '1';
        }, 50)
    } else {
        gameStatusTextBox.innerHTML = "You've won!";
        startGameButton.innerHTML = 'Play-again';

        headerTitleContentContainer.style.display = 'flex';
        gameControlPanel.style.display = 'flex';
        setTimeout(() => {
            headerTitleContentContainer.style.opacity = '1';
            gameControlPanel.style.opacity = '1';
        }, 50)
    }
}

function watchIfUserStartedGame() {
    const watchUserInput = document.querySelector('.user-initiated-game-start');

    const mutationObserver = new MutationObserver(() => {
        if (watchUserInput.childElementCount != 0) {
            clearInterval(autoplayIntervalToDigSquare);
            autoplayRunning = false;
            startGame();
        } else {
            watchUserInput.innerHTML = '';
        }
    })

    mutationObserver.observe(watchUserInput, { childList: true });
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
    const textContentWrapper = document.querySelector('.textContent');
    const screenHeight = window.innerHeight - 64 - 58 + 'px';
    screenWidth = window.innerWidth;

    container.style.height = screenHeight;

    if (screenWidth < 1024) {
        let endGameStatus = document.querySelector('.end-game-status');
        endGameStatus.innerHTML = '';


        instructions.innerHTML = '// Click bottom right flag to switch to flagging or digging squares';
        
        if (isDesktopRes == undefined) {
            isDesktopRes = false;
        }


        if (isDesktopRes) {
            if (panelShownPriorWindowResize == 'textContent' && panelShownPriorWindowResize != undefined)  {
                gameSettings.style.opacity = '0';
                gameSettings.style.display = 'none';
                textContentWrapper.style.opacity = '1';
                textContentWrapper.style.display = 'flex';
            }
    
            if (panelShownPriorWindowResize == 'gameSettings' && panelShownPriorWindowResize != undefined) {
                gameSettings.style.opacity = '1';
                gameSettings.style.display = 'flex';
                textContentWrapper.style.opacity = '0';
                textContentWrapper.style.display = 'none';
            }

            isDesktopRes = false;
        }
    } else {
        instructions.innerHTML = '// Left click to dig square <br> // Right click to flag square'


        if (isDesktopRes == undefined) {
            isDesktopRes = true;
        }
        
        if (textContentWrapper.style.display == '') {
            textContentWrapper.style.display = 'flex';
        }

        if (isDesktopRes == false) {
            if (textContentWrapper.style.display == 'flex') {
                panelShownPriorWindowResize = 'textContent';
            } else {
                panelShownPriorWindowResize = 'gameSettings';
            }
    
            textContentWrapper.style.opacity = '1';
            textContentWrapper.style.display = 'flex';
            gameSettings.style.opacity = '1';
            gameSettings.style.display = 'flex';

            isDesktopRes = true;
        }
    }

    if (newColumnsToFit > columnsToFit) {
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
            let Y = square.dataset.position.split('_')[0];
            let X = square.dataset.position.split('_')[1];

            let oldBombsSurrounding = square.textContent;
            let oldBombsSurroundingClass = 'B' + oldBombsSurrounding;
            let bombsCurrentlyAround = countBombs(Y, X);
            
            
            square.innerHTML = bombsCurrentlyAround;
            square.classList.replace(oldBombsSurroundingClass, `B${bombsCurrentlyAround}`);
        })

        columnsToFit = newColumnsToFit;
        boardWidth = newBoardWidth;
    }

    if (newRowsToFit > rowsToFit) {
        for (let i = 0; i < deltaNewRowsOldRows; i++) {
            let matrixLastRowIndex = matrix.length - 1;

            matrix.push([]);
            container.insertAdjacentHTML('beforeEnd', '<div class="row"></div>');

            for (let j = 0; j < columnsToFit; j++) {
                generateSquare(container.lastChild, matrixLastRowIndex, j)
                
                container.lastChild.lastChild.addEventListener('click', (clickedSquare) => {
                    userLeftClick(clickedSquare);
                })
                
                container.lastChild.style.gridTemplateColumns = `repeat(${columnsToFit}, minmax(24px, 1fr))`;
            }

            container.lastChild.childNodes.forEach((square) => {
                square.addEventListener('contextmenu', (rightClickedSquare) => {
                    userRightClick(rightClickedSquare);
                })
            })
        }


        container.lastChild.previousSibling.childNodes.forEach((square) => {
            if (square.classList.contains('revealed') && square.textContent != '') {
                let Y = square.dataset.position.split('_')[0];
                let X = square.dataset.position.split('_')[1];

                let bombsCurrentlyAround = countBombs(Y, X);
                let bombsPreviouslySurrounding = square.textContent;
                let oldBombsSurroundingClass = 'B' + bombsPreviouslySurrounding;

                square.innerHTML = bombsCurrentlyAround;
                square.classList.replace(oldBombsSurroundingClass, `B${bombsCurrentlyAround}`);
            }
        })


        container.style.gridTemplateRows = `repeat(${newRowsToFit}, minmax(24px, 1fr))`;
        rowsToFit = newRowsToFit;
        boardHeight = newBoardHeight;
        rows = document.querySelectorAll('.row');
    }
    tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
})

screen.orientation.addEventListener('change', () => {
    let newWidth = container.offsetWidth;
    let newHeight = container.offsetHeight;
    let rowsVisible = Math.floor(newHeight / squareSize);
    let columnsVisible = Math.floor(newWidth / squareSize);
    let matrixLength = matrix.length;

    for (let i = 0; i < matrixLength; i++) {
        if (i < rowsVisible) {
            matrix[i].forEach((square, squareIndex) => {
                if (squareIndex < columnsVisible) {
                    let Y = square.position.split('_')[0];
                    let X = square.position.split('_')[1];
                    let squareToUpdate = document.querySelector(`[data-position="${Y}_${X}"]`);
    
                    square.isWithinViewport = true;
                    squareToUpdate.style.display = 'flex';
                } else {
                    let Y = square.position.split('_')[0];
                    let X = square.position.split('_')[1];
                    let squareToUpdate = document.querySelector(`[data-position="${Y}_${X}"]`);

                    square.isWithinViewport = false;
                }
            })
    
            rows[i].style.display = 'flex';
        } else {
            let outsideViewportRow = i;

            matrix[outsideViewportRow].forEach((square) => {
                square.isWithinViewport = false;
            })
        }
    }

    squaresInViewport = rowsVisible * columnsVisible;
    squaresInterractedWith = 0;

    matrix.forEach((row) => {
        row.forEach((square) => {
            if (square.isWithinViewport) {
                if (square.isFlagged || square.isRevealed) {
                    squaresInterractedWith++;
                }
            }
        })
    })
})

function isMobile() {
    var check = false;
    
    if (boardWidth < 720) {
        check = true;
    }
    
    if (check) {
        return 28
    } else {
        return 32
    }
};