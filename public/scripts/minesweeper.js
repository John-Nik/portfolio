const container = document.querySelector('#game');
let boardWidth = container.offsetWidth;
let boardHeight = container.offsetHeight;
let squareSize = isMobile(); // returns 24 or 32
let columnsToFit = Math.floor(boardWidth / squareSize);
let rowsToFit = Math.floor(boardHeight / squareSize);
let matrix = [];
let bombsPlaced = 0;
let difficulty = 0.2;
let squares;
let rows;
let squaresInBoard = 0;
let squaresInterractedWith = 0;
let squaresInViewport = 0;
let userPlayingGame = false;
let autoplayRunning = true;
let lastClickedBombPosition = '';
let interval;
let isBombsPlacedTextVisibleToUser = false;
const tellUserBombsPlacedContainer = document.querySelector('.bombs-placed-container');
const tellUserBombsPlacedWrapper = document.querySelector('.bombs-placed-container .wrapper');
const tellUserBombsPlaced = document.querySelector('.bombs-placed-text');
let userSelectedDifficulty = document.querySelector('.difficulty-feedback.active');
let flagSvg = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect x="0.666504" width="17" height="18" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_14_9231" transform="matrix(0.00827206 0 0 0.0078125 -0.0294118 0)"/></pattern><image id="image0_14_9231" width="128" height="128" xlink:href="data:image/png;base64,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"/></defs></svg>';




chooseDifficulty();

function chooseDifficulty() {
    let difficultyLevel = userSelectedDifficulty.dataset.difficulty;
    
    const difficultyVariables = [0.2, 0.25, 0.3, 0.4];

    difficulty = difficultyVariables[difficultyLevel];
}


container.addEventListener('contextmenu', (e) => {
    e.preventDefault();
})


populateBoard();
function populateBoard() {
    if (autoplayRunning) {
        matrix = [];
        container.innerHTML = '';
        squaresInBoard = 0;
        squaresInterractedWith = 0;
        bombsPlaced = 0;
    }

    container.style.gridTemplateRows = `repeat(${rowsToFit}, minmax(24px, 1fr))`;

    for (let i = 0; i < rowsToFit; i++) {
        matrix.push([]);
        container.insertAdjacentHTML('beforeEnd', '<div class="row"></div>')
    }

    rows = document.querySelectorAll('.row');
    rows.forEach((row, rowIndex) => {
        for (let i = 0; i < columnsToFit; i++) {
            let squareHasBomb = false;
            
            if (autoplayRunning) {
                difficulty = 0.3;
            }

            if (Math.random() < difficulty) {
                bombsPlaced++;
                squareHasBomb = true;
            }


            matrix[rowIndex].push({
                isRevealed: false,
                hasBomb: squareHasBomb,
                isFlagged: false,
                position: `${rowIndex}_${i}`,
                isWithinViewport: true
            })
            squaresInBoard++;
            squaresInViewport++;
            row.insertAdjacentHTML('beforeEnd', `<div class="square" data-position="${rowIndex}_${i}"></div>`)
        }

        row.style.gridTemplateColumns = `repeat(${columnsToFit}, minmax(24px, 1fr))`
        row.style.width = `100%`;
    })

    squares = document.querySelectorAll('.square');
}








watchUserInitiatedGameStatus();
autoplayGame();



