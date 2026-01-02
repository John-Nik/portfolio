import EmailIconLink from '../icons-components/EmailIconLink';
import GithubIconLink from '../icons-components/GithubIconLink';
import Link from 'next/link';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
    className?: string;
    children?: ReactNode;
}

export default function Footer({ className, children }: Props) {
    const liClasses = '*:flex-row *:relative *:flex *:nth-1:hidden *:nth-2:hidden *:pointer-events-all *:items-center md:*:after:flex md:*:after:bg-white md:*:after:opacity-60 md:*:after:w-0.5 md:*:last:after:hidden md:*:after:h-8 *:relative md:*:after:content-[\'\'] md:*:after:ml-4 md:*:after:rounded-full md:*:hidden md:*:nth-1:flex md:*:nth-2:flex md:*:nth-2:after:hidden';
    const linkClasses = '*:*:opacity-80 *:*:hover:opacity-100 *:*:text-white *:*:underline-offset-4 *:*:calm-fast *:*:pointer-events-auto';

    return (
        <footer className={twMerge(className, 'z-100 flex items-center w-full shadow-[0_0_3px_black] sticky bottom-0 bg-base-color/30 backdrop-blur-lg backdrop-brightness-70')}>
            <ul
                data-footer-links-container
                className={`md:last:after:hidden relative flex flex-row md:justify-start items-center gap-4 px-4 py-2 w-full h-full pointer-events-none calm-fast ${liClasses} ${linkClasses}`}
            >
                <li>
                    <Link href="mailto:nikolaou.giannis@yahoo.com?subject=Cool website">
                        nikolaou.giannis@yahoo.com
                    </Link>
                </li>

                <li className="h-6">
                    <Link href="https://www.github.com/John-Nik">
                        github.com/John-Nik
                    </Link>
                </li>

                <li className="h-6">
                    <EmailIconLink />
                </li>

                <li>
                    <GithubIconLink link="https://www.github.com/John-Nik" />
                </li>

                {children}
            </ul>
        </footer>
    );
}