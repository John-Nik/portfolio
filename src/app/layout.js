'use client'
import { ZCOOL_QingKe_HuangYou, Fira_Code, Press_Start_2P } from 'next/font/google';
import './global.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const zcoolFont = ZCOOL_QingKe_HuangYou({subsets: ['latin'], weight: ['400'], display: 'swap'})
const firaCodeFont = Fira_Code({subsets: ['latin'], preload: true, variable: '--fira-code', display: 'swap'})
const pressStartFont = Press_Start_2P({subsets: ['latin'], weight: ['400'], preload: true, variable: '--press-start-font', display: 'swap'})


export default function heads({children}) {
    const pathname = usePathname();
    const [navMenuState, setNavMenuState] = useState(0);

    function triggerNavMenu() {
        setNavMenuState((navMenuState + 1) % 2);
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
        <html lang="en" className={`${firaCodeFont.variable} ${pressStartFont.variable}`}>
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>

            <body className={zcoolFont.className}>
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
                                    <Link href="/" className={pathname === '/' || '' ? 'activeLink' : ''}>home</Link>
                                </li>
                                <li>
                                    <Link href="/" className={pathname === '/about' ? 'activeLink' : ''}>aboutMe</Link>
                                </li>
                                <li>
                                    <Link href="/" className={pathname.includes('/portfolio') ? 'activeLink' : ''}>portfolio</Link>
                                </li>
                                <li>
                                    <Link href="/" className={pathname === '/contact' ? 'activeLink' : ''}>contactMe</Link>
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
                {children}
            </body>
        </html>
    )
}