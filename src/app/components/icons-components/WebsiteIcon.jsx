'use client';

export default function WebsiteIcon({link}) {
    function redirectUserToWebsite() {
        window.open(link, "_blank");
    }

    return (
        <img tabIndex="0" role="button" className={'website-icon icon'} onClick={redirectUserToWebsite} onKeyDown={(e) => {if (e.key === "Enter" || e.key === " ") { redirectUserToWebsite() }}} title={`Visit ${link}`} src="/icons/website.svg" alt={`redirect to ${link}`} />
    )
}