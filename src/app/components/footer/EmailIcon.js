'use client';

export default function EmailIcon() {
    function userWantsEmail() {
        window.location.href = 'mailto:nikolaou.giannis@yahoo.com?subject=Cool website';
    }

    return (
        <img onClick={userWantsEmail} src="/icons/email.svg" alt="" />
    )
}