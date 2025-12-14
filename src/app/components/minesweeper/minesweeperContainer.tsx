'use client';
import Content from './content';
import './styling.scss';
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
        <section id="minesweeper-container">
            <Content />

            <div id="game" />
        </section>
    );
}