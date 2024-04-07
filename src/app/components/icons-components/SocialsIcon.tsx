'use client';
import { ReactElement } from "react";

export default function SocialsIcon(): ReactElement {
    function userTriggersSocialsMenu(): void {
        const footerLinksContainer: HTMLElement = document.querySelector('.footer-links-container');
        const toggleBackground: HTMLDivElement = document.querySelector('.toggle-background');

        footerLinksContainer.classList.toggle('show-icons');
        toggleBackground.classList.toggle('open');
    }

    return (
        <img tabIndex={0} role="button" className={'socials-icon'} onClick={userTriggersSocialsMenu} onKeyDown={(e) => {if (e.key === "Enter") { userTriggersSocialsMenu() }}} src="/icons/socials.svg" alt="" />
    )
}