function autoplayGame() {
    autoplayRunning = true;
    let reducedMatrix = matrix.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue);
    })

    unrevealedSquares();
    function unrevealedSquares() {
        let unrevealed_squares = reducedMatrix.filter((square) => !square.isRevealed);

        randomlySelectSquare();
        function randomlySelectSquare() {
            if (unrevealed_squares.length == 0) {
                clearInterval(interval);
                populateBoard();
                autoplayGame();
            } else {
                let randomGeneratedNumber = Math.floor(Math.random() * unrevealed_squares.length);
                let position = unrevealed_squares[randomGeneratedNumber].position;
                let Y = position.split('_')[0];
                let X = position.split('_')[1];

                if (unrevealed_squares[randomGeneratedNumber].isFlagged) {
                    randomlySelectSquare();
                    return;
                }

                if (unrevealed_squares[randomGeneratedNumber].hasBomb) {
                    matrix[Y][X].isRevealed = true;
                    matrix[Y][X].isFlagged = true;
                    let squareToUpdate = document.querySelector(`[data-position="${Y}_${X}"]`);
                    squareToUpdate.innerHTML = flagSvg;
                    return;
                }

                digSquare(Y, X);
            }
            console.count()
        }
    }
    interval = setInterval(unrevealedSquares, 1500);
}

function handleInformUserAboutBombsPlaced(fn) {
    switch (fn) {
        case 'reset':
            resetFn();
            break;
        case 'fadeIn':
            fadeInCenterFn();
            break;
        case 'fadeOut':
            fadeOutFn();
            break;
        case 'moveDownRightCorner':
            moveDownRightCornerFn();
            break;
    }

    function resetFn() {
        tellUserBombsPlacedContainer.style.display = 'none';
        tellUserBombsPlacedWrapper.style.left = '0px';
        tellUserBombsPlacedWrapper.style.top = '0px';
        tellUserBombsPlacedWrapper.style.fontSize = '3rem';
        tellUserBombsPlacedContainer.style.opacity = '0';
    }

    function fadeInCenterFn() {
        tellUserBombsPlacedContainer.style.display = 'flex';
        tellUserBombsPlacedContainer.style.opacity = '1';
        isBombsPlacedTextVisibleToUser = true;
    }

    function fadeOutFn() {
        setTimeout(() => {
            tellUserBombsPlacedContainer.style.opacity = '0';
            isBombsPlacedTextVisibleToUser = false;
            setTimeout(resetFn, 1000)
        }, 4500)
    }

    function moveDownRightCornerFn() {
        setTimeout(() => {
            tellUserBombsPlacedWrapper.style.left = '44%';
            tellUserBombsPlacedWrapper.style.top = '53.5%';
            tellUserBombsPlacedWrapper.style.fontSize = '1rem';
        }, 1000)

        setTimeout(() => {
            tellUserBombsPlacedContainer.style.opacity = '0.7';
        }, 1500)
    }
}

function startGame() {
    populateBoard();
    userPlayingGame = true;

    if (isBombsPlacedTextVisibleToUser) {
        handleInformUserAboutBombsPlaced('reset');
        handleInformUserAboutBombsPlaced('fadeIn');

        setTimeout(() => {
            handleInformUserAboutBombsPlaced('moveDownRightCorner');
        }, 2500);
        
        setTimeout(() => {
            tellUserBombsPlaced.textContent = '//'

            setTimeout(() => {
                tellUserBombsPlaced.textContent = `// ${bombsPlaced}`;
            }, 750)
        }, 2000)
    } else {
        handleInformUserAboutBombsPlaced('fadeIn');
        setTimeout(handleInformUserAboutBombsPlaced('moveDownRightCorner'), 5000);
        tellUserBombsPlaced.textContent = `// ${bombsPlaced}`;
    }  


    setTimeout(() => {
        squares.forEach((square) => {
            square.addEventListener('click', (clickedSquare) => {
                if (!clickedSquare.currentTarget.classList.contains('revealed')) {
                    let Y = clickedSquare.currentTarget.dataset.position.split('_')[0];
                    let X = clickedSquare.currentTarget.dataset.position.split('_')[1];
        
                    digSquare(Y, X);
                    isGameFinished();
                }
            })
            
            square.addEventListener('contextmenu', (rightClickedSquare) => {
                rightClickedSquare.preventDefault();
                let Y = rightClickedSquare.currentTarget.dataset.position.split('_')[0];
                let X = rightClickedSquare.currentTarget.dataset.position.split('_')[1];
                isGameFinished();
                
                if (rightClickedSquare.currentTarget.classList.contains('revealed') == false) {
                    if (matrix[Y][X].isFlagged == false) {
                        bombsPlaced = bombsPlaced - 1;
                        squaresInterractedWith++;
                        rightClickedSquare.currentTarget.innerHTML = flagSvg;
                        matrix[Y][X].isFlagged = true;
                        tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
                    } else {
                        bombsPlaced++;
                        tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
                        squaresInterractedWith = squaresInterractedWith - 1;
                        matrix[Y][X].isFlagged = false;
                        rightClickedSquare.currentTarget.innerHTML = '';
                    }
                }
            })
        })
    }, 1500)    
}


