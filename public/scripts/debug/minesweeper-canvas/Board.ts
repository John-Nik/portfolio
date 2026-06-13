import { SQUARE_SIZE } from './constants/const';
import CanvasSquare from './Square';
import CssSize from './types/CssSize';

export default class CanvasBoard {
    matrix: CanvasSquare[][] = [];
    interactedSquares: CanvasSquare[][] = [];
    nonInteractedSquares: CanvasSquare[][] = [];

    resizeObserver: ResizeObserver | null = null;

    // CSS pixel size (sent from main thread)
    cssWidth = 0;
    cssHeight = 0;
    dpr = 1;
    initialCssWidth = 0;
    initialCssHeight = 0;

    canvas: OffscreenCanvas;
    ctx: OffscreenCanvasRenderingContext2D | null = null;

    width: number = 0;
    height: number = 0;

    FLAG_IMG: ImageBitmap | null = null;
    flagReady = false;

    autoplayInterval: null | ReturnType<typeof setTimeout> = null;

    constructor(canvas: OffscreenCanvas, initialSize: CssSize) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');

        this.setCanvasResolution(initialSize);
        this.initialCssWidth = this.cssWidth;
        this.initialCssHeight = this.cssHeight;
        this.populateBoard();
        this.beginAutoplay();
    }

    setFlagImage(bitmap: ImageBitmap) {
        this.FLAG_IMG = bitmap;
        this.flagReady = true;
    }

    beginAutoplay() {
        const timeBetweenPlays = 250; // In ms
    
        this.autoplayInterval = setInterval(() => {    
            const randomRow = this.getRandomRow();

            if (!randomRow) {
                this.stopAutoplay();
                return;
            }
            
            const colsCount = randomRow.length;
            const randomColIndex = Math.floor(Math.random() * colsCount);
            const randomSquare = randomRow[randomColIndex];
    
            randomSquare?.dig();
        }, timeBetweenPlays);
    }

    getRandomRow() {
        const rowsCount = this.nonInteractedSquares.length;

        let randomRowIndex = Math.floor(Math.random() * rowsCount);
        let randomRow = this.nonInteractedSquares[randomRowIndex];

        if (randomRow.length === 0) {
            for (let i = 0; i < rowsCount; i++) {
                randomRowIndex = (randomRowIndex + 1) % rowsCount;
                randomRow = this.nonInteractedSquares[randomRowIndex];
    
                if (randomRow.length !== 0) break;
            }
        }

        return randomRow.length === 0
            ? null
            : randomRow;
    }

    stopAutoplay() {
        if (!this.autoplayInterval) return;
        clearInterval(this.autoplayInterval);
    }

    setCanvasResolution({ width, height, dpr }: CssSize) {
        const ctx = this.getCtx();

        this.cssWidth = width;
        this.cssHeight = height;
        this.dpr = dpr || 1;

        this.canvas.width = Math.max(1, Math.floor(width * this.dpr));
        this.canvas.height = Math.max(1, Math.floor(height * this.dpr));

        ctx.setTransform(
            this.dpr, 0, 0,
            this.dpr, 0, 0
        );

        const normalizedHeight = height / 3;
        const rows = Math.floor(normalizedHeight / SQUARE_SIZE);
        const cols = Math.floor(width / SQUARE_SIZE);

        this.height = rows * SQUARE_SIZE;
        this.width = cols * SQUARE_SIZE;

        this.addResizeObserver({ width, height, dpr: this.dpr });
    }

    getNormalizedGameElemSize() {
        const { width, height } = this.getGameElemSize();

        return {
            width,
            height: height / 3  // The canvas is 3 times longer in height than the standard 800px of other sections
        };
    }

    populateBoard() {
        const rowsCount = this.countFittingRows();

        while (this.matrix.length < rowsCount) {
            this.appendRow();
        }
    }

    countFittingCols(width = this.getGameElemSize().width) {
        return Math.floor(width / SQUARE_SIZE);
    }

    countFittingRows(height = this.getNormalizedGameElemSize().height) {
        return Math.floor(height / SQUARE_SIZE);
    }

    getGameElemSize() {
        return {
            width: this.cssWidth,
            height: this.cssHeight
        };
    }

    getRowSquares(rowIndex: number) {
        return this.matrix[rowIndex];
    }

    getColSquares(colIndex: number) {
        return this.matrix.map(row => {
            return row[colIndex];
        });
    }

    addResizeObserver(size: CssSize) {
        const { width, height } = size;
        const targetCols = Math.floor(width / SQUARE_SIZE);
        const targetRows = Math.floor((height / 3) / SQUARE_SIZE);

        const currentCols = this.matrix[0]?.length ?? 0;
        const currentRows = this.matrix.length;

        if (width > this.initialCssWidth && targetCols > currentCols) {
            for (let i = currentCols; i < targetCols; i++) {
                this.appendCol();
            }
        }

        if (height > this.initialCssHeight && targetRows > currentRows) {
            for (let i = currentRows; i < targetRows; i++) {
                this.appendRow();
            }
        }
    }

    appendRow(updateLastRowSquares = false) {
        const newY = this.matrix.length;
        const lastRow = this.getRowSquares(newY - 1);

        const colsCount = lastRow?.length ?? this.countFittingCols();
        const newRow: CanvasSquare[] = [];

        for (let x = 0; x < colsCount; x++) {
            newRow.push(new CanvasSquare({ x, y: newY }, this));
        }

        this.matrix.push(newRow);
        this.nonInteractedSquares.push([...newRow]);

        if (updateLastRowSquares) {
            lastRow.forEach(square => {
                square.countSurroundingBombs();
            });
        }

        return newRow;
    }

    appendCol(updateLastColSquares = false) {
        const colSquares: CanvasSquare[] = [];

        let newX = this.matrix.at(-1)?.length;

        if (newX === undefined) {
            newX = this.appendRow().length;
        }

        const lastCol = this.getColSquares(newX - 1);

        this.matrix.forEach((row, index) => {
            const square = new CanvasSquare({
                x: newX,
                y: index
            }, this);

            row.push(square);

            if (!Array.isArray(this.nonInteractedSquares[index])) {
                this.nonInteractedSquares[index] = [];
            }
            this.nonInteractedSquares[index].push(square);

            colSquares.push(square);
        });

        if (updateLastColSquares) {
            lastCol.forEach(square => {
                square.countSurroundingBombs();
            });
        }


        return colSquares;
    }

    getCtx(): NonNullable<CanvasBoard['ctx']> {
        if (this.ctx === undefined || this.ctx === null) {
            throw new Error('No canvas context was found. Is the canvas element even present?');
        }

        return this.ctx;
    }

    stopResizeObserver() {
        if (!this.resizeObserver) return;
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
    }

    destroy() {
        this.stopAutoplay();
        this.stopResizeObserver();

        this.matrix = [];
        this.interactedSquares = [];
        this.nonInteractedSquares = [];

        this.resizeObserver = null;

        // CSS pixel size (sent from main thread)
        this.cssWidth = 0;
        this.cssHeight = 0;
        this.dpr = 1;
        this.initialCssWidth = 0;
        this.initialCssHeight = 0;

        this.ctx = null;

        this.width = 0;
        this.height = 0;

        this.FLAG_IMG = null;
        this.flagReady = false;

        this.autoplayInterval = null;
    }

    validateElem<T extends HTMLElement>(elem: T | null | undefined): asserts elem is T {
        if (!(elem instanceof HTMLElement)) {
            throw new Error('Element not valid');
        }
    }
}
