'use client';
import { ReactElement } from "react";

export default function WebsiteIcon({link = 'no-link'}): ReactElement {
    function redirectUserToWebsite(): void {
        if (link === 'no-link') return;

        window.open(link, "_blank");
    }

    return (
        <img 
            tabIndex={0}
            role="button"
            className={'website-icon icon'}
            onClick={redirectUserToWebsite}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                    redirectUserToWebsite()
            }}
            title={`Visit ${link}`}
            src="/icons/website.svg"
            alt={`redirect to ${link}`}
        />
    )
}