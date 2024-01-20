'use client';

export default function GithubIcon() {
    function userWantsGithub() {
        window.location.href = 'mailto:nikolaou.giannis@yahoo.com?subject=Cool website';
    }

    return (
        <img onClick={userWantsGithub} src="/icons/github.svg" alt="" srcset="" />
    )
}