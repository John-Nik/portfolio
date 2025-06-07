import Square, { SquaresArray } from '../Square/Square';
import GameUI from '../GameUI/GameUI';
import { sleep } from '../helpers';
import GameBoardHelpers from './GameBoardHelpers';


class GameBoard {
    readonly ALLOWED_DIFFICULTIES: number[] = [0.12, 0.15, 0.20, 0.25];

    matrix: SquaresArray[] = [];
    gameBoardElem: HTMLDivElement = document.querySelector('#game') as HTMLDivElement;
    squareSize: number = 32;
    difficulty: typeof GameBoard.prototype.ALLOWED_DIFFICULTIES[number] = 0.12;
    squaresInteractedWith: number = 0;
    squaresInBoard: number = 0;
    autoplayRunning: boolean = true;
    autoplayIntervalToDigSquare: NodeJS.Timeout;
    lastDugBombPosition: string = '';
    isBombsPlacedTextVisible: boolean = false;
    mobileUserWantsToFlag: 0 | 1 = 0;
    gameUI: GameUI;
    lastDugSquare: Square | null = null;
    watcherForUserInitiatedGame: MutationObserver | null = null;
    bombsPresent: { value: number } = new Proxy({ value: 0 }, { // whenever this bombsPresent value is set, it will update the UI to reflect the new value
        set(target, prop, value) {
            this.gameUI?.displayBombsPlacedText(value);
            
            if (target[prop] - value < 0) {
                this.squaresInteractedWith++;
            } else if (target[prop] - value > 0) {
                this.squaresInteractedWith--;
            }

            target[prop] = value;
            return true;
        }
    });
    isGameFinished: boolean = false;
    minesweeperSessionIndicatorElem: HTMLDivElement = document.querySelector('.user-initiated-game-start');
    rows: number = 0;
    columns: number = 0;
    resizeObserver: ResizeObserver | null = null;
    leftClickFnReference: (e: MouseEvent) => void;
    rightClickFnReference: (e: MouseEvent) => void;

    // Explicitly declare helper methods for TypeScript
    hideLastDugSquare: typeof GameBoardHelpers.hideLastDugSquare;
    flagLastDugSquare: typeof GameBoardHelpers.flagLastDugSquare;
    setBombsCount: typeof GameBoardHelpers.setBombsCount;
    toggleRevealStatusOfLastDugSquare: typeof GameBoardHelpers.toggleRevealStatusOfLastDugSquare;
    stopGameAutoplay: typeof GameBoardHelpers.stopGameAutoplay;
    chooseDifficulty: typeof GameBoardHelpers.chooseDifficulty;
    createRow: typeof GameBoardHelpers.createRow;
    createRows: typeof GameBoardHelpers.createRows;
    createSquares: typeof GameBoardHelpers.createSquares;
    unwatchIfUserStartedGame: typeof GameBoardHelpers.unwatchIfUserStartedGame;
    getSquareFromEvent: typeof GameBoardHelpers.getSquareFromEvent;
    createSquare: typeof GameBoardHelpers.createSquare;


    constructor() {
        this.init();
    };

    init() {
        this.chooseDifficulty();

        // begin autoplaying when the board is initialized

        this.populateBoard();
        this.startGameAutoplay();
        this.beginHandlingResizeEvents();
    }

    populateBoard() {
        const width = this.gameBoardElem.clientWidth;
        const height = this.gameBoardElem.clientHeight;

        this.rows = Math.floor(height / this.squareSize);
        this.columns = Math.floor(width / this.squareSize);

        const gameGrid = new DocumentFragment();
        const rows = this.createRows(this.rows);

        rows.forEach((row, index) => {
            const squares = this.createSquares(this.columns, index);

            squares.forEach(square => row.elem.appendChild(square.elem));

            row.push(...squares);
            gameGrid.appendChild(row.elem);

            row.elem.style.gridTemplateColumns = `repeat(${this.columns}, minmax(24px, 1fr))`;
        });

        this.gameBoardElem.style.gridTemplateRows = `repeat(${this.rows}, minmax(24px, 1fr))`;

        this.gameBoardElem.appendChild(gameGrid);
    }

