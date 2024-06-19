var containerHomepage = document.querySelector('#game');
var boardWidth = containerHomepage.offsetWidth;
var boardHeight = containerHomepage.offsetHeight;
var screenWidth = window.innerWidth;
var squareSize = 32;
var columnsToFit = Math.floor(boardWidth / squareSize);
var rowsToFit = Math.floor(boardHeight / squareSize);
var matrix = [];
var bombsPlaced = 0;
var difficulty;
var squares;
var rows;
var squaresInBoard = 0;
var squaresInterractedWith = 0;
var squaresInViewport = 0;
var autoplayRunning = true;
var userDugBombPosition = '';
var autoplayIntervalToDigSquare;
var isBombsPlacedTextVisibleToUser = false;
var tellUserBombsPlacedContainer = document.querySelector('.bombs-placed-container');
var tellUserBombsPlacedWrapper = document.querySelector('.bombs-placed-container .wrapper');
var tellUserBombsPlaced = document.querySelector('.bombs-placed-text');
var instructions = document.querySelector('.game-instructions-span');
var windowWidth = window.innerWidth;
var flagSvg = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect x="0.666504" width="17" height="18" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_14_9231" transform="matrix(0.00827206 0 0 0.0078125 -0.0294118 0)"/></pattern><image id="image0_14_9231" width="128" height="128" xlink:href="data:image/png;base64,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"/></defs></svg>';
var mobileUserWantsToFlag = 0;
var triggerTapFlagIcon = document.querySelector('.flag-icon-wrap');
var gameSettings = document.querySelector('.gameSettings');
containerHomepage.addEventListener('contextmenu', function (e) { return e.preventDefault(); });
triggerTapFlagIcon.addEventListener('click', function () {
    mobileUserWantsToFlag = (mobileUserWantsToFlag + 1) % 2;
});
var Square = /** @class */ (function () {
    function Square(position) {
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
    Square.prototype.digSquare = function () {
        var _this = this;
        if (mobileUserWantsToFlag) {
            this.flagSquare();
            isGameFinished();
            return;
        }
        if (this.isRevealed)
            return;
        var _a = this.position, Y = _a[0], X = _a[1];
        var htmlSquare = getHtmlSquare(Y, X);
        if (this.isFlagged == false) {
            this.isRevealed = true;
            squaresInterractedWith++;
            if (this.hasBomb) {
                htmlSquare.classList.add('revealed');
                htmlSquare.innerHTML = '<image src="/icons/bomb.svg" alt="">';
                setTimeout(function () {
                    _this.isRevealed = false;
                    _this.isFlagged = true;
                    htmlSquare.innerHTML = flagSvg;
                    htmlSquare.classList.remove('revealed');
                }, 5000);
                lostGame();
            }
            else {
                var countedBombs = this.countSurroundingBombs();
                if (countedBombs == 0) {
                    var surroundingSquares = this.getSurroundingSquares();
                    surroundingSquares.forEach(function (square) {
                        square.digSquare();
                    });
                }
                else {
                    htmlSquare.innerHTML = String(countedBombs);
                    htmlSquare.classList.add("B".concat(countedBombs));
                }
            }
            htmlSquare.classList.add('revealed');
        }
        else {
            squaresInterractedWith = squaresInterractedWith - 1;
            bombsPlaced++;
            tellUserBombsPlaced.textContent = "// ".concat(bombsPlaced);
            this.isFlagged = false;
            htmlSquare.innerHTML = '';
        }
    };
    Square.prototype.flagSquare = function () {
        var _a = this.position, Y = _a[0], X = _a[1];
        var htmlSquare = getHtmlSquare(Y, X);
        if (htmlSquare.classList.contains('revealed') == false) {
            if (this.isFlagged) {
                this.isFlagged = false;
                squaresInterractedWith = squaresInterractedWith - 1;
                bombsPlaced++;
                htmlSquare.innerHTML = '';
                tellUserBombsPlaced.textContent = "// ".concat(bombsPlaced);
            }
            else {
                this.isFlagged = true;
                squaresInterractedWith++;
                bombsPlaced = bombsPlaced - 1;
                htmlSquare.innerHTML = flagSvg;
                tellUserBombsPlaced.textContent = "// ".concat(bombsPlaced);
            }
        }
        isGameFinished();
    };
    Square.prototype.countSurroundingBombs = function () {
        var bombsCounted = 0;
        var surroundingSquares = this.getSurroundingSquares();
        surroundingSquares.forEach(function (square) {
            if (square.hasBomb)
                bombsCounted++;
        });
        return bombsCounted;
    };
    Square.prototype.getSurroundingSquares = function () {
        var surroundingSquares = [];
        var _a = this.position, Y = _a[0], X = _a[1];
        // checks to see if the line above or below the clicked line is outside of the matrix bounds. If not, it does the same test to the left and right columns. If they are within bounds, it pushes the square to the surroundingSquares Array with the positional information in it
        for (var i = -1; i < 2; i++) {
            if (matrix[Number(Y) + Number(i)] != undefined) {
                for (var j = -1; j < 2; j++) {
                    if (matrix[Number(Y) + Number(i)][Number(X) + Number(j)] != undefined) {
                        if (Number(Y) + Number(i) != Y || Number(X) + Number(j) != X) {
                            surroundingSquares.push(matrix[Number(Y) + Number(i)][Number(X) + Number(j)]);
                        }
                    }
                }
            }
        }
        return surroundingSquares;
    };
    return Square;
}());
chooseDifficulty();
adaptGameUserInstructionsToWidth(boardWidth);
populateBoard();
watchIfUserStartedGame();
autoplayGame();
function chooseDifficulty() {
    var selectedHtmlDifficulty = document.querySelector('.difficulty-feedback.active');
    var difficultyLevel = selectedHtmlDifficulty.dataset.difficulty;
    var difficultyVariables = [0.12, 0.15, 0.20, 0.25];
    difficulty = difficultyVariables[difficultyLevel];
}
function adaptGameUserInstructionsToWidth(width) {
    if (width === void 0) { width = 0; }
    if (width < 1024) {
        instructions.innerHTML = '// Click bottom right flag to switch to flagging or digging squares';
    }
    else {
        instructions.innerHTML = '// Left click to dig square <br> // Right click to flag square';
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
    }
    else {
        chooseDifficulty();
    }
    containerHomepage.style.gridTemplateRows = "repeat(".concat(rowsToFit, ", minmax(24px, 1fr))");
    var gameGrid = new DocumentFragment();
    for (var i = 0; i < rowsToFit; i++) {
        matrix.push([]);
        var row = document.createElement('div');
        row.classList.add('row');
        row.style.gridTemplateColumns = "repeat(".concat(columnsToFit, ", minmax(24px, 1fr))");
        for (var j = 0; j < columnsToFit; j++) {
            matrix[i].push(new Square([i, j]));
            var square = document.createElement('div');
            square.classList.add('square');
            square.dataset.position = "".concat(i, "_").concat(j);
            row.appendChild(square);
        }
        gameGrid.appendChild(row);
    }
    containerHomepage.appendChild(gameGrid);
    rows = document.querySelectorAll('.row');
    squares = document.querySelectorAll('.square');
}
function getHtmlSquare(Y, X) {
    return containerHomepage.childNodes[Y].childNodes[X];
}
function autoplayGame() {
    var condensedMatrix = matrix.reduce(function (accumulator, currentValue) {
        return accumulator.concat(currentValue);
    });
    autoplayRunning = true;
    randomlySelectSquare();
    function randomlySelectSquare() {
        if (condensedMatrix.length == 0) {
            clearInterval(autoplayIntervalToDigSquare);
            populateBoard();
            autoplayGame();
        }
        else {
            var randomGeneratedNumber = Math.floor(Math.random() * condensedMatrix.length);
            var randomSelectedSquare = condensedMatrix[randomGeneratedNumber];
            var _a = randomSelectedSquare.position, Y = _a[0], X = _a[1];
            if (randomSelectedSquare.hasBomb) {
                randomSelectedSquare.isFlagged = true;
                getHtmlSquare(Y, X).innerHTML = flagSvg;
                condensedMatrix.splice(randomGeneratedNumber, 1);
                return;
            }
            randomSelectedSquare.digSquare();
            condensedMatrix.splice(randomGeneratedNumber, 1);
            if (randomSelectedSquare.countSurroundingBombs() == 0) {
                condensedMatrix = condensedMatrix.filter(function (square) { if (!square.isRevealed && !square.isFlagged) {
                    return square;
                } });
            }
        }
    }
    autoplayIntervalToDigSquare = setInterval(randomlySelectSquare, 1500);
}
function watchIfUserStartedGame() {
    var watchUserInput = document.querySelector('.user-initiated-game-start');
    var mutationObserver = new MutationObserver(function () {
        if (watchUserInput.childElementCount != 0) {
            clearInterval(autoplayIntervalToDigSquare);
            autoplayRunning = false;
            startGame();
        }
        else {
            watchUserInput.innerHTML = '';
        }
    });
    mutationObserver.observe(watchUserInput, { childList: true });
}
function startGame() {
    populateBoard();
    if (isBombsPlacedTextVisibleToUser) {
        informUserBombsPlacedText.centerPosition();
        informUserBombsPlacedText.fullOpacity();
        informUserBombsPlacedText.resetFontSize();
        setTimeout(function () {
            informUserBombsPlacedText.moveDownRightCorner();
            informUserBombsPlacedText.reduceOpacity();
            informUserBombsPlacedText.decreaseFontSize();
        }, 2500);
        setTimeout(function () {
            tellUserBombsPlaced.textContent = '//';
            setTimeout(function () {
                tellUserBombsPlaced.textContent = "// ".concat(bombsPlaced);
            }, 750);
        }, 2000);
    }
    else {
        informUserBombsPlacedText.fadeIn();
        setTimeout(function () {
            informUserBombsPlacedText.moveDownRightCorner();
            informUserBombsPlacedText.reduceOpacity();
            informUserBombsPlacedText.decreaseFontSize();
        }, 2000);
        tellUserBombsPlaced.textContent = "// ".concat(bombsPlaced);
    }
    setTimeout(function () {
        containerHomepage.addEventListener('click', userLeftClick);
        containerHomepage.addEventListener('contextmenu', userRightClick);
    }, 1500);
}
function userLeftClick(clickEvent) {
    var clickedSquare = clickEvent.target;
    var _a = clickedSquare.dataset.position.split('_'), Y = _a[0], X = _a[1];
    matrix[Y][X].digSquare();
}
function userRightClick(rightClickEvent) {
    rightClickEvent.preventDefault();
    var rightClickedSquare = rightClickEvent.target;
    var _a = rightClickedSquare.dataset.position.split('_'), Y = _a[0], X = _a[1];
    matrix[Y][X].flagSquare();
}
var informUserBombsPlacedText = /** @class */ (function () {
    function informUserBombsPlacedText() {
    }
    informUserBombsPlacedText.reset = function () {
        tellUserBombsPlacedContainer.style.display = 'none';
        tellUserBombsPlacedWrapper.style.left = '0px';
        tellUserBombsPlacedWrapper.style.top = '0px';
        tellUserBombsPlacedWrapper.style.fontSize = '3rem';
        tellUserBombsPlacedContainer.style.opacity = '0';
        isBombsPlacedTextVisibleToUser = false;
    };
    informUserBombsPlacedText.fadeOut = function () {
        tellUserBombsPlacedContainer.style.opacity = '0';
        isBombsPlacedTextVisibleToUser = false;
    };
    informUserBombsPlacedText.moveDownRightCorner = function () {
        tellUserBombsPlacedWrapper.style.left = 'calc(50% - 122px + 48px)';
        tellUserBombsPlacedWrapper.style.top = 'calc(50% - 40px + 68px)';
    };
    informUserBombsPlacedText.decreaseFontSize = function () {
        tellUserBombsPlacedWrapper.style.fontSize = '1rem';
    };
    informUserBombsPlacedText.resetFontSize = function () {
        tellUserBombsPlacedWrapper.style.fontSize = '3rem';
    };
    informUserBombsPlacedText.reduceOpacity = function () {
        tellUserBombsPlacedContainer.style.opacity = '0.7';
    };
    informUserBombsPlacedText.fullOpacity = function () {
        tellUserBombsPlacedContainer.style.opacity = '1';
    };
    informUserBombsPlacedText.centerPosition = function () {
        tellUserBombsPlacedWrapper.style.left = '0px';
        tellUserBombsPlacedWrapper.style.top = '0px';
    };
    informUserBombsPlacedText.fadeIn = function () {
        tellUserBombsPlacedContainer.style.display = 'flex';
        setTimeout(function () {
            tellUserBombsPlacedContainer.style.opacity = '1';
        }, 100);
        isBombsPlacedTextVisibleToUser = true;
    };
    return informUserBombsPlacedText;
}());
function lostGame() {
    var endGameDesc = document.querySelector('.end-game-status');
    var startGameButton = document.querySelector('.start-game-button');
    var randomX = Math.ceil(Math.random() * 2);
    var randomY = Math.ceil(Math.random() * 2);
    var textContentWrapper = document.querySelector('.textContent');
    var gameControlPanel = document.querySelector('.gameSettings');
    var timesShakeExecuted = 0;
    var useNegativeShakeCoords = false;
    var smileyFace = document.querySelector('.dead-smiley-wrapper');
    var footerIconsContainer = document.querySelector('.footer-links-container');
    var socialsIcon = document.querySelector('.socials-icon-wrap');
    var flagIcon = document.querySelector('.flag-icon-wrap');
    footerIconsContainer.classList.toggle('hide-icons');
    socialsIcon.classList.toggle('show');
    flagIcon.classList.toggle('show');
    smileyFace.style.display = 'flex';
    autoplayRunning = true;
    autoplayGame();
    containerHomepage.removeEventListener('click', userLeftClick);
    containerHomepage.removeEventListener('contextmenu', userRightClick);
    if (screenWidth >= 1023) {
        setTimeout(function () {
            if (autoplayRunning) {
                informUserBombsPlacedText.fadeOut();
                setTimeout(function () { informUserBombsPlacedText.reset(); }, 1500);
            }
        }, 4500);
    }
    else {
        informUserBombsPlacedText.reset();
    }
    if (screenWidth <= 1023) {
        var showSettingsButton = document.querySelector('.show-settings-panel-button');
        showSettingsButton.innerHTML = 'You-lost<br>Play-again?';
        textContentWrapper.style.display = 'flex';
        setTimeout(function () {
            textContentWrapper.style.opacity = '1';
        });
    }
    else {
        endGameDesc.innerHTML = "You've lost the game";
        startGameButton.innerHTML = 'Play-again';
        textContentWrapper.style.display = 'flex';
        gameControlPanel.style.display = 'flex';
        setTimeout(function () {
            textContentWrapper.style.opacity = '1';
            gameControlPanel.style.opacity = '1';
        }, 50);
    }
    setTimeout(function () {
        if (autoplayRunning) {
            var Y = Number(userDugBombPosition.split('_')[0]);
            var X = Number(userDugBombPosition.split('_')[1]);
            matrix[Y][X].isRevealed = false;
            matrix[Y][X].isFlagged = true;
            getHtmlSquare(Y, X).innerHTML = flagSvg;
            getHtmlSquare(Y, X).classList.remove('revealed');
            squaresInterractedWith++;
        }
    }, 5000);
    containerHomepage.style.scale = "1.01";
    containerHomepage.style.left = "".concat(randomX, "px");
    containerHomepage.style.top = "".concat(randomY, "px");
    var intervalShakeGameBoard = setInterval(function () {
        if (timesShakeExecuted == 9) {
            clearInterval(intervalShakeGameBoard);
        }
        if (useNegativeShakeCoords) {
            useNegativeShakeCoords = false;
            containerHomepage.style.left = "-".concat(randomX, "px");
            containerHomepage.style.top = "-".concat(randomY, "px");
        }
        else {
            useNegativeShakeCoords = true;
            containerHomepage.style.left = "".concat(randomX, "px");
            containerHomepage.style.top = "".concat(randomY, "px");
        }
        timesShakeExecuted++;
    }, 30);
}
function isGameFinished() {
    if (squaresInViewport === squaresInterractedWith) {
        if (autoplayRunning) {
            populateBoard();
        }
        else {
            winGame();
        }
    }
}
function winGame() {
    var gameStatusTextBox = document.querySelector('.end-game-status');
    var startGameButton = document.querySelector('.start-game-button');
    var headerTitleContentContainer = document.querySelector('.textContent');
    var gameControlPanel = document.querySelector('.gameSettings');
    var footerIconsContainer = document.querySelector('.footer-links-containerHomepage');
    var socialsIcon = document.querySelector('.socials-icon-wrap');
    var flagIcon = document.querySelector('.flag-icon-wrap');
    footerIconsContainer.classList.toggle('hide-icons');
    socialsIcon.classList.toggle('show');
    flagIcon.classList.toggle('show');
    setTimeout(function () {
        populateBoard();
        autoplayGame();
        autoplayRunning = true;
    }, 30000);
    if (screenWidth > 860) {
        setTimeout(function () {
            if (autoplayRunning) {
                informUserBombsPlacedText.fadeOut();
                setTimeout(function () { informUserBombsPlacedText.reset(); }, 1500);
            }
        }, 4500);
    }
    else {
        informUserBombsPlacedText.reset();
    }
    containerHomepage.removeEventListener('click', userLeftClick);
    containerHomepage.removeEventListener('contextmenu', userRightClick);
    if (screenWidth < 720) {
        var showSettingsButton = document.querySelector('.show-settings-panel-button');
        showSettingsButton.innerHTML = 'You-won<br>Play-again?';
        headerTitleContentContainer.style.display = 'flex';
        setTimeout(function () {
            headerTitleContentContainer.style.opacity = '1';
        }, 50);
    }
    else {
        gameStatusTextBox.innerHTML = "You've won!";
        startGameButton.innerHTML = 'Play-again';
        headerTitleContentContainer.style.display = 'flex';
        gameControlPanel.style.display = 'flex';
        setTimeout(function () {
            headerTitleContentContainer.style.opacity = '1';
            gameControlPanel.style.opacity = '1';
        }, 50);
    }
}
var panelShownPriorWindowResize;
var isDesktopRes;
function storeLastMobilePanelState(screenWidth) {
    var textContentWrapper = document.querySelector('.textContent');
    if (screenWidth < 1024) {
        var endGameStatus = document.querySelector('.end-game-status');
        endGameStatus.innerHTML = '';
        if (isDesktopRes == undefined)
            isDesktopRes = false;
        if (isDesktopRes) {
            if (!autoplayRunning)
                return;
            if (panelShownPriorWindowResize == 'textContent') {
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
    }
    else {
        if (isDesktopRes == undefined)
            isDesktopRes = true;
        if (textContentWrapper.style.display == '')
            textContentWrapper.style.display = 'flex';
        if (isDesktopRes == false) {
            if (!autoplayRunning)
                return;
            if (textContentWrapper.style.display == 'flex') {
                panelShownPriorWindowResize = 'textContent';
            }
            else {
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
window.addEventListener('resize', function () {
    var newBoardWidth = containerHomepage.offsetWidth;
    var newBoardHeight = containerHomepage.offsetHeight;
    var newColumnsToFit = Math.floor(newBoardWidth / squareSize);
    var newRowsToFit = Math.floor(newBoardHeight / squareSize);
    var deltaNewColumnsOldColumns = newColumnsToFit - columnsToFit;
    var deltaNewRowsOldRows = newRowsToFit - rowsToFit;
    screenWidth = window.innerWidth;
    adaptGameUserInstructionsToWidth(screenWidth);
    storeLastMobilePanelState(screenWidth);
    if (newColumnsToFit > columnsToFit)
        adjustColumnsLayout();
    if (newRowsToFit > rowsToFit)
        adjustRowsLayout();
    function adjustRowsLayout() {
        clearInterval(autoplayIntervalToDigSquare);
        var gameGrid = new DocumentFragment();
        for (var i = 0; i < deltaNewRowsOldRows; i++) {
            var row = document.createElement('div');
            row.classList.add('row');
            row.style.gridTemplateColumns = "repeat(".concat(columnsToFit, ", minmax(24px, 1fr))");
            matrix.push([]);
            for (var j = 0; j < columnsToFit; j++) {
                matrix[matrix.length - 1].push(new Square([matrix.length - 1, j]));
                var square = document.createElement('square');
                square.classList.add('square');
                square.dataset.position = "".concat(matrix.length - 1, "_").concat(j);
                row.appendChild(square);
            }
            gameGrid.append(row);
        }
        containerHomepage.lastChild.previousSibling.childNodes.forEach(function (square) {
            if (square.classList.contains('revealed') && square.textContent != '') {
                updateOldSiblingSquaresNearNewlyAddedSquares(square);
            }
        });
        containerHomepage.style.gridTemplateRows = "repeat(".concat(newRowsToFit, ", minmax(24px, 1fr))");
        rowsToFit = newRowsToFit;
        boardHeight = newBoardHeight;
        rows = document.querySelectorAll('.row');
        tellUserBombsPlaced.textContent = "// ".concat(bombsPlaced);
        if (autoplayRunning)
            autoplayGame();
    }
    function adjustColumnsLayout() {
        clearInterval(autoplayIntervalToDigSquare);
        var lastColumnSquares = [];
        rows.forEach(function (row, rowIndex) {
            var lastSquare = row.lastChild;
            if (lastSquare.classList.contains('revealed'))
                lastColumnSquares.push(row.lastChild);
            var rowLength = matrix[rowIndex].length;
            for (var i = 0; i < deltaNewColumnsOldColumns; i++) {
                var square = document.createElement('div');
                square.classList.add('square');
                square.dataset.position = "".concat(rowIndex, "_").concat(rowLength + i);
                matrix[rowIndex].push(new Square([rowIndex, rowLength + i]));
                row.appendChild(square);
            }
            row.style.gridTemplateColumns = "repeat(".concat(newColumnsToFit, ", minmax(24px, 1fr))");
        });
        lastColumnSquares.forEach(function (square) {
            updateOldSiblingSquaresNearNewlyAddedSquares(square);
        });
        columnsToFit = newColumnsToFit;
        boardWidth = newBoardWidth;
        squares = document.querySelectorAll('.square');
        tellUserBombsPlaced.textContent = "// ".concat(bombsPlaced);
        if (autoplayRunning)
            autoplayGame();
    }
});
function updateOldSiblingSquaresNearNewlyAddedSquares(square) {
    var _a = square.dataset.position.split('_'), Y = _a[0], X = _a[1];
    var oldBombsSurrounding = square.textContent;
    var oldBombsSurroundingClass = 'B' + oldBombsSurrounding;
    var bombsCurrentlyAround = matrix[Y][X].countSurroundingBombs();
    if (oldBombsSurrounding == '') {
        if (bombsCurrentlyAround === 0)
            return;
        square.innerHTML = bombsCurrentlyAround;
        square.classList.add("B".concat(bombsCurrentlyAround));
        return;
    }
    square.innerHTML = bombsCurrentlyAround;
    square.classList.replace(oldBombsSurroundingClass, "B".concat(bombsCurrentlyAround));
}
watchIfUserSwitchesPage();
function watchIfUserSwitchesPage() {
    var watchUserInput = document.querySelector('.is-minesweeper-playing-in-homepage');
    var mutationObserver = new MutationObserver(function () {
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
        }
        else {
            setTimeout(function () {
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
            }, 150);
        }
    });
    mutationObserver.observe(watchUserInput, { childList: true });
}
