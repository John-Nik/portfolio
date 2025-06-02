import GameBoard from './minesweeper/GameBoard/GameBoard';
import GameUI from './minesweeper/GameUI/GameUI';

class Game {
    readonly ALLOWED_DIFFICULTIES: number[] = [0.12, 0.15, 0.20, 0.25];

    gameBoard: GameBoard;
    gameUI: GameUI;

    constructor() {
        this.gameBoard = new GameBoard();
        this.gameUI = new GameUI();

        this.init();
    }

    init() {
        this.gameUI.elemToTriggerTapMode.addEventListener('click', () => {
            const newValue = this.gameBoard.mobileUserWantsToFlag + 1;
            this.gameBoard.mobileUserWantsToFlag = newValue % 2 as 0 | 1;
        });

        this.gameBoard.chooseDifficulty(this.ALLOWED_DIFFICULTIES[0]);
        this.gameUI.gameBoard = this.gameBoard;
        this.gameBoard.gameUI = this.gameUI;
    }

    chooseDifficulty() {
        const currentDifficulty = this.gameUI.currentlyChosenDifficulty();
        this.gameBoard.chooseDifficulty(this.ALLOWED_DIFFICULTIES[currentDifficulty]);
    }

    startGame() {
        this.gameBoard.startGame();
        this.gameUI.startGame();
    }
}

const game = new Game();


// let panelShownPriorWindowResize: 'textContent' | 'gameSettings';
// let isDesktopRes: boolean;
// function storeLastMobilePanelState(screenWidth: number) {
//     const textContentWrapper: HTMLDivElement = document.querySelector('.textContent');

//     if (screenWidth < 1024) {
//         let endGameStatus = document.querySelector('.end-game-status');
//         endGameStatus.innerHTML = '';
        
//         if (isDesktopRes == undefined) 
//             isDesktopRes = false;

//         if (isDesktopRes) {
//             if (!autoplayRunning) return;

//             if (panelShownPriorWindowResize == 'textContent')  {
//                 gameSettings.style.opacity = '0';
//                 gameSettings.style.display = 'none';
//                 textContentWrapper.style.opacity = '1';
//                 textContentWrapper.style.display = 'flex';
//             }
    
//             if (panelShownPriorWindowResize == 'gameSettings') {
//                 gameSettings.style.opacity = '1';
//                 gameSettings.style.display = 'flex';
//                 textContentWrapper.style.opacity = '0';
//                 textContentWrapper.style.display = 'none';
//             }

//             isDesktopRes = false;
//         }
//     } else {
//         if (isDesktopRes == undefined) 
//             isDesktopRes = true;
        
//         if (textContentWrapper.style.display == '') 
//             textContentWrapper.style.display = 'flex';

//         if (isDesktopRes == false) {
//             if (!autoplayRunning) return;

//             if (textContentWrapper.style.display == 'flex') {
//                 panelShownPriorWindowResize = 'textContent';
//             } else {
//                 panelShownPriorWindowResize = 'gameSettings';
//             }
    
//             textContentWrapper.style.opacity = '1';
//             textContentWrapper.style.display = 'flex';
//             gameSettings.style.opacity = '1';
//             gameSettings.style.display = 'flex';

//             isDesktopRes = true;
//         }
//     }
// }




// window.addEventListener('resize', () => {
//     let newBoardWidth = containerHomepage.offsetWidth;
//     let newBoardHeight = containerHomepage.offsetHeight;
//     let newColumnsToFit = Math.floor(newBoardWidth / squareSize);
//     let newRowsToFit = Math.floor(newBoardHeight / squareSize);
//     let deltaNewColumnsOldColumns = newColumnsToFit - columnsToFit;
//     let deltaNewRowsOldRows = newRowsToFit - rowsToFit;
//     screenWidth = window.innerWidth;

//     adaptGameUserInstructionsToWidth(screenWidth);

//     storeLastMobilePanelState(screenWidth);

//     if (newColumnsToFit > columnsToFit) 
//         adjustColumnsLayout();

    
//     if (newRowsToFit > rowsToFit) 
//         adjustRowsLayout();


//     function adjustRowsLayout() {
//         clearInterval(autoplayIntervalToDigSquare);
//         let gameGrid = new DocumentFragment();

//         for (let i = 0; i < deltaNewRowsOldRows; i++) {
//             const row = document.createElement('div');
//             row.classList.add('row');
//             row.style.gridTemplateColumns = `repeat(${columnsToFit}, minmax(24px, 1fr))`;

//             matrix.push([]);


//             for (let j = 0; j < columnsToFit; j++) {
//                 matrix[matrix.length - 1].push(new Square([matrix.length - 1, j]));

//                 const square = document.createElement('square');
//                 square.classList.add('square');
//                 square.dataset.position = `${matrix.length -1}_${j}`; 
//                 row.appendChild(square);

//             }
            
//             gameGrid.append(row);
//         }


