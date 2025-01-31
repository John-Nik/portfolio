let containerHomepage = document.querySelector('#game') as HTMLDivElement;
let boardWidth = containerHomepage.offsetWidth;
let boardHeight = containerHomepage.offsetHeight;
let screenWidth = window.innerWidth;
let squareSize = 32;
let columnsToFit = Math.floor(boardWidth / squareSize);
let rowsToFit = Math.floor(boardHeight / squareSize);
let matrix: Square[][] = [];
let bombsPlaced = 0;
let difficulty: number;
let squares: NodeList;
let rows: NodeList;
let squaresInBoard = 0;
let squaresInterractedWith = 0;
let squaresInViewport = 0;
let autoplayRunning = true;
let userDugBombPosition = '';
let autoplayIntervalToDigSquare;
let isBombsPlacedTextVisibleToUser = false;
let tellUserBombsPlacedContainer: HTMLDivElement = document.querySelector('.bombs-placed-container');
let tellUserBombsPlacedWrapper: HTMLDivElement = document.querySelector('.bombs-placed-container .wrapper');
let tellUserBombsPlaced = document.querySelector('.bombs-placed-text');
let instructions = document.querySelector('.game-instructions-span');
let windowWidth = window.innerWidth;
let flagSvg = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect x="0.666504" width="17" height="18" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_14_9231" transform="matrix(0.00827206 0 0 0.0078125 -0.0294118 0)"/></pattern><image id="image0_14_9231" width="128" height="128" xlink:href="data:image/png;base64,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"/></defs></svg>';
let mobileUserWantsToFlag = 0;
let triggerTapFlagIcon = document.querySelector('.flag-icon-wrap');
let gameSettings: HTMLDivElement = document.querySelector('.gameSettings');
containerHomepage.addEventListener('contextmenu', (e) => e.preventDefault());


triggerTapFlagIcon.addEventListener('click', () => {
    mobileUserWantsToFlag = (mobileUserWantsToFlag + 1) % 2;
})


class Square {
    public isRevealed: boolean;
    public hasBomb: boolean;
    public isFlagged: boolean;
    public position: number[];

    constructor(position: number[]) {
        this.isRevealed = false;
        this.hasBomb = false;
        this.isFlagged = false;
        this.position = position;

        if (Math.random() < difficulty) {
            bombsPlaced++;
            this.hasBomb = true;
        }

        squaresInBoard++;
    }

    digSquare() {
        if (this.isRevealed) {
            return;
            const surroundingSquares = this.getSurroundingSquares();
            surroundingSquares.forEach((square) => square.simpleDig());
        };

        if (mobileUserWantsToFlag) {
            this.flagSquare();
            isGameFinished();
            return;
        }
        

        
        let [Y, X] = this.position;
        let htmlSquare = getHtmlSquare(Y, X)
        if (this.isFlagged == false) {
            this.isRevealed = true;
            squaresInterractedWith++;
    
            if (this.hasBomb) {
                htmlSquare.classList.add('revealed');
                htmlSquare.innerHTML = '<image src="/icons/bomb.svg" alt="">';
                
                setTimeout(() => {
                    this.isRevealed = false;
                    this.isFlagged = true;
                    htmlSquare.innerHTML = flagSvg;
                    htmlSquare.classList.remove('revealed');
                }, 5000)
                lostGame();
            } else {
                let countedBombs = this.countSurroundingBombs();

                if (countedBombs == 0) {
                    let surroundingSquares = this.getSurroundingSquares();

                    surroundingSquares.forEach((square) => square.digSquare())
                } else {
                    htmlSquare.innerHTML = String(countedBombs);
                    htmlSquare.classList.add(`B${countedBombs}`);
                }
            }
    
            htmlSquare.classList.add('revealed');
        } else {
            squaresInterractedWith = squaresInterractedWith - 1;
            bombsPlaced++;
            tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
            this.isFlagged = false;
            htmlSquare.innerHTML = '';
        }
    }

