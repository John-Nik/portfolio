'use client';
import Canvas from '../../../../../../../public/scripts/debug/minesweeper-canvas/script';

declare global {
    var __minesweeper_canvas: Canvas | null;

    interface Window {
        minesweeper_canvas?: Canvas;
    }
}

function getCanvasElem() {
    const el = document.querySelector<HTMLCanvasElement>('#minesweeper-canvas');

    if (!el) {
        throw new Error('Canvas element not found: #minesweeper-canvas');
    }

    return el;
}

export function resetCanvas() {
    const canvasElem = getCanvasElem();

    const existing = globalThis.__minesweeper_canvas;

    // If the canvas element already has transferred control to a worker thread that we have access to,
    // Just reset the worker-side game.
    if (existing && existing.isForCanvas(canvasElem)) {
        existing.reset();
        return existing;
    }

    // If we have an instance but it's bound to a different element, hard-destroy it.
    if (existing) {
        existing.hardDestroy();
        globalThis.__minesweeper_canvas = null;
    }

    globalThis.__minesweeper_canvas = new Canvas(canvasElem);
    window.minesweeper_canvas = globalThis.__minesweeper_canvas;

    return globalThis.__minesweeper_canvas;
}

export function destroyCanvas() {
    // IMPORTANT: pause only (prevents React's StrictMode double-mount from re-transfer errors)
    globalThis.__minesweeper_canvas?.pause();
}
