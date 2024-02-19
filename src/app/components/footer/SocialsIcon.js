'use client';

export default function SocialsIcon() {
    function userTriggersSocialsMenu() {
        const footerLinksContainer = document.querySelector('.footer-links-container');
        const toggleBackground = document.querySelector('.toggle-background');

        footerLinksContainer.classList.toggle('show-icons');
        toggleBackground.classList.toggle('open');
    }

    return (
        <img className={'socials-icon'} onClick={userTriggersSocialsMenu} src="/icons/socials.svg" alt="" />
    )
}