'use client';

export default function CallIcon() {
    function userWantsCall() {
        window.location.href = 'tel:0035799475294';
    }

    return (
        <img tabIndex="0" role="button" className={'phone-icon icon'} onClick={userWantsCall} onKeyDown={(e) => {if (e.key === "Enter" || e.key === " ") { userWantsCall() }}} src="/icons/phone.svg" alt="" />
    )
}