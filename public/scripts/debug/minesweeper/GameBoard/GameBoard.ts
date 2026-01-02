import Square, { SquaresArray } from '../Square/Square';
import { sleep } from '../helpers';
import Game from '../../minesweeper';
import { Cords } from '../types/Cords';
import GameUI from '../../../minesweeper/GameUI/GameUI';
import { FREEZE_TIME, POST_LOSE_CLEANUP_DELAY, POST_WIN_CLEANUP_DELAY } from '../constants/FREEZE_TIME';

type BombCounter = { value: number };

class GameBoard {
    readonly ALLOWED_DIFFICULTIES: number[] = [0.12, 0.15, 0.20, 0.25];
    readonly SQUARE_SIZE: number = 32;

    matrix: SquaresArray[] = [];
    gameBoardElem = document.querySelector<HTMLDivElement>('#game');
    difficulty: typeof GameBoard.prototype.ALLOWED_DIFFICULTIES[number] = 0.12;
    squaresInteractedWith: number = 0;
    squaresInBoard: number = 0;
    autoplayRunning: boolean = true;
    autoplayIntervalToDigSquare: NodeJS.Timeout | undefined = undefined;
    lastDugBombPosition: string = '';
    isBombsPlacedTextVisible: boolean = false;
    mobileUserWantsToFlag: 0 | 1 = 0;
    game: Game | null = null;
    lastDugSquare: Square | null = null;
    watcherForUserInitiatedGame: MutationObserver | null = null;
    // Whenever this bombsPresent value is set, it will update the UI to reflect the new value
    bombsPresent: BombCounter = new Proxy<BombCounter>({ value: 0 }, {
        set: (target, prop, value: number) => {
            if (prop !== 'value') return true; // Only care about "value"

            if (this.isUserPlaying) {
                this.game?.ui?.displayBombsPlacedText(value);
            }

            const diff = target.value - value;
            if (diff < 0) this.squaresInteractedWith++;
            else if (diff > 0) this.squaresInteractedWith--;

            target.value = value;
            return true;
        },
    });
    isGameFinished: boolean = false;
    rows: number = 0;
    columns: number = 0;
    resizeObserver: ResizeObserver | null = null;
    leftClickFnReference: ((e: MouseEvent) => void) | null = null;
    rightClickFnReference: ((e: MouseEvent) => void) | null = null;
    timeoutToAddSquaresInteraction: NodeJS.Timeout | undefined = undefined;
    isBeingDestroyed: boolean = false;
    isUserPlaying: boolean = false;

    constructor(game: Game) {
        this.game = game;
    };

    init() {
        this.chooseDifficulty();
        this.populateBoard();
        this.startGameAutoplay();
        this.beginHandlingResizeEvents();
    }

    populateBoard() {
        this.validateElem(this.gameBoardElem);

        const width = this.gameBoardElem.clientWidth;
        const height = this.gameBoardElem.clientHeight;

        this.rows = Math.floor(height / this.SQUARE_SIZE);
        this.columns = Math.floor(width / this.SQUARE_SIZE);

        const gameGrid = new DocumentFragment();
        const rows = this.createRows(this.rows);

        rows.forEach((row, index) => {
            this.validateRowHasElem(row);

            const squares = this.createSquares(this.columns, index);

            squares.forEach(square => {
                this.validateSquareHasElem(square);

                row.elem.appendChild(square.elem);
            });

            row.push(...squares);
            gameGrid.appendChild(row.elem);

            row.elem.style.gridTemplateColumns = `repeat(${this.columns}, minmax(24px, 1fr))`;
        });

        this.gameBoardElem.style.gridTemplateRows = `repeat(${this.rows}, minmax(24px, 1fr))`;

        this.gameBoardElem.appendChild(gameGrid);
    }

