'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import './styling.scss';


export default function Header() {
    const pathname = usePathname();
    const [navMenuState, setNavMenuState] = useState(0);

    function triggerNavMenu() {
        setNavMenuState((navMenuState + 1) % 2);
    }

    
    function toggleMinesweeperOn() {
        const watchUserInput = document.querySelector('.minesweeper-homepage');
        watchUserInput.innerHTML = '<div></div>'
    }

    function toggleMinesweeperOff() {
        const watchUserInput = document.querySelector('.minesweeper-homepage');
        watchUserInput.innerHTML = '';
    }

    function startGame() {
        const container = document.querySelector('.container');
        const containerWidth = container.offsetWidth;
        const gameStart = document.querySelector('.user-initiated-game-start');
        const textContentWrapper = document.querySelector('.textContent');
        const gameControlPanel = document.querySelector('.gameSettings');
        const smileyFace = document.querySelector('.dead-smiley-wrapper');

        
        smileyFace.style.display = 'none';

        if (containerWidth >= 720) {
            textContentWrapper.style.opacity = '0';
            gameControlPanel.style.opacity = '0';
            setTimeout(() => {
                textContentWrapper.style.display = 'none';
                gameControlPanel.style.display = 'none';
            }, 500)
        }


        gameStart.innerHTML = '<div></div>';    
    }

    return (
        <header>
            <nav>
                <div className={'container'}>
                    <div className={'logo-container'}>
                        <span className={'logo'}>Giannis</span>
                    </div>

                    <div onClick={startGame} className={'dead-smiley-wrapper'}>
                        <img onClick={startGame} src='/icons/dead-smiley.png' />
                    </div>

                    <ul className={navMenuState === 1 ? 'open-menu' : ''}>
                        <li>
                            <Link href="/" onClick={toggleMinesweeperOn} className={pathname === '/' || '' ? 'activeLink' : ''}>home</Link>
                        </li>
                        <li>
                            <Link href="/about" onClick={toggleMinesweeperOff} className={pathname === '/about' ? 'activeLink' : ''}>aboutMe</Link>
                        </li>
                        <li>
                            <Link href="/portfolio" onClick={toggleMinesweeperOff} className={pathname.includes('/portfolio') ? 'activeLink' : ''}>portfolio</Link>
                        </li>
                        <li>
                            <Link href="/contact" onClick={toggleMinesweeperOff} className={pathname === '/contact' ? 'activeLink' : ''}>contactMe</Link>
                        </li>
                    </ul>
                    <div className={'burger-icon-wrapper'}>
                        <div className={`burger-icon ${navMenuState === 1 ? 'open-menu' : ''}`} onClick={triggerNavMenu} focusable>
                            <div className={'line1'}></div>
                            <div className={'line2'}></div>
                            <div className={'line3'}></div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}