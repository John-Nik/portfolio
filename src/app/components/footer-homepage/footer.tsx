'use client';
import './footer.scss';
import CallIcon from '../icons-components/CallIcon';
import EmailIcon from '../icons-components/EmailIcon';
import GithubIcon from '../icons-components/GithubIcon';
import SocialsIcon from '../icons-components/SocialsIcon';
import FlagIcon from '../icons-components/FlagIcon';
import { useEffect } from 'react';
import { ReactElement } from 'react';
import Link from 'next/link';

export default function Footer(): ReactElement {
    useEffect((): void => {
        const footer: HTMLElement = document.querySelector('#homepage-footer');
        const isSafari: boolean = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        if (isSafari) {
            footer.style.position = 'relative';
        }
    }, []);

    return ( 
        <footer id="homepage-footer">
            <div className="toggle-background" />
            
            <menu className="footer-links-container">
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
                <li className="phone-icon-wrapper">
                    <CallIcon />
                </li>
                <li className="email-icon-wrapper">
                    <EmailIcon />
                </li>
                <li className="github-icon-wrapper">
                    <GithubIcon link="https://www.github.com/John-Nik" />
                </li>
                <li className="socials-icon-wrap">
                    <SocialsIcon />
                </li>
                <li className="flag-icon-wrap">
                    <FlagIcon />
                </li>
            </menu>
        </footer>
    );
}