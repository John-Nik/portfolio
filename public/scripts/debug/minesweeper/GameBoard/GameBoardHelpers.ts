import Square from "../Square/Square";
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
    createRow(): {row: Square[]; rowElem: HTMLDivElement; } {
        const row: Square[] = [];
        this.matrix.push(row);

        const rowElem = document.createElement('div');
        rowElem.classList.add('row');

        return {
            row,
            rowElem,
        };
    },
    createRows(count: number): { rows: Square[][]; elemRows: HTMLDivElement[]; } {
        const elemRows: HTMLDivElement[] = [];
        const rows: Square[][] = [];

        for (let i = 0; i < count; i++) {
            const { row, rowElem } = this.createRow();
            elemRows.push(rowElem);
            rows.push(row);
        }

        return {
            rows,
            elemRows,
        };
    },
    createSquares(count: number, rowIndex: number): Square[] {
        const squares: Square[] = [];

        for (let i = 0; i < count; i++) {
            const square = new Square([rowIndex, i], this, this.gameUI);
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
    }
}

export default GameBoardHelpers;