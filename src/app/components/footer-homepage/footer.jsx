'use client';
import './footer.scss';
import CallIcon from '../icons-components/CallIcon.jsx';
import EmailIcon from '../icons-components/EmailIcon.jsx';
import GithubIcon from '../icons-components/GithubIcon.jsx';
import SocialsIcon from '../icons-components/SocialsIcon.jsx';
import FlagIcon from '../icons-components/FlagIcon.jsx';
import { useEffect } from 'react';

export default function Footer() {
    useEffect(() => {
        const footer = document.querySelector('#homepage-footer');
        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        if (isSafari) {
            footer.style.position = 'relative';
        }
    }, [])

    return ( 
        <footer id={'homepage-footer'}>
            <div className={'toggle-background'}>

            </div>
            <ul className={'footer-links-container'}>
                <li>
                    <a href={'tel:0035799475294'}>+357 99475294</a>
                </li>
                <li>
                    <a href={'mailto:nikolaou.giannis@yahoo.com?subject=Cool website'}>nikolaou.giannis@yahoo.com</a>
                </li>
                <li>
                    <a href={'https://www.github.com/John-Nik'}>github.com/John-Nik</a>
                </li>
                <li className={'phone-icon-wrapper'}>
                    <CallIcon />
                </li>
                <li className={'email-icon-wrapper'}>
                    <EmailIcon />
                </li>
                <li className={'github-icon-wrapper'}>
                    <GithubIcon link={'https://www.github.com/John-Nik'} />
                </li>
                <li className={'socials-icon-wrap'}>
                    <SocialsIcon />
                </li>
                <li className={'flag-icon-wrap'}>
                    <FlagIcon />
                </li>
            </ul>
        </footer>
    )
}