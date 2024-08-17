'use client';
import { ReactElement } from "react";

export default function WebsiteIcon({link = 'no-link', className}: {link: string, className?: string}): ReactElement {
    function redirectUserToWebsite(): void {
        window.open(link, "_blank");
    }

    function icon() {
        if (link === 'no-link') return;

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

    return icon();
}