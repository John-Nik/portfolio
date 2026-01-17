import CanvasBoard from './Board';

export default class WorkerGame {
    lastFrameId: number | null = null;
    board: CanvasBoard;

    constructor(board: CanvasBoard) {
        this.board = board;
    }

    start() {
        if (this.lastFrameId !== null) return;

        this.drawNextFrame();
    }

    drawSquares() {
        this.clearCanvas();

        this.board.nonInteractedSquares.forEach(row => {
            row.forEach(square => {
                square.draw();
            });
        });

        this.board.interactedSquares.forEach(row => {
            row.forEach(square => {
                square.draw();
            });
        });

        const hasAnySquares = this.board.nonInteractedSquares.some(row => row.length > 0);

        if (hasAnySquares) return;

        const haveAllSquaresDropped = !this.board.interactedSquares.some(row => {
            return row.some(square => {
                return square.isFalling;
            });
        });

        if (!haveAllSquaresDropped) return;

        setTimeout(() => {
            this.cancelNextFrame();
        }, 0);
    }

    drawNextFrame() {
        this.drawSquares();

        this.lastFrameId = requestAnimationFrame(() => {
            this.drawNextFrame();
        });
    }

    clearCanvas() {
        const ctx = this.board.getCtx();
        const size = this.board.getGameElemSize();
        const { width, height } = size;

        ctx.clearRect(
            0,
            0,
            width,
            height,
        );
    }

    cancelNextFrame() {
        if (!this.lastFrameId) return;

        cancelAnimationFrame(this.lastFrameId);

        this.lastFrameId = null;
    }

    destroy() {
        this.cancelNextFrame();
        this.board.stopAutoplay?.();
    }
}
