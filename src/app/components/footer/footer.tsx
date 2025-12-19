import './footer.scss';
import EmailIcon from '../icons-components/EmailIcon';
import GithubIcon from '../icons-components/GithubIcon';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
    className?: string;
    children?: ReactNode;
}

export default function Footer({ className, children }: Props) {
    return ( 
        <footer className={className}>
            <div className="toggle-background" />

            <ul className="footer-links-container">
                <li>
                    <Link href="mailto:nikolaou.giannis@yahoo.com?subject=Cool website">
                        nikolaou.giannis@yahoo.com
                    </Link>
                </li>
                <li>
                    <Link href="https://www.github.com/John-Nik">
                        github.com/John-Nik
                    </Link>
                </li>
                <li>
                    <EmailIcon />
                </li>
                <li>
                    <GithubIcon link="https://www.github.com/John-Nik" />
                </li>

                {children}
            </ul>
        </footer>
    );
}