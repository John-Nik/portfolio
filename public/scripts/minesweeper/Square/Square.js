import { sleep } from "../helpers";
import SquareHelpers from "./SquareHelpers";
class Square {
    constructor([y, x], gameBoard, gameUI) {
        this.isRevealed = false;
        this.hasBomb = false;
        this.isFlagged = false;
        this.flagSvg = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect x="0.666504" width="17" height="18" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_14_9231" transform="matrix(0.00827206 0 0 0.0078125 -0.0294118 0)"/></pattern><image id="image0_14_9231" width="128" height="128" xlink:href="data:image/png;base64,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"/></defs></svg>';
        this.position = [y, x];
        this.gameBoard = gameBoard;
        this.gameUI = gameUI;
        this.init();
        return this;
    }
    init() {
        this.hasBomb = Math.random() < this.gameBoard.difficulty;
        if (this.hasBomb) {
            this.gameBoard.bombsPresent.value++;
        }
        this.createElem();
    }
    createElem() {
        const square = document.createElement('div');
        const [y, x] = this.position;
        square.classList.add('square');
        square.dataset.position = `${y}_${x}`;
        this.elem = square;
    }
    individualDig() {
        const countedBombs = this.countSurroundingBombs();
        this.isRevealed = true;
        if (countedBombs === 0) {
            const surroundingSquares = this.getSurroundingSquares();
            surroundingSquares.forEach(square => square.digSquare());
        }
        else {
            this.displayBombCount(countedBombs);
        }
        this.gameBoard.bombsPresent.value++;
        this.elem.innerHTML = '';
    }
    floorRevealIfSafe() {
        const surroundingSquares = this.getSurroundingSquares();
        let countedBombs = 0;
        let flaggedSquares = 0;
        surroundingSquares.forEach(square => {
            if (square.hasBomb)
                countedBombs++;
            if (square.isFlagged)
                flaggedSquares++;
        });
        if (countedBombs === 0)
            return;
        if (countedBombs !== flaggedSquares) { // prevents a dig from happening, as it is assumed the user has accidentally clicked the square
            this.animateSquareBounce();
            return;
        }
        ;
        surroundingSquares.forEach(square => {
            if (!square.isFlagged && !square.isRevealed) {
                square.individualDig();
            }
        });
    }
    async digSquare() {
        if (this.isRevealed) {
            return;
        }
        if (!!this.gameBoard.mobileUserWantsToFlag) {
            this.toggleSquareFlag();
            return;
        }
        if (this.isFlagged) {
            this.unflagSquare();
            return;
        }
        if (this.hasBomb) {
            this.revealSquare();
            this.displayBombIcon();
            this.gameBoard.lostGame();
            this.gameUI.lostGame();
            await sleep(5, 'sec');
            this.unRevealSquare();
            this.flagSquare();
            return;
        }
        this.revealSquare();
        const countedBombs = this.countSurroundingBombs();
        if (countedBombs !== 0) {
            this.displayBombCount(countedBombs);
            return;
        }
        const surroundingSquares = this.getSurroundingSquares();
        surroundingSquares.forEach(square => {
            const countedBombs = square.countSurroundingBombs();
            if (countedBombs === 0 && !square.isFlagged) {
                square.digSquare();
                return;
            }
            if (square.isFlagged)
                return;
            square.displayBombCount(countedBombs);
            square.revealSquare();
        });
    }
    countSurroundingBombs() {
        const surroundingSquares = this.getSurroundingSquares();
        const bombsCounted = surroundingSquares.reduce((accum, current) => {
            return accum + (current.hasBomb ? 1 : 0);
        }, 0);
        return bombsCounted;
    }
    getSurroundingSquares() {
        const surroundingSquares = [];
        const [Y, X] = this.position;
        // check the 9 squares around the current square
        for (let i = -1; i <= 1; i++) {
            const row = this.gameBoard.matrix[Y + i];
            if (!row)
                continue; // skip if the row is out of bounds
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0)
                    continue; // skip the current square itself
                const square = row[X + j];
                if (!square)
                    continue; // skip if the square is out of bounds
                surroundingSquares.push(square);
            }
        }
        return surroundingSquares;
    }
    displayBombCount(count = this.countSurroundingBombs()) {
        this.elem.innerHTML = String(count);
        this.elem.classList.add(`B${count}`);
    }
    displayBombIcon() {
        this.elem.innerHTML = '<image src="/icons/bomb.svg" alt="">';
    }
}
Object.assign(Square.prototype, SquareHelpers);
export default Square;
