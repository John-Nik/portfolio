import Game from '../../minesweeper';
import GameBoard from '../GameBoard/GameBoard';
import GameUI from '../GameUI/GameUI';
import { sleep } from '../helpers';
import { Cords } from '../types/Cords';

export type SquaresArray = Square[] & {
    elem?: HTMLDivElement;
};

class Square {
    isRevealed: boolean = false;
    hasBomb: boolean = false;
    isFlagged: boolean = false;
    flagSvg: string = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect x="0.666504" width="17" height="18" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_14_9231" transform="matrix(0.00827206 0 0 0.0078125 -0.0294118 0)"/></pattern><image id="image0_14_9231" width="128" height="128" xlink:href="data:image/png;base64,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"/></defs></svg>';


    position: Cords;
    elem: HTMLDivElement | undefined;
    game: Game | null = null;
    isBeingDestroyed: boolean = false;

    constructor(
        [y, x]: Cords,
        game: Game
    ) {
        this.position = [y, x];
        this.game = game;

        this.init();

        return this;
    }

    init() {
        this.validateGameBoardExists();

        this.hasBomb = Math.random() < this.game.board.difficulty;
        this.createElem();
    }

    createElem() {
        const square = document.createElement('div');
        const [y, x] = this.position;

        square.classList.add('square');
        square.dataset.position = `${y}_${x}`;
        this.elem = square;
    }

    /**
     * Only allows to dig surrounding squares if the number of flags around the square equal the amount of bombs surrounding the square
     */
    revealSurroundingSquaresIfAllowed() {
        const surroundingSquares = this.getSurroundingSquares();
        let countedBombs = 0;
        let flaggedSquares = 0;

        surroundingSquares.forEach(square => {
            if (square.hasBomb) countedBombs++;
            if (square.isFlagged) flaggedSquares++;
        });

        if (countedBombs === 0) return;

        // Prevents a dig from happening, as it is assumed the user has accidentally clicked the square
        if (countedBombs !== flaggedSquares) {
            this.animateSquareBounce();
            return;
        }

        surroundingSquares.forEach(square => {
            if (square.isFlagged) return;
            if (square.isRevealed) return;
            square.digSquare();
        });
    }

    async digSquare() {
        if (this.isRevealed) {
            this.revealSurroundingSquaresIfAllowed();
            return;
        }

        if (this.mobileUserWantsToFlag()) {
            this.toggleSquareFlag();
            return;
        }

        if (this.isFlagged) {
            this.unflagSquare();
            return;
        }

        if (this.hasBomb) {
            await this.handleDigSquareWithBomb();
            return;
        }

        this.revealSquare();

        const surroundingBombs = this.countSurroundingBombs();

        if (surroundingBombs !== 0) {
            this.displayBombCount(surroundingBombs);
            return;
        }

        this.revealSurroundingSquares();
    }

    mobileUserWantsToFlag() {
        this.validateGameBoardExists();
        return this.game.board.mobileUserWantsToFlag;
    }

    revealSurroundingSquares() {        
        const surroundingSquares = this.getSurroundingSquares();
        
        surroundingSquares.forEach(square => {
            if (square.isFlagged) return;

            const surroundingBombs = square.countSurroundingBombs();

            if (surroundingBombs === 0) {
                square.digSquare();
                return;
            }

            square.displayBombCount(surroundingBombs);
            square.revealSquare();
        });
    }

    async handleDigSquareWithBomb() {
        this.validateGameBoardExists();
        this.validateGameUIExists();

        this.revealSquare();
        this.displayBombIcon();

        this.game.board.lostGame();
        this.game.ui.lostGame();

        if (await this.sleepAndCheckDestroyed(5000)) return;

        this.unRevealSquare();
        this.flagSquare();
    }

    countSurroundingBombs(): number {
        const surroundingSquares = this.getSurroundingSquares();
    
        const bombsCounted = surroundingSquares.reduce((accum, current) => {
            return accum + (current.hasBomb ? 1 : 0);
        }, 0);
    
        return bombsCounted;
    }
 
    getSurroundingSquares(): Square[] {
        this.validateGameBoardExists();

        const surroundingSquares: Square[] = [];
        const [Y, X] = this.position;

        // Check the 9 squares around the current square
        for (let i = -1; i <= 1; i++) {
            const row = this.game.board.matrix[Y + i];
            if (!row) continue; // Skip if the row is out of bounds. Happens on the border of the board

            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue; // Skip the current square itself

                const square = row[X + j];
                if (!square) continue; // Skip if the square is out of bounds. Happens on the boarder of the board

                surroundingSquares.push(square);
            }
        }
    
        return surroundingSquares;
    }

    validateElemExists(): asserts this is { elem: HTMLDivElement } {
        if (this.elem === undefined) {
            throw new Error('Square HTML element is not defined.');
        }
    }

    displayBombCount(count = this.countSurroundingBombs()) {
        this.validateElemExists();

        this.elem.innerHTML = String(count);
        this.elem.classList.add(`b${count}`);
    }

    displayBombIcon() {
        this.validateElemExists();

        this.elem.innerHTML = '<image src="/icons/bomb.svg" alt="">';
    }

    animateSquareBounce() {
        this.validateElemExists();

        this.elem.animate([
            { scale: '0.9' },
            { scale: '1' }
        ], {
            duration: 250,
            iterations: 1,
            easing: 'ease-in-out',
        });
    };

    flagSquare() {
        this.validateElemExists();
        this.validateGameBoardExists();

        this.isFlagged = true;
        this.game.board.bombsPresent.value--;
        this.game.board.squaresInteractedWith++;
        this.elem.innerHTML = this.flagSvg;
    };

    toggleSquareFlag() {
        this.validateGameBoardExists();

        if (this.isRevealed) return;

        if (this.isFlagged) {
            this.unflagSquare();
        } else {
            this.flagSquare();
        }

        this.game.board.checkIfGameIsFinished();
    };

    unflagSquare() {
        this.validateElemExists();
        this.validateGameBoardExists();

        this.isFlagged = false;
        this.game.board.bombsPresent.value++;
        this.game.board.squaresInteractedWith--;
        this.elem.innerHTML = '';
    };

    revealSquare() {
        this.validateElemExists();
        this.validateGameBoardExists();

        this.isRevealed = true;
        this.game.board.squaresInteractedWith++;
        this.elem.classList.replace('square', 'revealed-square');
    };

    unRevealSquare() {
        this.validateElemExists();
        this.validateGameBoardExists();

        this.isRevealed = false;
        this.game.board.squaresInteractedWith--;
        this.elem.classList.replace('revealed-square', 'square');
        this.elem.innerHTML = '';
    };

    toggleSquareReveal() {
        if (this.isRevealed) {
            this.unRevealSquare();
        } else {
            this.revealSquare();
        }
    }

    async sleepAndCheckDestroyed(ms: number) {
        await sleep(ms);
        return this.isBeingDestroyed;
    }

    validateGameIsLinked(): asserts this is Square & { game: Game } {
        if (!this.game) { 
            throw new Error('Game is not linked with square');
        }
    }

    validateGameBoardExists(): asserts this is Square & { game: Game & { board: GameBoard } } {
        this.validateGameIsLinked();

        if (!this.game.board) { 
            throw new Error('Game board is not instantiated');
        }
    }

    validateGameUIExists(): asserts this is Square & { game: Game & { ui: GameUI } } {
        this.validateGameIsLinked();

        if (!this.game.ui) { 
            throw new Error('Game UI is not instantiated');
        }
    }
}

export default Square;