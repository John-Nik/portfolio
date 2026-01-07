'use client';
import Content from './content';
import { useEffect } from 'react';
import { resetGame, destroyGame } from './gameManager';

export default function MinesweeperContainer() {
    useEffect(() => {
        resetGame();

        return () => {
            destroyGame();
        };
    }, []);

    return (
        <section
            data-minesweeper-container
            className="relative w-full h-full overflow-hidden [&_svg]:pointer-events-none"
        >
            <Content />

            <div
                className="relative gap-px grid bg-black w-full h-full overflow-hidden"
                id="game"
            />
        </section>
    );
}