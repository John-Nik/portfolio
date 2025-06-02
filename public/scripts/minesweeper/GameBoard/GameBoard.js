import { sleep } from '../helpers';
import GameBoardHelpers from './GameBoardHelpers';
class GameBoard {
    constructor() {
        this.ALLOWED_DIFFICULTIES = [0.12, 0.15, 0.20, 0.25];
        this.matrix = [];
        this.gameBoardElem = document.querySelector('#game');
        this.squareSize = 32;
        this.difficulty = 0.12;
        this.squaresInteractedWith = 0;
        this.squaresInBoard = 0;
        this.squaresInViewport = 0;
        this.autoplayRunning = true;
        this.lastDugBombPosition = '';
        this.isBombsPlacedTextVisible = false;
        this.mobileUserWantsToFlag = 0;
        this.lastDugSquare = null;
        this.watcherForUserInitiatedGame = null;
        this.bombsPresent = new Proxy({ value: 0 }, {
            set(target, prop, value) {
                this.gameUI?.displayBombsPlacedText(value);
                if (target[prop] - value < 0) {
                    this.squaresInteractedWith++;
                }
                else if (target[prop] - value > 0) {
                    this.squaresInteractedWith--;
                }
                target[prop] = value;
                return true;
            }
        });
        this.isGameFinished = false;
        this.minesweeperSessionIndicatorElem = document.querySelector('.user-initiated-game-start');
        this.init();
    }
    ;
    init() {
        this.chooseDifficulty();
        // begin autoplaying when the board is initialized
        this.populateBoard();
        this.startGameAutoplay();
    }
    populateBoard() {
        const { width, height } = this.gameBoardElem.getBoundingClientRect();
        const rowsToFit = Math.floor(height / this.squareSize);
        const columnsToFit = Math.floor(width / this.squareSize);
        const gameGrid = new DocumentFragment();
        const { rows, elemRows } = this.createRows(rowsToFit);
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const elemRow = elemRows[i];
            const squares = this.createSquares(columnsToFit, i);
            squares.forEach(square => elemRow.appendChild(square.elem));
            row.push(...squares);
            elemRow.style.gridTemplateColumns = `repeat(${columnsToFit}, minmax(24px, 1fr))`;
        }
        this.gameBoardElem.style.gridTemplateRows = `repeat(${rowsToFit}, minmax(24px, 1fr))`;
        gameGrid.append(...elemRows);
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
        return {
            squaresInBoard: this.squaresInBoard,
            bombsPresent: this.bombsPresent,
        };
    }
    userLeftClick(clickEvent) {
        const square = this.getSquareFromEvent(clickEvent);
        square.digSquare();
        this.lastDugSquare = square;
        this.checkIfGameIsFinished();
    }
    userRightClick(rightClickEvent) {
        rightClickEvent.preventDefault();
        const square = this.getSquareFromEvent(rightClickEvent);
        square.flagSquare();
        this.checkIfGameIsFinished();
    }
    addInteractionToSquares() {
        this.gameBoardElem.addEventListener('click', this.userLeftClick);
        this.gameBoardElem.addEventListener('contextmenu', this.userRightClick);
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
        let flatBoard = this.matrix.flat(2);
        const removeSquareFromFlatBoard = (index) => flatBoard.splice(index, 1);
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
        }, 1500);
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
        if (!this.autoplayRunning)
            return;
        this.lastDugSquare?.unRevealSquare();
    }
    checkIfGameIsFinished() {
        if (this.squaresInViewport !== this.squaresInteractedWith)
            return;
        if (this.autoplayRunning) {
            this.resetBoard();
            this.startGameAutoplay();
            return;
        }
        if (this.isGameFinished)
            return;
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
        this.gameBoardElem.removeEventListener('click', this.userLeftClick);
        this.gameBoardElem.removeEventListener('contextmenu', this.userRightClick);
    }
}
Object.assign(GameBoard.prototype, GameBoardHelpers);
export default GameBoard;
