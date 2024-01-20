'use client';

export default function CallIcon() {
    function userWantsCall() {
        window.location.href = 'tel:0035799475294';
    }

    return (
        <img onClick={userWantsCall} src="/icons/phone.svg" alt="" srcset="" />
    )
}