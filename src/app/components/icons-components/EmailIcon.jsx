'use client';

export default function EmailIcon() {
    function userWantsEmail() {
        window.location.href = 'mailto:nikolaou.giannis@yahoo.com?subject=Cool website';
    }

    return (
        <img tabIndex="0" role="button" className={'email-icon icon'} onClick={userWantsEmail} onKeyDown={(e) => {if (e.key === "Enter") { userWantsEmail() }}} src="/icons/email.svg" alt="" />
    )
}