    watchIfUserStartedGame() {
        this.watcherForUserInitiatedGame = new MutationObserver(() => {
            if (this.minesweeperSessionIndicatorElem.childElementCount != 0) {
                this.minesweeperSessionIndicatorElem.innerHTML = '';
                return;
            }

            clearInterval(this.autoplayIntervalToDigSquare);
            this.autoplayRunning = false;
            this.startGame();
        });

        this.watcherForUserInitiatedGame.observe(this.minesweeperSessionIndicatorElem, { childList: true });
    }

    startGame() {
        this.resetBoard();
        
        setTimeout(() => {
            this.addInteractionToSquares();   
        }, 2000);

        return { 
            squaresInBoard: this.squaresInBoard,
            bombsPresent: this.bombsPresent,
        }
    }

    userLeftClick(clickEvent: MouseEvent) {
        const square = this.getSquareFromEvent(clickEvent);
        square.digSquare();
        this.lastDugSquare = square;
        this.checkIfGameIsFinished();
    }

    userRightClick(rightClickEvent: MouseEvent) {
        rightClickEvent.preventDefault();

        const square = this.getSquareFromEvent(rightClickEvent);
        square.flagSquare();
        this.checkIfGameIsFinished();
    }

    addInteractionToSquares() {
        const leftClick = (e: MouseEvent) => this.userLeftClick(e);
        const rightClick = (e: MouseEvent) => this.userRightClick(e);

        this.leftClickFnReference = leftClick;
        this.rightClickFnReference = rightClick;

        this.gameBoardElem.addEventListener('click', leftClick);
        this.gameBoardElem.addEventListener('contextmenu', rightClick);
    }

    disposeBoard() {
        this.matrix = [];
        this.gameBoardElem.innerHTML = '';
        this.squaresInBoard = 0;
        this.squaresInteractedWith = 0;
        this.bombsPresent.value = 0;
    }

    resetBoard() {
        this.disposeBoard();
        this.populateBoard();
    }

    startGameAutoplay() {
        let flatBoard: SquaresArray = this.matrix.flat(2);

        const removeSquareFromFlatBoard = (index: number) => flatBoard.splice(index, 1);
        const refilterFlatBoard = () => flatBoard = flatBoard.filter(square => !square.isRevealed && !square.isFlagged); // used to refilter the flatBoard after a recursive dig has happened

        this.autoplayRunning = true;

        this.autoplayIntervalToDigSquare = setInterval(() => {
            if (flatBoard.length === 0) {
                this.resetGameAutoplayBoard();
                return;
            }

            const randomIndex = Math.floor(Math.random() * flatBoard.length);
            const randomSquare = flatBoard[randomIndex];

            removeSquareFromFlatBoard(randomIndex);

            if (randomSquare.hasBomb) {
                randomSquare.flagSquare();
                return;
            }

            randomSquare.digSquare();

            /**
             * In cases that the square is not surrounded by any bombs, it will recursively dig all its surrounding squares, and command each of them to dig their surrounding squares as well if they have no bombs, until a square is reached that has a bomb or is surrounded by bombs.
             * 
             * This statement checks for that scenario, so when a recursive dig has happened, it will remove all squares that are not revealed or flagged from the flatBoard
             */
            if (randomSquare.countSurroundingBombs() === 0) {
                refilterFlatBoard();
            }
        }, 1000);
    }

    resetGameAutoplayBoard() {
        clearInterval(this.autoplayIntervalToDigSquare);
        this.resetBoard();
        this.startGameAutoplay();
    }

    async lostGame() {
        this.isGameFinished = true;

        this.removeInteractionFromSquares();
        this.startGameAutoplay();

        this.gameUI.lostGame();

        await sleep(5, 'sec');

        if (!this.autoplayRunning) return;

        this.lastDugSquare?.unRevealSquare();
    }