function digSquare(Y, X) {
    let squareToUpdate = document.querySelector(`[data-position="${Y}_${X}"]`)
    if (matrix[Y][X].isFlagged == false) {
        squaresInterractedWith++;
        tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
        matrix[Y][X].isRevealed = true;

        if (matrix[Y][X].hasBomb) {
            squareToUpdate.innerHTML = '<img src="/icons/bomb.svg"></img>';
            squareToUpdate.classList.add('revealed');
            lastClickedBombPosition = `${Y}_${X}`;
            // lostGame();
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


    smileyFace.style.display = 'flex';

    autoplayRunning = true;
    userPlayingGame = false;
    autoplayGame();

    removeUserSquareInterractivity();

    endGameDesc.innerHTML = "You've lost the game";
    startGameButton.innerHTML = 'Play-again';

    setTimeout(() => {
        if (userPlayingGame == false) {
            handleInformUserAboutBombsPlaced('fadeOut');
        }
    }, 4500);

    
    textContentWrapper.style.display = 'flex';
    gameControlPanel.style.display = 'flex';
    setTimeout(() => {
        textContentWrapper.style.opacity = '1';
        gameControlPanel.style.opacity = '1';
    }, 50)

    setTimeout(() => {
        let Y = lastClickedBombPosition.split('_')[0];
        let X = lastClickedBombPosition.split('_')[1];
        let squareToUpdate = document.querySelector(`[data-position="${Y}_${X}"]`)

        matrix[Y][X].isRevealed = false;
        matrix[Y][X].isFlagged = true;
        squareToUpdate.innerHTML = flagSvg;
        squareToUpdate.classList.remove('revealed');
        squaresInterractedWith++;
    }, 5000)


    container.style.scale = "1.01";
    container.style.left = `${randomX}px`;
    container.style.top = `${randomY}px`;

    let intervalShakeGameBoard = setInterval(() => {
        if (timesShakeExecuted > 9) {
            clearInterval(intervalShakeGameBoard)
        }
        console.count();
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
    let squareToUpdate = document.querySelector(`[data-position="${Y}_${X}"]`)


    surroundingSquares.forEach((square) => {
        if (square.info.hasBomb) {
            bombsCounted++;
        }
    })

    return bombsCounted;
}

function checkSurroundingSquares(Y, X) {
    let surroundingSquares = [];


    for (let i = -1; i < 2; i++) {
        if (matrix[Number(Y) + Number(i)] != undefined) {
            for (let j = -1; j < 2; j++) {
                if (matrix[Number(Y) + Number(i)][Number(X) + Number(j)] != undefined) {
                    if (Number(Y) + Number(i) != Y || Number(X) + Number(j) != X) {
                        surroundingSquares.push({
                            info: matrix[Number(Y) + Number(i)][Number(X) + Number(j)],
                            position: `${Number(Y) + Number(i)}_${Number(X) + Number(j)}`
                        })
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
        if (autoplayRunning && !userPlayingGame) {
            populateBoard();
        } else {
            winGame();
        }
    }
}

function winGame() {
    const endGameDesc = document.querySelector('.end-game-status');
    const startGameButton = document.querySelector('.start-game-button');
    const textContentWrapper = document.querySelector('.textContent');
    const gameControlPanel = document.querySelector('.gameSettings');

    autoplayRunning = true;
    userPlayingGame = false;

    setTimeout(() => {
        populateBoard();
        autoplayGame();
    }, 30000)
    
    setTimeout(() => {
        handleInformUserAboutBombsPlaced('fadeOut');
    }, 5000)

    removeUserSquareInterractivity();

    endGameDesc.innerHTML = "You've won!";
    startGameButton.innerHTML = 'Play-again';

    
    textContentWrapper.style.display = 'flex';
    gameControlPanel.style.display = 'flex';
    setTimeout(() => {
        textContentWrapper.style.opacity = '1';
        gameControlPanel.style.opacity = '1';
    }, 50)
}

function watchUserInitiatedGameStatus() {
    const watchUserInput = document.querySelector('.user-initiated-game-start');

    const mutationObserver = new MutationObserver(() => {
        if (watchUserInput.childElementCount != 0) {
            userPlayingGame = true;
            clearInterval(interval);
            startGame();
        } else {
            watchUserInput.innerHTML = '';
        }
    })

    mutationObserver.observe(watchUserInput, { childList: true });
}



window.addEventListener('resize', () => {
    let newBoardWidth = container.offsetWidth;
    let newBoardHeight = container.offsetHeight;
    let newColumnsToFit = Math.floor(newBoardWidth / squareSize);
    let newRowsToFit = Math.floor(newBoardHeight / squareSize);
    let DxColumns = newColumnsToFit - columnsToFit;
    let DyRows = newRowsToFit - rowsToFit;

    if (newColumnsToFit > columnsToFit) {
        let oldColumns = [];

        rows.forEach((row) => {
            if (row.lastChild.classList.contains('revealed') && row.lastChild.textContent != '') {
                oldColumns.push(row.lastChild)
            }
        })

        

        for (let i = 0; i < DxColumns; i++) {
            newBoardWidth = container.offsetWidth;
            newColumnsToFit = Math.floor(newBoardWidth / squareSize);
            DxColumns = newColumnsToFit - columnsToFit;

            rows.forEach((row, rowIndex) => {
                let rowLength = matrix[rowIndex].length;
                    let squareHasBomb = false;
                    
                    if (autoplayRunning) {
                        difficulty = 0.3;
                    }
        
                    if (Math.random() < difficulty) {
                        bombsPlaced++;
                        squareHasBomb = true;
                    }
                    
                    matrix[rowIndex].push({
                        isRevealed: false,
                        hasBomb: squareHasBomb,
                        isFlagged: false,
                        isWithinViewport: true,
                        position: `${rowIndex}_${rowLength}`
                    })

                    squaresInBoard++;
                    squaresInViewport++;
                    row.insertAdjacentHTML('beforeEnd', `<div class="square" data-position="${rowIndex}_${rowLength}"></div>`)

                    row.lastChild.addEventListener('click', (clickedSquare) => {
                        if (!clickedSquare.currentTarget.classList.contains('revealed')) {
                            let Y = clickedSquare.currentTarget.dataset.position.split('_')[0];
                            let X = clickedSquare.currentTarget.dataset.position.split('_')[1];
                
                            digSquare(Y, X);
                            isGameFinished();
                        }
                    })

                    row.lastChild.addEventListener('contextmenu', (rightClickedSquare) => {
                        rightClickedSquare.preventDefault();
                        let Y = rightClickedSquare.currentTarget.dataset.position.split('_')[0];
                        let X = rightClickedSquare.currentTarget.dataset.position.split('_')[1];
                        isGameFinished();
                        
                        if (rightClickedSquare.currentTarget.classList.contains('revealed') == false) {
                            if (matrix[Y][X].isFlagged == false) {
                                bombsPlaced = bombsPlaced - 1;
                                squaresInterractedWith++;
                                rightClickedSquare.currentTarget.innerHTML = flagSvg;
                                matrix[Y][X].isFlagged = true;
                                tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
                            } else {
                                bombsPlaced++;
                                tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
                                squaresInterractedWith = squaresInterractedWith - 1;
                                matrix[Y][X].isFlagged = false;
                                rightClickedSquare.currentTarget.innerHTML = '';
                            }
                        }
                    })


                row.style.gridTemplateColumns = `repeat(${newColumnsToFit}, minmax(24px, 1fr))`
                row.style.width = `100%`;    
            })
        }

        oldColumns.forEach((square) => {
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
        for (let i = 0; i < DyRows; i++) {
            newBoardHeight = container.offsetHeight;
            newRowsToFit = Math.floor(newBoardHeight / squareSize);
            DyRows = newRowsToFit - rowsToFit;

            matrix.push([]);
            container.insertAdjacentHTML('beforeEnd', '<div class="row"></div>');
            let matrixLastRow = matrix.length - 1;

            for (let j = 0; j < columnsToFit; j++) {
                let squareHasBomb = false;

                if (autoplayRunning) {
                    difficulty = 0.3;
                }

                if (Math.random() < difficulty) {
                    bombsPlaced++;
                    squareHasBomb = true;
                }

                matrix[matrixLastRow].push({
                    isRevealed: false,
                    hasBomb: squareHasBomb,
                    isFlagged: false,
                    isWithinViewport: true,
                    position: `${matrixLastRow}_${j}`
                })

                squaresInBoard++;
                squaresInViewport++;
                container.lastChild.insertAdjacentHTML('beforeEnd', `<div class="square" data-position="${matrixLastRow}_${j}"></div>`);
                container.lastChild.lastChild.addEventListener('click', (clickedSquare) => {
                    if (!clickedSquare.currentTarget.classList.contains('revealed')) {
                        let Y = clickedSquare.currentTarget.dataset.position.split('_')[0];
                        let X = clickedSquare.currentTarget.dataset.position.split('_')[1];
            
                        digSquare(Y, X);
                        isGameFinished();
                    }
                })
                
                
                container.lastChild.style.gridTemplateColumns = `repeat(${columnsToFit}, minmax(24px, 1fr))`;
                container.lastChild.style.width = `100%`;
            }
            
            container.lastChild.lastChild.addEventListener('contextmenu', (rightClickedSquare) => {
                rightClickedSquare.preventDefault();
                let Y = rightClickedSquare.currentTarget.dataset.position.split('_')[0];
                let X = rightClickedSquare.currentTarget.dataset.position.split('_')[1];
                isGameFinished();
                
                if (rightClickedSquare.currentTarget.classList.contains('revealed') == false) {
                    if (matrix[Y][X].isFlagged == false) {
                        bombsPlaced = bombsPlaced - 1;
                        squaresInterractedWith++;
                        rightClickedSquare.currentTarget.innerHTML = flagSvg;
                        matrix[Y][X].isFlagged = true;
                        tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
                    } else {
                        bombsPlaced++;
                        tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
                        squaresInterractedWith = squaresInterractedWith - 1;
                        matrix[Y][X].isFlagged = false;
                        rightClickedSquare.currentTarget.innerHTML = '';
                    }
                }
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

screen.orientation.addEventListener('change', (event) => {
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
                    squareToUpdate.style.display = 'none';
                }
            })
    
            rows[i].style.display = 'flex';
        } else {
            let outsideViewportRow = i;

            matrix[outsideViewportRow].forEach((square) => {
                square.isWithinViewport = false;
            })

            rows[outsideViewportRow].style.display = 'none';
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
    (function(a){
      if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) 
        check = true;
    })(navigator.userAgent||navigator.vendor||window.opera);
    
    if (check) {
        return 24
    } else {
        return 32
    }
  };