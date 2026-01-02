'use client';
import { usePathname } from 'next/navigation';
import { ReactNode, useCallback, useState } from 'react';
import { HeaderContext } from './HeaderContext';
import MobileHeader from './MobileHeader';
import TabletHeader from './TabletHeader';

interface Props {
    children?: ReactNode;
}

export default function Header({ children }: Props) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const routes = [
        {
            label: 'home',
            href: '/'
        },
        {
            label: 'aboutMe',
            href: '/about'
        },
        {
            label: 'portfolio',
            href: '/portfolio'
        },
        {
            label: 'contactMe',
            href: '/contact'
        }
    ];

    const isActive = useCallback((path: string): boolean => {
        const pathnameWithoutSlash = pathname.slice(1);

        if (pathnameWithoutSlash === '') {
            return path === '/';
        }

        return path.includes(pathnameWithoutSlash);
    }, [pathname]);

    function triggerNavMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <HeaderContext.Provider value={{ isMenuOpen, triggerNavMenu }}>
            <header className="top-0 z-50 sticky bg-shade-1 shadow-[0px_4px_4px_rgba(255,255,255,0.05)] px-4 py-2 w-full">
                <MobileHeader
                    routes={routes}
                    isActive={isActive}
                >
                    {children}
                </MobileHeader>

                <TabletHeader
                    routes={routes}
                    isActive={isActive}
                >
                    {children}
                </TabletHeader>
            </header>
        </HeaderContext.Provider>
    );
}
