'use client';
import React from 'react';
import './footer.scss';
import CallIcon from '../icons-components/CallIcon.jsx';
import EmailIcon from '../icons-components/EmailIcon.jsx';
import GithubIcon from '../icons-components/GithubIcon.jsx';
import { useEffect } from 'react';

export default function Footer() {

    function getFooterHeight() {
        const footer = document.querySelector('footer');
        return footer.offsetHeight;
    }

    function changeFooterPosition() {
        const footer = document.querySelector('footer');

        footer.style.top = `calc(${window.innerHeight}px - ${getFooterHeight()}px)`;
    }

    useEffect(() => {
        const footer = document.querySelector('footer');
        
        footer.style.top = `calc(${window.innerHeight}px - ${getFooterHeight()}px)`;

        window.addEventListener('scroll', changeFooterPosition)
        window.addEventListener('resize', changeFooterPosition)

        return (() => {
            window.removeEventListener('scroll', changeFooterPosition);
            window.removeEventListener('resize', changeFooterPosition);
        })

    }, [])


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
                    <GithubIcon link={'https://www.github.com/John-Nik'} />
                </li>
            </ul>
        </footer>
    )
}