    simpleDig() {
        if (this.isFlagged) return;
        if (this.isRevealed) return;

        const [Y, X] = this.position;
        const htmlSquare = getHtmlSquare(Y, X)
        const countedBombs = this.countSurroundingBombs();

        if (this.hasBomb) {
            htmlSquare.classList.add('revealed');
            htmlSquare.innerHTML = '<image src="/icons/bomb.svg" alt="">';
            lostGame();
            
            setTimeout(() => {
                this.isRevealed = false;
                this.isFlagged = true;
                htmlSquare.innerHTML = flagSvg;
                htmlSquare.classList.remove('revealed');
            }, 5000)
        }
        
        if (countedBombs == 0) {
            const surroundingSquares = this.getSurroundingSquares();
            surroundingSquares.forEach((square) => square.digSquare())
        } else {
            htmlSquare.innerHTML = String(countedBombs);
            htmlSquare.classList.add(`B${countedBombs}`);
        }

        squaresInterractedWith = squaresInterractedWith - 1;
        bombsPlaced++;
        tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
        this.isFlagged = false;
        htmlSquare.innerHTML = '';
    }

    flagSquare() {
        let [Y, X] = this.position;
        let htmlSquare = getHtmlSquare(Y, X);
        
        if (htmlSquare.classList.contains('revealed') == false) {
            if (this.isFlagged) {
    
                this.isFlagged = false;
                squaresInterractedWith = squaresInterractedWith - 1;
                bombsPlaced++;
                htmlSquare.innerHTML = '';
                tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
            } else {
    
                this.isFlagged = true;
                squaresInterractedWith++;
                bombsPlaced = bombsPlaced - 1;
                htmlSquare.innerHTML = flagSvg;
                tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
            }
        }

        isGameFinished();
    }

    countSurroundingBombs() {
        let bombsCounted = 0;
        let surroundingSquares = this.getSurroundingSquares();
    
        surroundingSquares.forEach((square) => {
            if (square.hasBomb) bombsCounted++;
        })
    
        return bombsCounted;
    }

    getSurroundingSquares(): Square[] {
        let surroundingSquares = [];
        let [Y, X] = this.position;

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
}


chooseDifficulty();
adaptGameUserInstructionsToWidth(boardWidth);
populateBoard();
watchIfUserStartedGame();
autoplayGame();





function chooseDifficulty() {
    let selectedHtmlDifficulty = document.querySelector('.difficulty-feedback.active') as HTMLSpanElement;
    let difficultyLevel = selectedHtmlDifficulty.dataset.difficulty;

    const difficultyVariables = [0.12, 0.15, 0.20, 0.25];
    
    difficulty = difficultyVariables[difficultyLevel];
}


function adaptGameUserInstructionsToWidth(width = 0) {
    if (width < 1024) {
        instructions.innerHTML = '// Click bottom right flag to switch to flagging or digging squares';
    } else {
        instructions.innerHTML = '// Left click to dig square <br> // Right click to flag square'
    }
}



function populateBoard() {
    
    // reset everything
    matrix = [];
    containerHomepage.innerHTML = '';
    squaresInBoard = 0;
    squaresInterractedWith = 0;
    bombsPlaced = 0;

    if (autoplayRunning) {
        difficulty = 0.2;
    } else {
        chooseDifficulty();
    }

    containerHomepage.style.gridTemplateRows = `repeat(${rowsToFit}, minmax(24px, 1fr))`;
    let gameGrid = new DocumentFragment();

    for (let i = 0; i < rowsToFit; i++) {
        matrix.push([]);
        
        const row = document.createElement('div');
        row.classList.add('row');
        row.style.gridTemplateColumns = `repeat(${columnsToFit}, minmax(24px, 1fr))`

        for (let j = 0; j < columnsToFit; j++) {
            matrix[i].push(new Square([i, j]));

            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.position = `${i}_${j}`;
            row.appendChild(square);
        }

        gameGrid.appendChild(row);
    }

    containerHomepage.appendChild(gameGrid);
    rows = document.querySelectorAll('.row');
    squares = document.querySelectorAll('.square');
}



function getHtmlSquare(Y: number, X: number) {
    return containerHomepage.childNodes[Y].childNodes[X] as HTMLDivElement;
}



function autoplayGame() {
    let condensedMatrix: Square[] = matrix.reduce((accumulator, currentValue) => {
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
            let randomSelectedSquare = condensedMatrix[randomGeneratedNumber];
            let [Y, X] = randomSelectedSquare.position;
            
            if (randomSelectedSquare.hasBomb) {
                randomSelectedSquare.isFlagged = true;
                getHtmlSquare(Y, X).innerHTML = flagSvg;
                condensedMatrix.splice(randomGeneratedNumber, 1);
                return;
            }

            randomSelectedSquare.digSquare();
            condensedMatrix.splice(randomGeneratedNumber, 1);
            if (randomSelectedSquare.countSurroundingBombs() == 0) {
                condensedMatrix = condensedMatrix.filter((square) => { if (!square.isRevealed && !square.isFlagged) {return square} });
            }
        }
    }

    autoplayIntervalToDigSquare = setInterval(randomlySelectSquare, 1500);
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
        containerHomepage.addEventListener('click', userLeftClick);
        containerHomepage.addEventListener('contextmenu', userRightClick);
    }, 1500)    
}