    startGame() {
        this.stopGameAutoplay();
        this.resetBoard();

        this.timeoutToAddSquaresInteraction = setTimeout(() => {
            this.addInteractionToSquares();
            this.isUserPlaying = true;
        }, FREEZE_TIME);

        return { 
            squaresInBoard: this.squaresInBoard,
            bombsPresent: this.bombsPresent,
        };
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
        this.validateGameIsLinked();
        this.validateElem(this.gameBoardElem);

        const leftClick = (e: MouseEvent) => this.userLeftClick(e);
        const rightClick = (e: MouseEvent) => this.userRightClick(e);

        this.leftClickFnReference = leftClick;
        this.rightClickFnReference = rightClick;

        this.gameBoardElem.addEventListener('click', leftClick, { signal: this.game.abort.signal });
        this.gameBoardElem.addEventListener('contextmenu', rightClick, { signal: this.game.abort.signal });
    }

    disposeBoard() {
        this.validateElem(this.gameBoardElem);

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

        function removeSquareFromFlatBoard(index: number) {
            return flatBoard.splice(index, 1);
        } 

        // Used to refilter the flatBoard after a recursive dig has happened
        function refilterFlatBoard() {
            flatBoard = flatBoard.filter(square => !square.isRevealed && !square.isFlagged);
        }

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
             * In cases that the square is not surrounded by any bombs, it will recursively dig all its surrounding squares,
             * and command each of them to dig their surrounding squares as well if they have no bombs, until a square is
             * reached that has a bomb or is surrounded by bombs.
             * 
             * This statement checks for that scenario, so when a recursive dig has happened, it will remove all squares
             * that are not revealed or flagged from the flatBoard
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
        this.validateGameUI();

        this.handleGameEnd('lose');

        if (await this.sleepAndCheckDestroyed(POST_LOSE_CLEANUP_DELAY)) return;
        if (this.isUserPlaying) return; // The user could restart the game before the 5 seconds mark

        this.lastDugSquare?.unRevealSquare();
        this.startGameAutoplay();
    }

    checkIfGameIsFinished() {
        if (this.squaresInBoard !== this.squaresInteractedWith) return;

        if (this.autoplayRunning) {
            this.resetBoard();
            this.startGameAutoplay();
            return;
        }

        if (this.isGameFinished) return;

        this.winGame(); // If the user has not lost yet, and all squares have been interacted with, it is assumed the user won
    }

    async winGame() {
        this.validateGameUI();

        this.handleGameEnd('win');

        if (await this.sleepAndCheckDestroyed(POST_WIN_CLEANUP_DELAY)) return;
        if (this.isUserPlaying) return; // The user could restart the game before the 30 seconds mark

        this.resetBoard();
        this.startGameAutoplay();
    }

    handleGameEnd(result: 'win' | 'lose') {
        this.isGameFinished = true;
        this.isUserPlaying = false;

        this.removeInteractionFromSquares();

        if (result === 'win') {
            this.game?.ui?.winGame();
        } else {
            this.game?.ui?.lostGame();
        }
    }

    async sleepAndCheckDestroyed(ms: number) {
        await sleep(ms);
        return this.isBeingDestroyed;
    }

    removeInteractionFromSquares() {
        this.validateElem(this.gameBoardElem);

        if (this.leftClickFnReference === null || this.rightClickFnReference === null) {
            throw new Error('Cannot remove interaction from squares because the function references are null.');
        }

        this.gameBoardElem.removeEventListener('click', this.leftClickFnReference);
        this.gameBoardElem.removeEventListener('contextmenu', this.rightClickFnReference);
    }

    beginHandlingResizeEvents() {
        this.validateElem(this.gameBoardElem);

        this.resizeObserver = new ResizeObserver(() => {
            this.handleResizeEvent();
        });
        this.resizeObserver.observe(this.gameBoardElem);
    }

