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
            className="relative w-full h-full [&_svg]:pointer-events-none"
        >
            <Content />

            <div
                className="relative gap-px grid bg-black w-full h-full"
                id="game"
            />
        </section>
    );
}