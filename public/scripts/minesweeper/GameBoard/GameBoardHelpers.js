import Square from "../Square/Square";
const GameBoardHelpers = {
    hideLastDugSquare() {
        this.lastDugSquare?.unRevealSquare();
    },
    flagLastDugSquare() {
        this.lastDugSquare?.flagSquare();
    },
    setBombsCount(bombsCount) {
        this.bombsPresent.value = bombsCount;
        this.gameUI.elementToInformUserBombCount.textContent = `// ${bombsCount}`;
    },
    toggleRevealStatusOfLastDugSquare() {
        if (!!this.lastDugSquare?.isRevealed) {
            this.lastDugSquare.unRevealSquare();
        }
        else {
            this.lastDugSquare.revealSquare();
        }
    },
    stopGameAutoplay() {
        this.autoplayRunning = false;
        clearInterval(this.autoplayIntervalToDigSquare);
    },
    chooseDifficulty(difficulty = this.ALLOWED_DIFFICULTIES[0]) {
        this.difficulty = difficulty;
    },
    createRow() {
        const row = [];
        this.matrix.push(row);
        const rowElem = document.createElement('div');
        rowElem.classList.add('row');
        return {
            row,
            rowElem,
        };
    },
    createRows(count) {
        const elemRows = [];
        const rows = [];
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
    createSquares(count, rowIndex) {
        const squares = [];
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
    getSquareFromEvent(clickEvent) {
        const clickedSquare = clickEvent.target;
        const [Y, X] = clickedSquare.dataset.position.split('_').map(Number);
        return this.matrix[Y][X];
    }
};
export default GameBoardHelpers;
