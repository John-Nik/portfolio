import Link from "next/link";

export default function GithubIcon({
    link = 'no-link',
    className
}: {
    link: string,
    className?: string
}) {
    if (link === 'no-link') return;

    return (
        <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
        >
            <img
                tabIndex={0}
                role="button"
                className={`github-icon icon ${className}`}
                title={`Visit ${link}`}
                src="/icons/github.svg"
                alt={`redirect to ${link}`}
            />
        </Link>
    )
}