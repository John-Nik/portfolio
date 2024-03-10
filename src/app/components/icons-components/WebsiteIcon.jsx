'use client';

export default function WebsiteIcon({link}) {
    function redirectUserToWebsite() {
        window.open(link, "_blank");
    }

    return (
        <img className={'website-icon icon'} onClick={redirectUserToWebsite} title={`Visit ${link}`} src="/icons/website.svg" alt={`redirect to ${link}`} />
    )
}