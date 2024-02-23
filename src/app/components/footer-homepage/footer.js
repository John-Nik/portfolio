import React from 'react';
import './footer.scss';
import CallIcon from '../icons-components/CallIcon.js';
import EmailIcon from '../icons-components/EmailIcon.js';
import GithubIcon from '../icons-components/GithubIcon.js';
import SocialsIcon from '../icons-components/SocialsIcon.js';
import FlagIcon from '../icons-components/FlagIcon.js';

export default function Footer() {
    return ( 
        <footer>
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
                <li>
                    <CallIcon />
                </li>
                <li>
                    <EmailIcon />
                </li>
                <li>
                    <GithubIcon />
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