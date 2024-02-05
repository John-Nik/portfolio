const container = document.querySelector('#game');
let containerWidth = container.offsetWidth;
let containerHeight = container.offsetHeight;
let columnsToFit = Math.floor(containerWidth / 32);
let rowsToFit = Math.floor(containerHeight / 32);
let matrix = [];
let bombsPlaced = 0;
let difficulty = 0.2;
let squares;
let squaresInBoard = 0;
let squaresInterractedWith = 0;
let userPlayingGame = false;
let autoplayRunning = true;
let lastClickedBombPosition = '';
let interval;
let isBombsPlacedTextVisibleToUser = false;
let flagSvg = '<img src="/icons/flag.svg"></img>';
const tellUserBombsPlacedContainer = document.querySelector('.bombs-placed-container');
const tellUserBombsPlacedWrapper = document.querySelector('.bombs-placed-container .wrapper');
const tellUserBombsPlaced = document.querySelector('.bombs-placed-text');
let userSelectedDifficulty = document.querySelector('.difficulty-feedback.active');




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

    container.style.gridTemplateRows = `repeat(${rowsToFit}, 1fr)`;
    for (let i = 0; i < rowsToFit; i++) {
        matrix.push([]);
        container.insertAdjacentHTML('beforeEnd', '<div class="row"></div>')
    }

    let rows = document.querySelectorAll('.row');
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
                isWithinViewport: true,
                position: `${rowIndex}_${i}`
            })
            squaresInBoard++;
            row.insertAdjacentHTML('beforeEnd', `<div class="square" data-position="${rowIndex}_${i}"></div>`)
        }

        row.style.gridTemplateColumns = `repeat(${columnsToFit}, 1fr)`
        row.style.width = `${containerWidth}px`;
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

            if (unrevealed_squares.length == 0) {
                populateBoard();
            }
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
            fadeOutAfterLossFn();
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

    function fadeOutAfterLossFn() {
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
    if (squaresInBoard === squaresInterractedWith) {
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
        handleInformUserAboutBombsPlaced('reset');
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