'use client';

export default function GithubIcon() {
    function userWantsGithub() {
        window.location.href = 'https://www.github.com/John-Nik';
    }

    return (
        <img className={'github-icon icon'} onClick={userWantsGithub} src="/icons/github.svg" alt="" />
    )
}