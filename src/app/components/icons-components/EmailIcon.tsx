'use client';
import { ReactElement } from "react";

export default function EmailIcon(): ReactElement {
    function userWantsEmail(): void {
        window.location.href = 'mailto:nikolaou.giannis@yahoo.com?subject=Cool website';
    }

    return (
        <img tabIndex={0} role="button" className={'email-icon icon'} onClick={userWantsEmail} onKeyDown={(e) => {if (e.key === "Enter" || e.key === " ") { userWantsEmail() }}} src="/icons/email.svg" alt="" />
    )
}