//         containerHomepage.lastChild.previousSibling.childNodes.forEach((square: HTMLDivElement) => {
//             if (square.classList.contains('revealed') && square.textContent != '') {
//                 updateOldSiblingSquaresNearNewlyAddedSquares(square);
//             }
//         })

//         containerHomepage.style.gridTemplateRows = `repeat(${newRowsToFit}, minmax(24px, 1fr))`;
//         rowsToFit = newRowsToFit;
//         boardHeight = newBoardHeight;
//         rows = document.querySelectorAll('.row');
//         tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
//         if (autoplayRunning) autoplayGame();
//     }


//     function adjustColumnsLayout() {
//         clearInterval(autoplayIntervalToDigSquare);

//         let lastColumnSquares = [];

//         rows.forEach((row: HTMLDivElement, rowIndex: number) => {
//             let lastSquare = row.lastChild as HTMLDivElement;
//             if (lastSquare.classList.contains('revealed')) lastColumnSquares.push(row.lastChild);

//             let rowLength = matrix[rowIndex].length;
//             for (let i = 0; i < deltaNewColumnsOldColumns; i++) {
//                 const square = document.createElement('div');
//                 square.classList.add('square');
//                 square.dataset.position = `${rowIndex}_${rowLength + i}`;

//                 matrix[rowIndex].push(new Square([rowIndex, rowLength + i]));
//                 row.appendChild(square);
//             }
            
//             row.style.gridTemplateColumns = `repeat(${newColumnsToFit}, minmax(24px, 1fr))`  
//         })

//         lastColumnSquares.forEach((square) => {
//             updateOldSiblingSquaresNearNewlyAddedSquares(square);
//         })

//         columnsToFit = newColumnsToFit;
//         boardWidth = newBoardWidth;
//         squares = document.querySelectorAll('.square');
//         tellUserBombsPlaced.textContent = `// ${bombsPlaced}`
//         if (autoplayRunning) autoplayGame();
//     }
// })

// function updateOldSiblingSquaresNearNewlyAddedSquares(square: HTMLDivElement) {
//     let [Y, X] = square.dataset.position.split('_');
//     let oldBombsSurrounding: string = square.textContent;
//     let oldBombsSurroundingClass = 'B' + oldBombsSurrounding;
//     let bombsCurrentlyAround = matrix[Y][X].countSurroundingBombs();

//     if (oldBombsSurrounding == '') {
//         if (bombsCurrentlyAround === 0) return;

//         square.innerHTML = bombsCurrentlyAround;
//         square.classList.add(`B${bombsCurrentlyAround}`);
//         return;
//     }

    
//     square.innerHTML = bombsCurrentlyAround;
//     square.classList.replace(oldBombsSurroundingClass, `B${bombsCurrentlyAround}`);
// }

// watchIfUserSwitchesPage();
// function watchIfUserSwitchesPage() {
//     const watchUserInput = document.querySelector('.is-minesweeper-playing-in-homepage');

//     const mutationObserver = new MutationObserver(() => {
//         if (watchUserInput.childElementCount == 0) {
//             clearInterval(autoplayIntervalToDigSquare);
//             matrix = [];
//             squaresInBoard = 0;
//             squaresInteractedWith = 0;
//             bombsPlaced = 0;
//             boardWidth = 0;
//             boardHeight = 0;
//             screenWidth = 0;
//             columnsToFit = 0;
//             rowsToFit = 0;
//             matrix = [];
//             difficulty;
//             squares;
//             rows;
//             squaresInBoard = 0;
//             squaresInteractedWith = 0;
//             squaresInViewport = 0;
//             autoplayRunning = false;
//             userDugBombPosition = '';
//             autoplayIntervalToDigSquare;
//             isBombsPlacedTextVisibleToUser = false;
//             mobileUserWantsToFlag = 0;
//         } else {
//             setTimeout(() => {
//                 containerHomepage = document.querySelector('#game');
//                 boardWidth = containerHomepage.offsetWidth;
//                 boardHeight = containerHomepage.offsetHeight;
//                 screenWidth = window.innerWidth;
//                 columnsToFit = Math.floor(boardWidth / squareSize);
//                 rowsToFit = Math.floor(boardHeight / squareSize);
//                 tellUserBombsPlacedContainer = document.querySelector('.bombs-placed-container');
//                 tellUserBombsPlacedWrapper = document.querySelector('.bombs-placed-container .wrapper');
//                 tellUserBombsPlaced = document.querySelector('.bombs-placed-text');
//                 triggerTapFlagIcon = document.querySelector('.flag-icon-wrap');
//                 gameSettings = document.querySelector('.gameSettings');
//                 autoplayRunning = true;
//                 watchIfUserStartedGame();
//                 populateBoard();
//                 autoplayGame();
//             }, 150)
//         }
//     })

//     mutationObserver.observe(watchUserInput, { childList: true });
// }