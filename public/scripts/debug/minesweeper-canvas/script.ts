'use client';
import DestroyMsg from './types/DestroyMsg';
import FlagMsg from './types/FlagMsg';
import InitMsg from './types/InitMsg';
import PauseMsg from './types/PauseMsg';
import ResetMsg from './types/ResetMsg';
import ResizeMsg from './types/ResizeMsg';

export default class Canvas {
    worker: Worker;
    resizeObserver: ResizeObserver | null = null;
    canvasElem: HTMLCanvasElement;

    constructor(canvasElem: HTMLCanvasElement) {
        this.canvasElem = canvasElem;

        const offscreen = canvasElem.transferControlToOffscreen();

        this.worker = this.createWorker();

        this.postInitMsg({
            canvas: offscreen,
            width: canvasElem.clientWidth,
            height: canvasElem.clientHeight,
            dpr: window.devicePixelRatio || 1,
        });

        this.postFlagMsg();
        this.attachResizeObserver();
    }

    postInitMsg(params: Omit<InitMsg, 'type'>) {
        this.worker.postMessage({
            type: 'init',
            ...params
        }, [params.canvas]);
    }

    async postFlagMsg() {
        try {
            const bitmap = await this.loadFlagImg();
            if (!bitmap) return;

            const msg: FlagMsg = {
                type: 'flag',
                bitmap
            };

            this.worker.postMessage(msg, [bitmap]);
        } catch(error) {
            console.warn('[Canvas] Flag image failed to load', error);
        }
    }

    async loadFlagImg() {
        const img = new Image();

        img.src = '/icons/flag.svg';

        await img.decode();

        return createImageBitmap(img);
    }

    createWorker() {
        const minesweeperWorkerScript = new URL('./minesweeper.worker.ts', import.meta.url);

        return new Worker(minesweeperWorkerScript, { type: 'module' });
    }

    isForCanvas(elem: HTMLCanvasElement) {
        return this.canvasElem === elem;
    }

    reset() {
        this.postResetMsg();
        this.attachResizeObserver();
        this.postResizeMsg();
    }

    postResetMsg() {
        this.worker.postMessage({ type: 'reset' } satisfies ResetMsg);
    }

    /**
   * Use on React effect cleanup. Does NOT terminate the worker
   * (prevents StrictMode double-mount from breaking OffscreenCanvas transfer).
   */
    pause() {
        this.stopResizeObserver();
        this.postPauseMsg();
    }

    postPauseMsg() {
        this.worker.postMessage({ type: 'pause' } satisfies PauseMsg);
    }

    hardDestroy() {
        this.stopResizeObserver();
        this.postDestroyMsg();
        this.worker.terminate();
    }

    postDestroyMsg() {
        this.worker.postMessage({ type: 'destroy' } satisfies DestroyMsg);
    }

    stopResizeObserver() {
        this.resizeObserver?.disconnect();
        this.resizeObserver = null;
    }

    attachResizeObserver() {
        if (this.resizeObserver) return;

        this.resizeObserver = new ResizeObserver(() => {
            this.postResizeMsg();
        });

        this.resizeObserver.observe(this.canvasElem);
    }

    postResizeMsg() {
        const msg: ResizeMsg = {
            type: 'resize',
            width: this.canvasElem.clientWidth,
            height: this.canvasElem.clientHeight,
            dpr: window.devicePixelRatio || 1,
        };
        this.worker.postMessage(msg);
    }
}
