import Link from 'next/link';
import { ReactNode } from 'react';
import { useHeaderContext } from './HeaderContext';

interface MobileHeaderProps {
    routes: {
        label: string;
        href: string;
    }[];
    isActive: (path: string) => boolean;
    children?: ReactNode;
}

export default function MobileHeader({ routes, isActive, children }: MobileHeaderProps) {
    const { isMenuOpen, triggerNavMenu } = useHeaderContext();

    return (
        <nav className="lg:hidden">
            <div className="flex justify-between items-center w-full h-full">
                <div className="relative flex items-center">
                    <Link
                        href="/"
                        className="text-[clamp(2.5rem,5.6vw,3.625rem)] text-white hover:text-secondary-color leading-[0.8] tracking-[1px] cursor-pointer calm-fast"
                    >
                        Giannis
                    </Link>
                </div>

                {children}

                <div className="flex justify-end items-center w-fit h-fit overflow-hidden">
                    <div
                        className="group relative w-[40px] h-[30px]"
                        data-open={isMenuOpen}
                        onClick={triggerNavMenu}
                    >
                        <div className="top-0 group-data-[open=true]:top-1/2 left-0 absolute bg-white w-full h-[2px] group-data-[open=true]:-rotate-45 group-data-[open=true]:-translate-y-1/2 calm" />
                        <div className="top-1/2 left-0 absolute bg-white group-data-[open=true]:opacity-0 w-full h-[2px] calm" />
                        <div className="bottom-0 group-data-[open=true]:bottom-1/2 left-0 absolute bg-white w-full h-[2px] group-data-[open=true]:rotate-45 group-data-[open=true]:translate-y-1/2 calm" />
                    </div>
                </div>
            </div>

            <menu
                className="group left-0 fixed flex flex-col justify-start gap-4 bg-linear-to-b from-[rgba(1,22,39,1)] to-[rgba(1,22,39,0.4)] data-[open=true]:opacity-100 backdrop-blur-xs w-full data-[open=false]:h-0 data-[open=true]:h-dvh overflow-hidden calm-slow"
                data-open={isMenuOpen}
            >
                {
                    routes.map(({ label, href }, index) => (
                        <li
                            className="group flex justify-center group-data-[open=true]:justify-center opacity-0 group-data-[open=true]:opacity-100 h-fit group-data-[open=true]:h-fit calm-fast"
                            style={{
                                transitionDelay: `${index * 60 + 50}ms`
                            }}
                            key={href}
                        >
                            <Link
                                data-active={isActive(href)}
                                href={href}
                                className="text-[2.5rem] data-[active=false]:text-white data-[active=true]:text-tint-1 md:text-[clamp(1.5rem,3vw,1.813rem)] group-hover:text-secondary-color calm-fast"
                            >
                                {label}
                            </Link>
                        </li>
                    ))
                }
            </menu>
        </nav>
    );
}
