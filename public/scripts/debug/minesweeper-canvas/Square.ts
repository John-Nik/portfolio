import CanvasBoard from './Board';
import { SQUARE_SIZE } from './constants/const';
import { Cords } from './types/Cords';

export default class CanvasSquare {
    isRevealed: boolean = false;
    isFlagged: boolean = false;
    isFalling: boolean = false;
    surroundingBombsCount: number = 0;

    dropStartMs = 0;
    dropDurationMs = 0;
    dropY = 0;
    dropRot = 0;
    dropFromY = 0;
    dropToY = 0;
    dropFromRot = 0;
    dropToRot = 0;

    readonly hasBomb: boolean;
    readonly pos: Cords;
    readonly board: CanvasBoard;

    constructor(position: Cords, board: CanvasBoard) {
        this.isRevealed = false;
        this.isFlagged = false;

        this.pos = position;
        this.board = board;
        
        this.hasBomb = Math.random() < 0.3;
    }

    draw() {
        const ctx = this.getCtx();

        ctx.save();

        this.applyDropTransform();

        this.drawFill();
        this.drawBorders();

        if (this.isRevealed) {
            this.displayBombsCount();
            ctx.restore();
            return;
        };

        if (this.isFlagged) {
            this.drawFlag();
        };

        this.drawLighting();
        this.drawShadows();

        ctx.restore();
    }

    applyDropTransform(ctx: OffscreenCanvasRenderingContext2D = this.getCtx()) {
        const now = performance.now();
        const { yOffset, rotation } = this.getDropTransform(now);

        const { topLeftCorner } = this.getSquareCorners();
        const cx = topLeftCorner.x + SQUARE_SIZE / 2;
        const cy = topLeftCorner.y + SQUARE_SIZE / 2;

        ctx.translate(0, yOffset);
        ctx.translate(cx, cy);
        ctx.rotate(rotation);
        ctx.translate(-cx, -cy);
    }

    getSquareCorners() {
        const topLeftCorner: Cords = {
            x: SQUARE_SIZE * (this.pos.x),
            y: SQUARE_SIZE * (this.pos.y)
        };
        const bottomRightCorner: Cords = {
            x: topLeftCorner.x + SQUARE_SIZE,
            y: topLeftCorner.y + SQUARE_SIZE
        };

        return {
            topLeftCorner,
            bottomRightCorner
        };
    }

    drawBorders() {
        const ctx = this.getCtx();

        const { topLeftCorner } = this.getSquareCorners();

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.strokeRect(
            topLeftCorner.x,
            topLeftCorner.y,
            SQUARE_SIZE,
            SQUARE_SIZE,
        );
    }

    drawFill() {
        const ctx = this.getCtx();

        const { topLeftCorner } = this.getSquareCorners();

        ctx.fillStyle = 'rgb(1, 14, 24)';
        ctx.fillRect(
            topLeftCorner.x,
            topLeftCorner.y,
            SQUARE_SIZE,
            SQUARE_SIZE,
        );
    }

    drawLighting() {
        const ctx = this.getCtx();

        const {
            topLeftCorner
        } = this.getSquareCorners();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(
            topLeftCorner.x,
            topLeftCorner.y,
            SQUARE_SIZE,
            2
        );
        ctx.fillRect(
            topLeftCorner.x,
            topLeftCorner.y,
            2,
            SQUARE_SIZE
        );
    }

    drawShadows() {
        const ctx = this.getCtx();

        const {
            bottomRightCorner
        } = this.getSquareCorners();

        ctx.fillStyle = 'rgba(3, 3, 3, 0.4)';
        ctx.fillRect(
            bottomRightCorner.x - SQUARE_SIZE,
            bottomRightCorner.y - 2,
            SQUARE_SIZE,
            2
        );
        ctx.fillRect(
            bottomRightCorner.x - 2,
            bottomRightCorner.y - SQUARE_SIZE,
            2,
            SQUARE_SIZE
        );
    }

    drawFlag() {
        const ctx = this.getCtx();
        const { x, y } = this.getCenter();
        const img = this.board.FLAG_IMG;

        if (!this.board.flagReady) return;
        if (!this.validateImageIsValid(img)) return;

        const flagSize = SQUARE_SIZE / 1.5;

        ctx.drawImage(
            img,
            x - SQUARE_SIZE / 3,
            y - SQUARE_SIZE / 3,
            flagSize,
            flagSize
        );
    }

    validateImageIsValid(img: typeof this.board.FLAG_IMG): img is ImageBitmap {
        return img !== null;
    }

