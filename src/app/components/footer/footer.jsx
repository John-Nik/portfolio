import React from 'react';
import './footer.scss';
import CallIcon from '../icons-components/CallIcon.jsx';
import EmailIcon from '../icons-components/EmailIcon.jsx';
import GithubIcon from '../icons-components/GithubIcon.jsx';

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
            </ul>
        </footer>
    )
}