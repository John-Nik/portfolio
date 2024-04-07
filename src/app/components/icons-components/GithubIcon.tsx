'use client';
import { ReactElement } from "react";

export default function GithubIcon({link, className}: {link: string, className?: string}): ReactElement {
    function userWantsGithub(): void {
        window.open(link, "_blank");
    }

    return (
        <img tabIndex={0} role="button" className={'github-icon icon'} title={`Visit ${link}`} onClick={userWantsGithub} onKeyDown={(e) => {if (e.key === "Enter" || e.key === " ") { userWantsGithub() }}} src="/icons/github.svg" alt={`redirect to ${link}`} />
    )
}