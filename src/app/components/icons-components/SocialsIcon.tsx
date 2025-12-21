'use client';
import { ReactElement } from 'react';

export default function SocialsIcon(): ReactElement {
    function userTriggersSocialsMenu(): void {
        const footerLinksContainer = document.querySelector<HTMLElement>('.footer-links-container');
        const toggleBackground = document.querySelector<HTMLDivElement>('.toggle-background');

        if (!footerLinksContainer || !toggleBackground) return;

        footerLinksContainer.classList.toggle('show-icons');
        toggleBackground.classList.toggle('open');
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLImageElement>): void {
        if (e.key !== 'Enter') return;
        userTriggersSocialsMenu();
    }

    return (
        <img
            tabIndex={0}
            role="button"
            data-socials-icon
            onClick={userTriggersSocialsMenu}
            onKeyDown={handleKeyDown}
            src="/icons/socials.svg"
            alt=""
        />
    );
}