function userLeftClick(clickEvent: PointerEvent) {
    let clickedSquare = clickEvent.target as HTMLDivElement;
    let [Y, X] = clickedSquare.dataset.position.split('_');

    matrix[Y][X].digSquare();
}


function userRightClick(rightClickEvent: PointerEvent) {
    rightClickEvent.preventDefault();
    let rightClickedSquare = rightClickEvent.target as HTMLDivElement;
    let [Y, X] = rightClickedSquare.dataset.position.split('_');
    
    matrix[Y][X].flagSquare();
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


function lostGame() {
    const endGameDesc = document.querySelector('.end-game-status');
    const startGameButton = document.querySelector('.start-game-button');
    let randomX = Math.ceil(Math.random() * 2);
    let randomY = Math.ceil(Math.random() * 2);
    const textContentWrapper: HTMLDivElement = document.querySelector('.textContent');
    const gameControlPanel: HTMLDivElement = document.querySelector('.gameSettings');
    let timesShakeExecuted = 0;
    let useNegativeShakeCoords = false;
    const smileyFace: HTMLImageElement = document.querySelector('.dead-smiley-wrapper');
    const footerIconsContainer = document.querySelector('.footer-links-container');
    const socialsIcon = document.querySelector('.socials-icon-wrap');
    const flagIcon = document.querySelector('.flag-icon-wrap');

    footerIconsContainer.classList.toggle('hide-icons');
    socialsIcon.classList.toggle('show');
    flagIcon.classList.toggle('show');


    smileyFace.style.display = 'flex';

    autoplayRunning = true;
    autoplayGame();

    containerHomepage.removeEventListener('click', userLeftClick);
    containerHomepage.removeEventListener('contextmenu', userRightClick);

    if (screenWidth >= 1023) {
        setTimeout(() => {
            if (autoplayRunning) {
                informUserBombsPlacedText.fadeOut();
                setTimeout(() => { informUserBombsPlacedText.reset() }, 1500)
            }
        }, 4500);
    } else {
        informUserBombsPlacedText.reset()
    }
    

    if (screenWidth <= 1023) {
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
            let Y = Number(userDugBombPosition.split('_')[0]);
            let X = Number(userDugBombPosition.split('_')[1]);

            matrix[Y][X].isRevealed = false;
            matrix[Y][X].isFlagged = true;
            getHtmlSquare(Y, X).innerHTML = flagSvg;
            getHtmlSquare(Y, X).classList.remove('revealed');
            squaresInterractedWith++;
        }
    }, 5000)


    containerHomepage.style.scale = "1.01";
    containerHomepage.style.left = `${randomX}px`;
    containerHomepage.style.top = `${randomY}px`;

    let intervalShakeGameBoard = setInterval(() => {
        if (timesShakeExecuted == 9) {
            clearInterval(intervalShakeGameBoard)
        }
        if (useNegativeShakeCoords) {
            useNegativeShakeCoords = false;
            containerHomepage.style.left = `-${randomX}px`;
            containerHomepage.style.top = `-${randomY}px`;
        } else {
            useNegativeShakeCoords = true;
            containerHomepage.style.left = `${randomX}px`;
            containerHomepage.style.top = `${randomY}px`;
        }
        timesShakeExecuted++;
    }, 30)
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
    const headerTitleContentContainer: HTMLDivElement = document.querySelector('.textContent');
    const gameControlPanel: HTMLDivElement = document.querySelector('.gameSettings');
    const footerIconsContainer = document.querySelector('.footer-links-containerHomepage');
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

    containerHomepage.removeEventListener('click', userLeftClick);
    containerHomepage.removeEventListener('contextmenu', userRightClick);

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


