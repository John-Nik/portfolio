'use client'
import DownloadCVButton from "@/app/components/buttons/DownloadCVButton";
import CallIcon from "@/app/components/icons-components/CallIcon";
import EmailIcon from "@/app/components/icons-components/EmailIcon";
import GithubIcon from "@/app/components/icons-components/GithubIcon";
import './styling.scss';
import { useEffect } from "react";

export default function Sidebar() {
    // useEffect(() => {
    //     const aside = document.querySelector('aside');
    //     const main = document.querySelector('.main-content-container');

        
    //     setAsideHeight();
    //     function setAsideHeight() {
    //         if (aside.offsetHeight < main.offsetHeight) {
    //             const mainHeight = main.offsetHeight;
    //             aside.style.height = `${mainHeight}px`;
    //         } else if (window.innerWidth < 800) {
    //             aside.style.height = 'calc(100dvh - 90px)'
    //         } else if (window.innerWidth < 700) {
    //             aside.style.height = 'calc(100dvh - 64px)'
    //         } else {
    //             aside.style.height = 'calc(100dvh - 90px)'
    //         }
    //     }

    //     window.addEventListener('resize', setAsideHeight);
    // }, [])


    return (
        <aside id={'sidebar'}>
        <div className="container">
            <div className={'download-cv-button-container'}>
                <DownloadCVButton />
            </div>
            <div className={'contact-info-container'}>
                <ul className={'contact-info-wrapper'}>
                    <li className={'contact'}>
                        <CallIcon />
                        <a className={'call-link'} href={'tel:0035799475294'}>+357 99475294</a>
                    </li>
                    <li className={'contact'}>
                        <EmailIcon />
                        <a className={'email-link'} href={'mailto:nikolaou.giannis@yahoo.com?subject=Cool website'}>nikolaou.giannis@yahoo.com</a>
                    </li>
                    <li className={'contact'}>
                        <GithubIcon />
                        <a className={'github-link'} href={'https://www.github.com/John-Nik'}>github.com/John-Nik</a>
                    </li>
                </ul>
            </div>
        </div>
        </aside>
    )
}