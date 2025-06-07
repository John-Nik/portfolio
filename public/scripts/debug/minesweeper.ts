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