    addColumnOnResize(colsToAdd: number) {
        this.validateGameUI();

        if (colsToAdd <= 0) return;

        const colsToFit = colsToAdd + this.columns;
        const preResizeRightmostColumnSquares  = this.matrix.map(row => row.at(-1));

        this.matrix.forEach((row, rowIndex) => {
            this.validateRowHasElem(row);

            while (row.length < colsToFit) {
                const x = row.length;
                const square = this.createSquare([rowIndex, x]);

                this.validateSquareHasElem(square);

                row.push(square);
                row.elem.appendChild(square.elem);
            }

            row.elem.style.gridTemplateColumns = `repeat(${colsToFit}, minmax(24px, 1fr))`;
        });

        preResizeRightmostColumnSquares.forEach(square => {
            this.validateSquare(square);

            if (!square.isRevealed) return;

            const surroundingBombs = square.countSurroundingBombs();
            if (surroundingBombs === 0) return;

            square.displayBombCount(surroundingBombs);
        });

        this.columns = colsToFit;
    }

    addRowOnResize(rowsToAdd: number) {
        this.validateGameUI();

        if (rowsToAdd <= 0) return;

        const preResizeLastRow = this.matrix.at(-1);

        const tempRowsGrid = new DocumentFragment();
        const rowsToFit = rowsToAdd + this.rows;

        while (this.rows < rowsToFit) {
            const newRow = this.createRow();

            this.validateRow(newRow);

            const y = this.rows;
            const squares = this.createSquares(this.columns, y);
            const tempSquaresElems = new DocumentFragment();

            squares.forEach(square => {
                this.validateSquareHasElem(square);
                tempSquaresElems.appendChild(square.elem);
            });

            newRow.elem.style.gridTemplateColumns = `repeat(${this.columns}, minmax(24px, 1fr))`;

            newRow.push(...squares);
            newRow.elem.append(tempSquaresElems);
            tempRowsGrid.appendChild(newRow.elem);

            this.matrix.push(newRow);
            this.rows++;
        }

        this.validateElem(this.gameBoardElem);

        this.gameBoardElem.style.gridTemplateRows = `repeat(${rowsToFit}, minmax(24px, 1fr))`;

        this.gameBoardElem.append(tempRowsGrid);

        this.validateRow(preResizeLastRow);

        preResizeLastRow.forEach(square => {
            this.validateSquare(square);

            if (!square.isRevealed) return;

            const surroundingBombs = square.countSurroundingBombs();
            if (surroundingBombs === 0) return;

            square.displayBombCount(surroundingBombs);
        });
    }

    handleResizeEvent() {
        this.validateGameUI();
        this.validateGameBoard();
        this.validateElem(this.gameBoardElem);

        const width = this.gameBoardElem.clientWidth;
        const height = this.gameBoardElem.clientHeight;
        const rowsToFit = Math.floor(height / this.SQUARE_SIZE) - this.game.board.rows;
        const columnsToFit = Math.floor(width / this.SQUARE_SIZE) - this.game.board.columns;

        this.addColumnOnResize(columnsToFit);
        this.addRowOnResize(rowsToFit);
    }

    hideLastDugSquare() {
        this.lastDugSquare?.unRevealSquare();
    };

    flagLastDugSquare() {
        this.lastDugSquare?.flagSquare();
    };

    setBombsCount(bombsCount: number) {
        this.validateGameUI();
        this.validateElem(this.game.ui.elementToInformUserBombCount);

        this.bombsPresent.value = bombsCount;
        this.game.ui.elementToInformUserBombCount.textContent = `// ${bombsCount}`;
    };

    toggleRevealStatusOfLastDugSquare() {
        if (this.lastDugSquare?.isRevealed) {
            this.lastDugSquare.unRevealSquare();
        } else {
            this.lastDugSquare?.revealSquare();
        }
    };

    stopGameAutoplay() {
        this.autoplayRunning = false;
        clearInterval(this.autoplayIntervalToDigSquare);
    };

