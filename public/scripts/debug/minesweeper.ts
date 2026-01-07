import GameBoard from './minesweeper/GameBoard/GameBoard';
import GameUI from './minesweeper/GameUI/GameUI';

class Game {
    readonly ALLOWED_DIFFICULTIES: number[] = [0.12, 0.15, 0.20, 0.25];

    board: GameBoard | null = null;
    ui: GameUI | null = null;
    isUserPlaying: boolean = false;

    abort = new AbortController();

    constructor() {
        this.board = new GameBoard(this);
        this.ui = new GameUI(this);

        this.init();
    }

    init() {
        this.validateUI();
        this.validateBoard();

        this.board.init();
        this.ui.init();

        if (!this.ui.flagIcon) {
            throw new Error('Flag icon element is not found. Is the UI initialized?');
        }

        this.ui.flagIcon.addEventListener('click', () => {
            const newValue = this.board.mobileUserWantsToFlag + 1;
            this.board.mobileUserWantsToFlag = newValue % 2 as 0 | 1;
        }, { signal: this.abort.signal });

        this.board.chooseDifficulty(this.ALLOWED_DIFFICULTIES[0]);
    }

    chooseDifficulty() {
        this.validateBoard();
        this.validateUI();

        const currentDifficulty = this.ui.currentlyChosenDifficulty();
        this.board.chooseDifficulty(this.ALLOWED_DIFFICULTIES[currentDifficulty]);
    }

    start() {
        this.validateBoard();
        this.validateUI();

        this.board.startGame();
        this.ui.startGame();

        this.isUserPlaying = true;
    }

    validateUI(): asserts this is Game & { ui: GameUI } {
        if (this.ui === null) {
            throw new Error('UI is not instantiated');
        }
    }

    validateBoard(): asserts this is Game & { board: GameBoard } {
        if (this.board === null) {
            throw new Error('Game board is not instantiated');
        }
    }

    destroy() {
        this.abort.abort();

        this.ui?.destroy();
        this.board?.destroy();

        this.board = null;
        this.ui = null;
    }
}

export default Game;