'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ReactNode, useCallback, useState } from 'react';
import './styling.scss';

interface Props {
    children?: ReactNode;
}

export default function Header({ children }: Props) {
    const pathname = usePathname();
    const [navMenuState, setNavMenuState] = useState(0);

    const isMenuOpen = useCallback(() => {
        return navMenuState === 1 ? 'open-menu' : '';
    }, [navMenuState]);

    const activeClassFor = useCallback((path: string, includes = false): 'activeLink' | '' => {
        const pathnameWithoutSlash = pathname.slice(1);

        if (includes) {
            return pathnameWithoutSlash.includes(path) ? 'activeLink' : '';
        }
        return pathnameWithoutSlash === path ? 'activeLink' : '';
    }, [pathname]);

    function triggerNavMenu(): void {
        setNavMenuState((navMenuState + 1) % 2);
    }

    return (
        <header>
            <nav>
                <div className="container">
                    <div className="logo-container">
                        <Link
                            href="/"
                            className="logo"
                        >
                            Giannis
                        </Link>
                    </div>

                    {children}

                    <menu className={isMenuOpen()}>
                        <li>
                            <Link
                                href="/"
                                className={activeClassFor('')}
                            >
                                home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className={activeClassFor('about')}
                            >
                                aboutMe
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/portfolio"
                                className={activeClassFor('portfolio', true)}
                            >
                                portfolio
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className={activeClassFor('contact')}
                            >
                                contactMe
                            </Link>
                        </li>
                    </menu>

                    <div className="burger-icon-wrapper">
                        <div
                            className={`burger-icon ${isMenuOpen()}`}
                            onClick={triggerNavMenu}
                        >
                            <div className="line1" />
                            <div className="line2" />
                            <div className="line3" />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}