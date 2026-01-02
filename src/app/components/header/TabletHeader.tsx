import Link from 'next/link';
import { ReactNode } from 'react';

interface TabletHeaderProps {
    routes: {
        label: string;
        href: string;
    }[];
    isActive: (path: string) => boolean;
    children?: ReactNode;
}

export default function TabletHeader({ routes, isActive, children }: TabletHeaderProps) {
    return (
        <nav className="hidden lg:flex">
            <div className="flex justify-between items-center w-full h-full">
                <div className="relative flex items-center items-end">
                    <Link
                        href="/"
                        className="text-[clamp(3rem,5.6vw,3.625rem)] text-white hover:text-secondary-color leading-[0.9] tracking-[1px] -translate-y-0.5 cursor-pointer calm-fast"
                    >
                        Giannis
                    </Link>
                </div>

                {children}

                <menu
                    className="group left-0 relative flex flex-row justify-start gap-8 bg-linear-to-b from-[rgba(1,22,39,1)] to-[rgba(1,22,39,0.4)] backdrop-blur-xs w-fit overflow-hidden calm-slow"
                >
                    {
                        routes.map(({ label, href }, index) => (
                            <li
                                style={{
                                    transitionDelay: `${index * 60 + 50}ms`
                                }}
                                key={href}
                            >
                                <Link
                                    data-active={isActive(href)}
                                    href={href}
                                    className="text-[2.5rem] text-[clamp(1.5rem,3vw,1.813rem)] text-white data-[active=true]:text-tint-1 hover:text-secondary-color leading-none calm-fast"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))
                    }
                </menu>
            </div>
        </nav>
    );
}