let panelShownPriorWindowResize: 'textContent' | 'gameSettings';
let isDesktopRes: boolean;
function storeLastMobilePanelState(screenWidth: number) {
    const textContentWrapper: HTMLDivElement = document.querySelector('.textContent');

    if (screenWidth < 1024) {
        let endGameStatus = document.querySelector('.end-game-status');
        endGameStatus.innerHTML = '';
        
        if (isDesktopRes == undefined) 
            isDesktopRes = false;

        if (isDesktopRes) {
            if (!autoplayRunning) return;

            if (panelShownPriorWindowResize == 'textContent')  {
                gameSettings.style.opacity = '0';
                gameSettings.style.display = 'none';
                textContentWrapper.style.opacity = '1';
                textContentWrapper.style.display = 'flex';
            }
    
            if (panelShownPriorWindowResize == 'gameSettings') {
                gameSettings.style.opacity = '1';
                gameSettings.style.display = 'flex';
                textContentWrapper.style.opacity = '0';
                textContentWrapper.style.display = 'none';
            }

            isDesktopRes = false;
        }
    } else {
        if (isDesktopRes == undefined) 
            isDesktopRes = true;
        
        if (textContentWrapper.style.display == '') 
            textContentWrapper.style.display = 'flex';

        if (isDesktopRes == false) {
            if (!autoplayRunning) return;

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
}




window.addEventListener('resize', () => {
    let newBoardWidth = containerHomepage.offsetWidth;
    let newBoardHeight = containerHomepage.offsetHeight;
    let newColumnsToFit = Math.floor(newBoardWidth / squareSize);
    let newRowsToFit = Math.floor(newBoardHeight / squareSize);
    let deltaNewColumnsOldColumns = newColumnsToFit - columnsToFit;
    let deltaNewRowsOldRows = newRowsToFit - rowsToFit;
    screenWidth = window.innerWidth;

    adaptGameUserInstructionsToWidth(screenWidth);

    storeLastMobilePanelState(screenWidth);

    if (newColumnsToFit > columnsToFit) 
        adjustColumnsLayout();

    
    if (newRowsToFit > rowsToFit) 
        adjustRowsLayout();


    function adjustRowsLayout() {
        clearInterval(autoplayIntervalToDigSquare);
        let gameGrid = new DocumentFragment();

        for (let i = 0; i < deltaNewRowsOldRows; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            row.style.gridTemplateColumns = `repeat(${columnsToFit}, minmax(24px, 1fr))`;

            matrix.push([]);


            for (let j = 0; j < columnsToFit; j++) {
                matrix[matrix.length - 1].push(new Square([matrix.length - 1, j]));

                const square = document.createElement('square');
                square.classList.add('square');
                square.dataset.position = `${matrix.length -1}_${j}`; 
                row.appendChild(square);

            }
            
            gameGrid.append(row);
        }


        containerHomepage.lastChild.previousSibling.childNodes.forEach((square: HTMLDivElement) => {
            if (square.classList.contains('revealed') && square.textContent != '') {
                updateOldSiblingSquaresNearNewlyAddedSquares(square);
            }
        })

        containerHomepage.style.gridTemplateRows = `repeat(${newRowsToFit}, minmax(24px, 1fr))`;
        rowsToFit = newRowsToFit;
        boardHeight = newBoardHeight;
        rows = document.querySelectorAll('.row');
        tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
        if (autoplayRunning) autoplayGame();
    }


    function adjustColumnsLayout() {
        clearInterval(autoplayIntervalToDigSquare);

        let lastColumnSquares = [];

        rows.forEach((row: HTMLDivElement, rowIndex: number) => {
            let lastSquare = row.lastChild as HTMLDivElement;
            if (lastSquare.classList.contains('revealed')) lastColumnSquares.push(row.lastChild);

            let rowLength = matrix[rowIndex].length;
            for (let i = 0; i < deltaNewColumnsOldColumns; i++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.dataset.position = `${rowIndex}_${rowLength + i}`;

                matrix[rowIndex].push(new Square([rowIndex, rowLength + i]));
                row.appendChild(square);
            }
            
            row.style.gridTemplateColumns = `repeat(${newColumnsToFit}, minmax(24px, 1fr))`  
        })

        lastColumnSquares.forEach((square) => {
            updateOldSiblingSquaresNearNewlyAddedSquares(square);
        })

        columnsToFit = newColumnsToFit;
        boardWidth = newBoardWidth;
        squares = document.querySelectorAll('.square');
        tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
        if (autoplayRunning) autoplayGame();
    }
})

function updateOldSiblingSquaresNearNewlyAddedSquares(square: HTMLDivElement) {
    let [Y, X] = square.dataset.position.split('_');
    let oldBombsSurrounding: string = square.textContent;
    let oldBombsSurroundingClass = 'B' + oldBombsSurrounding;
    let bombsCurrentlyAround = matrix[Y][X].countSurroundingBombs();

    if (oldBombsSurrounding == '') {
        if (bombsCurrentlyAround === 0) return;

        square.innerHTML = bombsCurrentlyAround;
        square.classList.add(`B${bombsCurrentlyAround}`);
        return;
    }

    
    square.innerHTML = bombsCurrentlyAround;
    square.classList.replace(oldBombsSurroundingClass, `B${bombsCurrentlyAround}`);
}

watchIfUserSwitchesPage();
function watchIfUserSwitchesPage() {
    const watchUserInput = document.querySelector('.is-minesweeper-playing-in-homepage');

    const mutationObserver = new MutationObserver(() => {
        if (watchUserInput.childElementCount == 0) {
            clearInterval(autoplayIntervalToDigSquare);
            matrix = [];
            squaresInBoard = 0;
            squaresInterractedWith = 0;
            bombsPlaced = 0;
            boardWidth = 0;
            boardHeight = 0;
            screenWidth = 0;
            columnsToFit = 0;
            rowsToFit = 0;
            matrix = [];
            difficulty;
            squares;
            rows;
            squaresInBoard = 0;
            squaresInterractedWith = 0;
            squaresInViewport = 0;
            autoplayRunning = false;
            userDugBombPosition = '';
            autoplayIntervalToDigSquare;
            isBombsPlacedTextVisibleToUser = false;
            mobileUserWantsToFlag = 0;
        } else {
            setTimeout(() => {
                containerHomepage = document.querySelector('#game');
                boardWidth = containerHomepage.offsetWidth;
                boardHeight = containerHomepage.offsetHeight;
                screenWidth = window.innerWidth;
                columnsToFit = Math.floor(boardWidth / squareSize);
                rowsToFit = Math.floor(boardHeight / squareSize);
                tellUserBombsPlacedContainer = document.querySelector('.bombs-placed-container');
                tellUserBombsPlacedWrapper = document.querySelector('.bombs-placed-container .wrapper');
                tellUserBombsPlaced = document.querySelector('.bombs-placed-text');
                triggerTapFlagIcon = document.querySelector('.flag-icon-wrap');
                gameSettings = document.querySelector('.gameSettings');
                autoplayRunning = true;
                watchIfUserStartedGame();
                populateBoard();
                autoplayGame();
            }, 150)
        }
    })

    mutationObserver.observe(watchUserInput, { childList: true });
}