'use client'
import { ZCOOL_QingKe_HuangYou } from 'next/font/google';
import { Fira_Code } from 'next/font/google';
import './global.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const zcoolFont = ZCOOL_QingKe_HuangYou({subsets: ['latin'], weight: ['400'], display: 'swap'})
const firaCodeFont = Fira_Code({subsets: ['latin'], preload: true, variable: '--fira-code', display: 'swap'})


export default function heads({children}) {
    const pathname = usePathname();
    const [navMenuState, setNavMenuState] = useState(0);

    function triggerNavMenu() {
        setNavMenuState((navMenuState + 1) % 2);
    }

    return (
        <html lang="en" className={`${firaCodeFont.variable}`}>
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