    dig() {
        if (this.isRevealed || this.isFlagged) return;

        this.drop();
        
        this.moveSquareFromNonInteractedToInteractedMatrix();
        
        if (this.hasBomb) {
            this.flag();
            return;
        }

        this.isRevealed = true;

        const surroundingSquares = this.getNeighborSquares();
        const surroundingBombs = this.countSurroundingBombs(surroundingSquares);
        
        if (surroundingBombs === 0) {
            this.digNeighborSquares(surroundingSquares);
            return;
        }
    }

    digNeighborSquares(squares: CanvasSquare[] = this.getNeighborSquares()) {
        squares.forEach(square => {
            if (square.isFlagged || square.isRevealed) return;
            
            square.dig();
        });
    }

    moveSquareFromNonInteractedToInteractedMatrix() {
        const { x, y } = this.pos;

        const row = this.board.nonInteractedSquares[y];
        if (!row) return;

        const squareIndex = row.findIndex(square => {
            return square === this;
        });
        if (squareIndex === -1) return;

        const [square] = row.splice(squareIndex, 1);
        if (!square) return;

        if (!Array.isArray(this.board.interactedSquares[y])) {
            this.board.interactedSquares[y] = [];
        }

        this.board.interactedSquares[y][x] = square;
    }

    flag() {
        this.isFlagged = true;
    }

    getCenter(): Cords {
        const {
            topLeftCorner,
            bottomRightCorner
        } = this.getSquareCorners();
        
        return {
            x: (topLeftCorner.x + bottomRightCorner.x) / 2,
            y: (topLeftCorner.y + bottomRightCorner.y) / 2,
        };
    }

    getNeighborSquares() {
        const squares: CanvasSquare[] = [];

        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dy === 0 && dx === 0) continue;

                const y = this.pos.y + dy;
                const x = this.pos.x + dx;

                const sq = this.board.matrix[y]?.[x];
                if (sq) squares.push(sq);
            }
        }

        return squares;
    }

    countSurroundingBombs(squares: CanvasSquare[] = this.getNeighborSquares()) {
        this.surroundingBombsCount = squares.reduce((accum, current) => {
            return accum + Number(current.hasBomb);
        }, 0);

        return this.surroundingBombsCount;
    }

    displayBombsCount() {
        const ctx = this.getCtx();
        const { x, y } = this.getCenter();

        const colorBasedOnBombsCount: Record<number, string> = {
            1: '#26D980',
            2: '#62D926',
            3: '#269DD9',
            4: '#4426D9',
            5: '#D926D9',
            6: '#D9BB26',
            7: '#D98026',
            8: '#D92644',
        };

        ctx.font = `${SQUARE_SIZE / 1.5}px Arial`;
        ctx.fillStyle = colorBasedOnBombsCount[this.surroundingBombsCount];
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillText(`${this.surroundingBombsCount}`, x, y);
    }

    drop() {
        if (this.isFalling) return;

        this.isFalling = true;

        this.dropFromY = this.dropY;
        this.dropFromRot = this.dropRot;

        const { height } = this.board.getNormalizedGameElemSize();

        const extraY = this.rand(height * 1, height * 2);

        const spins = this.rand(-3, 3) * Math.PI * 2;

        this.dropToY = this.dropFromY + extraY;
        this.dropToRot = this.dropFromRot + spins;

        this.dropDurationMs = 5000;
        this.dropStartMs = performance.now();
    }

    getDropTransform(nowMs: number) {
        if (!this.isFalling) {
            return {
                yOffset: this.dropY,
                rotation: this.dropRot
            };
        }

        const tRaw = (nowMs - this.dropStartMs) / this.dropDurationMs;
        const t = Math.max(0, Math.min(1, tRaw));

        const eased = this.easeOutCubic(t);

        this.dropY = this.lerp(this.dropFromY, this.dropToY, eased);
        this.dropRot = this.lerp(this.dropFromRot, this.dropToRot, eased);

        if (t >= 1) {
            this.isFalling = false; // Stays at final offset/rotation
            this.dropY = this.dropToY;
            this.dropRot = this.dropToRot;
        }

        return {
            yOffset: this.dropY,
            rotation: this.dropRot
        };
    }

    lerp(a: number, b: number, t: number) {
        return a + (b - a) * t;
    }

    rand(min: number, max: number) {
        return min + Math.random() * (max - min);
    }

    easeOutCubic(t: number) {
        return 1 - Math.pow(1 - t, 3);
    }

    getCtx(): NonNullable<CanvasBoard['ctx']> {
        if (this.board.ctx === undefined || this.board.ctx === null) {
            throw new Error('No canvas context was found. Is the canvas element even present?');
        }

        return this.board.ctx;
    }
}
