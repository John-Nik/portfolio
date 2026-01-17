/// <reference lib="webworker" />

import CanvasBoard from './Board';
import WorkerGame from './workerGame';
import Msg from './types/Msg';
import CssSize from './types/CssSize';

type SessionState = {
    board: CanvasBoard | null;
    game: WorkerGame | null;
    lastCanvas: OffscreenCanvas | null;
    lastSize: CssSize | null;
    flagBitmap: ImageBitmap | null;
};

function startNewSession(
    canvas: OffscreenCanvas,
    size: CssSize,
    flagBitmap: ImageBitmap | null
): SessionState {
    const board = new CanvasBoard(canvas, size);

    if (flagBitmap) {
        board.setFlagImage(flagBitmap);
    }

    const game = new WorkerGame(board);

    game.start();

    return {
        board,
        game,
        lastCanvas: canvas,
        lastSize: size,
        flagBitmap
    };
}

function destroyLastSession(state: SessionState): SessionState {
    state.game?.destroy();
    state.board?.destroy?.();

    return {
        ...state,
        board: null,
        game: null
    };
}

function handleMessage(state: SessionState, msg: Msg): SessionState {
    switch (msg.type) {
        case 'init': {
            destroyLastSession(state);
            return startNewSession(msg.canvas, msg, state.flagBitmap);
        }
        case 'resize': {
            if (!state.board) return state;

            const { width, height, dpr } = msg;

            state.board.setCanvasResolution(msg);

            return {
                ...state,
                lastSize: {
                    width,
                    height,
                    dpr
                }
            };
        }
        case 'reset': {
            const { lastCanvas, lastSize } = state;

            if (!lastCanvas || !lastSize) return state;

            destroyLastSession(state);

            return startNewSession(lastCanvas, lastSize, state.flagBitmap);
        }
        case 'flag': {
            if (state.board) {
                state.board.setFlagImage(msg.bitmap);
            }

            return {
                ...state,
                flagBitmap: msg.bitmap
            };
        }
        case 'pause': {
            return destroyLastSession(state);
        }
        case 'destroy': {
            const cleared = destroyLastSession(state);

            self.close();

            return cleared;
        }
        default:
            return state;
    }
}

const initialState = {
    board: null,
    game: null,
    lastCanvas: null,
    lastSize: null,
    flagBitmap: null,
};

let sessionState: SessionState = initialState;

self.onmessage = (e: MessageEvent<Msg>) => {
    sessionState = handleMessage(sessionState, e.data);
};
