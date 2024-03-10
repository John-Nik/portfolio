'use client';

export default function GithubIcon({link}) {
    function userWantsGithub() {
        window.open(link, "_blank");
    }

    return (
        <img className={'github-icon icon'} title={`Visit ${link}`} onClick={userWantsGithub} src="/icons/github.svg" alt={`redirect to ${link}`} />
    )
}