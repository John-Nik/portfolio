'use client';

import Game from '../../../../public/scripts/debug/minesweeper';

declare global {
     
    var __game: Game | undefined;
    interface Window {
        game?: Game;
    }
}

export function resetGame() {
    destroyGame();
    globalThis.__game = new Game();

    return globalThis.__game;
}

export function destroyGame() {
    globalThis.__game?.destroy();
    globalThis.__game = undefined;
}
