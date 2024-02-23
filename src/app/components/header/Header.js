'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import './styling.scss';
import { useEffect } from 'react';



export default function Header() {
    const pathname = usePathname();
    const [navMenuState, setNavMenuState] = useState(0);
    const router = useRouter();

    function triggerNavMenu() {
        setNavMenuState((navMenuState + 1) % 2);
    }

    useEffect(() => {
        console.log('change')
    }, [pathname])

    return (
        <header>
            <nav>
                <div className={'container'}>
                    <div className={'logo-container'}>
                        <span onClick={() => router.push('/')} className={'logo'}>Giannis</span>
                    </div>

                    <ul className={navMenuState === 1 ? 'open-menu' : ''}>
                        <li>
                            <Link href="/" className={pathname === '/' || '' ? 'activeLink' : ''}>home</Link>
                        </li>
                        <li>
                            <Link href="/about" className={pathname === '/about' ? 'activeLink' : ''}>aboutMe</Link>
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
    )
}