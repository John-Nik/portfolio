import './footer.scss';
import CallIcon from '../icons-components/CallIcon';
import EmailIcon from '../icons-components/EmailIcon';
import GithubIcon from '../icons-components/GithubIcon';
import { ReactElement } from 'react';
import Link from 'next/link';

export default function Footer({ className } : { className?: string }): ReactElement {
    return ( 
        <footer className={className}>
            <div className="toggle-background" />

            <ul className="footer-links-container">
                <li>
                    <Link href="tel:0035799475294">
                        +357 99475294
                    </Link>
                </li>
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
                    <CallIcon />
                </li>
                <li>
                    <EmailIcon />
                </li>
                <li>
                    <GithubIcon link="https://www.github.com/John-Nik" />
                </li>
            </ul>
        </footer>
    );
}