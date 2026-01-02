import Link from 'next/link';

export default function GithubIconLink({
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
                className={`rounded-1/2 shadow-[0_0_5px_black] aria-hidden:shadow-none aria-hidden:opacity-0 aria-hidden:scale-0 opacity-70 scale-100 hover:opacity-100 hover:aria-hidden:opacity-0 calm-fast ${className}`}
                title={`Visit ${link}`}
                src="/icons/github.svg"
                alt={`redirect to ${link}`}
                aria-hidden={false}
            />
        </Link>
    );
}