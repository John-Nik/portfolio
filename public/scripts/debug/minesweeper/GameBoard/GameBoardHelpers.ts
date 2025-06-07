import Square, { SquaresArray } from "../Square/Square";
import GameBoard from "./GameBoard";


const GameBoardHelpers = {
    hideLastDugSquare() {
        this.lastDugSquare?.unRevealSquare();
    },
    flagLastDugSquare() {
        this.lastDugSquare?.flagSquare();
    },
    setBombsCount(bombsCount: number) {
        this.bombsPresent.value = bombsCount;
        this.gameUI.elementToInformUserBombCount.textContent = `// ${bombsCount}`;
    },
    toggleRevealStatusOfLastDugSquare() {
        if (!!this.lastDugSquare?.isRevealed) {
            this.lastDugSquare.unRevealSquare();
        } else {
            this.lastDugSquare.revealSquare();
        }
    },
    stopGameAutoplay() {
        this.autoplayRunning = false;
        clearInterval(this.autoplayIntervalToDigSquare);
    },
    chooseDifficulty(difficulty: typeof GameBoard.prototype.ALLOWED_DIFFICULTIES[number] = this.ALLOWED_DIFFICULTIES[0]) {
        this.difficulty = difficulty;
    },
    createRow(): SquaresArray {
        const row: SquaresArray = [];
        this.matrix.push(row);

        const rowElem = document.createElement('div');
        rowElem.classList.add('row');

        row.elem = rowElem;

        return row;
    },
    createRows(count: number): SquaresArray[] {
        const elemRows: HTMLDivElement[] = [];
        const rows: SquaresArray[] = [];

        for (let i = 0; i < count; i++) {
            const row = this.createRow();
            elemRows.push(row.elem);
            rows.push(row);
        }

        return rows;
    },
    createSquare([y, x]): Square {
        const square = new Square([y, x], this, this.gameUI);

        if (square.hasBomb) {
            this.bombsPresent.value++;
        }

        this.squaresInBoard++;

        return square;
    },
    createSquares(count: number, rowIndex: number): Square[] {
        const squares: Square[] = [];

        for (let i = 0; i < count; i++) {
            const square = this.createSquare([rowIndex, i]);
            squares.push(square);
        }

        return squares;
    },
    unwatchIfUserStartedGame() {
        this.watcherForUserInitiatedGame?.disconnect();
        this.watcherForUserInitiatedGame = null;
    },
    getSquareFromEvent(clickEvent: MouseEvent): Square {
        const clickedSquare = clickEvent.target as HTMLDivElement;
        const [Y, X] = clickedSquare.dataset.position.split('_').map(Number);
        return this.matrix[Y][X];
    },
}

export default GameBoardHelpers;