    chooseDifficulty(difficulty: typeof GameBoard.prototype.ALLOWED_DIFFICULTIES[number] = this.ALLOWED_DIFFICULTIES[0]) {
        this.difficulty = difficulty;
    };

    createRow(): SquaresArray {
        const row: SquaresArray = [];
        this.matrix.push(row);

        const rowElem = document.createElement('div');
        rowElem.classList.add('row');

        row.elem = rowElem;

        return row;
    };

    createRows(count: number): SquaresArray[] {
        const elemRows: HTMLDivElement[] = [];
        const rows: SquaresArray[] = [];

        for (let i = 0; i < count; i++) {
            const row = this.createRow();

            if (row.elem === undefined) {
                throw new Error('Row element does not exist. Was it created properly?');
            }

            elemRows.push(row.elem);
            rows.push(row);
        }

        return rows;
    };

    createSquare([y, x]: Cords): Square {
        this.validateGameIsLinked();

        const square = new Square([y, x], this.game);

        if (square.hasBomb) {
            this.bombsPresent.value++;
        }

        this.squaresInBoard++;

        return square;
    };

    createSquares(count: number, rowIndex: number): Square[] {
        const squares: Square[] = [];

        for (let i = 0; i < count; i++) {
            const square = this.createSquare([rowIndex, i]);
            squares.push(square);
        }

        return squares;
    };

    unwatchIfUserStartedGame() {
        this.watcherForUserInitiatedGame?.disconnect();
        this.watcherForUserInitiatedGame = null;
    };

    getSquareFromEvent(clickEvent: MouseEvent): Square {
        const clickedSquare = clickEvent.target as HTMLDivElement;

        if (!clickedSquare.dataset.position) {
            throw new Error('Square does not contain a position dataset attribute.');
        }

        const [Y, X] = clickedSquare.dataset.position.split('_').map(Number);
        return this.matrix[Y][X];
    };

    validateGameIsLinked(): asserts this is { game: Game } {
        if (!this.game) {
            throw new Error('Main Game instance is not linked to the GameBoard instance.');
        }
    }

    validateSquare(square: unknown): asserts square is Square {
        if (square instanceof Square === false) {
            throw new Error('Square does not exist.');
        }
    }

    validateSquareHasElem(square: unknown): asserts square is Square & { elem: HTMLDivElement } {
        this.validateSquare(square);

        if (!square.elem) {
            throw new Error('Square element does not exist.');
        }
    }

    validateRow(row: unknown): asserts row is SquaresArray & { elem: HTMLDivElement } {
        if (Array.isArray(row) === false) {
            throw new Error('Row does not exist.');
        }
    }

    validateRowHasElem(row: unknown): asserts row is SquaresArray & { elem: HTMLDivElement } {
        this.validateRow(row);

        if (!row.elem) {
            throw new Error('Row element does not exist.');
        }
    }

    validateGameUI(): asserts this is GameBoard & { game: Game & { ui: GameUI } } {
        this.validateGameIsLinked();

        if (!this.game.ui) {
            throw new Error('UI is not linked to main Game. Is it instantiated?');
        }
    }

    validateElem(elem: unknown): asserts elem is NonNullable<typeof elem> {
        if (!(elem instanceof HTMLElement)) {
            throw new Error('Element is not instance of HTMLElement');
        }
    }

    validateGameBoard(): asserts this is GameBoard & { game: Game & { board: GameBoard } } {
        this.validateGameIsLinked();

        if (!this.game.board) {
            throw new Error('The Board is not linked to the main game. Is it instantiated?');
        }
    }

    destroy() {
        this.isBeingDestroyed = true;

        clearInterval(this.autoplayIntervalToDigSquare);
        clearTimeout(this.timeoutToAddSquaresInteraction);

        if (this.gameBoardElem) {
            this.gameBoardElem.innerHTML = '';
        }

        this.resizeObserver?.disconnect();
    }
}

export default GameBoard;