    checkIfGameIsFinished() {
        if (this.squaresInBoard !== this.squaresInteractedWith) return;

        if (this.autoplayRunning) {
            this.resetBoard();
            this.startGameAutoplay();
            return;
        }

        if (this.isGameFinished) return;

        this.winGame(); // if the user has not lost yet, and all squares have been interacted with, it is assumed the user won
    }

    async winGame() {
        this.gameUI.winGame();
        this.removeInteractionFromSquares();

        await sleep(30, 'sec');

        this.resetBoard();
        this.startGameAutoplay();
    }

    removeInteractionFromSquares() {
        this.gameBoardElem.removeEventListener('click', this.leftClickFnReference);
        this.gameBoardElem.removeEventListener('contextmenu', this.rightClickFnReference);
    }

    beginHandlingResizeEvents() {
        this.resizeObserver = new ResizeObserver(() => {
            this.handleResizeEvent();
        });
        this.resizeObserver.observe(this.gameBoardElem);
    }

    handleResizeEvent() {
        const width = this.gameBoardElem.clientWidth;
        const height = this.gameBoardElem.clientHeight;
        const rowsToFit = Math.floor(height / this.squareSize);
        const columnsToFit = Math.floor(width / this.squareSize);
        const shouldAddRows = (rowsToFit - this.rows) > 0;
        const shouldAddColumns = (columnsToFit - this.columns) > 0;

        if (!shouldAddRows && !shouldAddColumns) return;

        if (shouldAddColumns) {
            const colsToAdd = columnsToFit - this.columns;
            const oldBombsCount = this.bombsPresent.value;
            const lastCol = this.matrix.map(row => row.at(-1));

            this.matrix.forEach((row, rowIndex) => {
                for (let i = 0; i < colsToAdd; i++) {
                    const x = this.columns + i;
                    const square = this.createSquare([rowIndex, x]);

                    row.push(square);
                    row.elem.appendChild(square.elem);
                }

                row.elem.style.gridTemplateColumns = `repeat(${columnsToFit}, minmax(24px, 1fr))`;
            });

            lastCol.forEach(square => {
                if (!square.isRevealed) return;

                const surroundingBombs = square.countSurroundingBombs();
                if (surroundingBombs === 0) return;

                square.displayBombCount(surroundingBombs);
            });

            this.columns = columnsToFit;

            this.gameUI.displayBombsPlacedText(this.bombsPresent.value - oldBombsCount);
        }

        if (shouldAddRows) {
            const lastRow = this.matrix.at(-1);
            const oldBombsCount = this.bombsPresent.value;
            const newRows = this.createRows(rowsToFit - this.rows);
            const tempRowsGrid = new DocumentFragment();

            newRows.forEach((row, index) => {
                const y = this.rows + index;                
                const squares = this.createSquares(this.columns, y);

                squares.forEach(square => row.elem.appendChild(square.elem));

                row.push(...squares);
                tempRowsGrid.appendChild(row.elem);
                row.elem.style.gridTemplateColumns = `repeat(${this.columns}, minmax(24px, 1fr))`;
            });

            this.matrix.push(...newRows);
            this.gameBoardElem.append(tempRowsGrid);
            this.gameBoardElem.style.gridTemplateRows = `repeat(${rowsToFit}, minmax(24px, 1fr))`;

            lastRow.forEach(square => {
                if (!square.isRevealed) return;

                const surroundingBombs = square.countSurroundingBombs();
                if (surroundingBombs === 0) return;

                square.displayBombCount(surroundingBombs);
            });

            this.rows = rowsToFit;

            this.gameUI.displayBombsPlacedText(this.bombsPresent.value - oldBombsCount);
        }
    }
}

Object.assign(GameBoard.prototype, GameBoardHelpers);
export default GameBoard;