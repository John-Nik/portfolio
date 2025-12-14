import './footer.scss';
import CallIcon from '../icons-components/CallIcon';
import EmailIcon from '../icons-components/EmailIcon';
import GithubIcon from '../icons-components/GithubIcon';
import Link from 'next/link';

export default function Footer({ className } : { className?: string }) {
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
            </ul>
        </footer>
    );
}