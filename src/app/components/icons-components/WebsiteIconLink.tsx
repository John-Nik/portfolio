import Link from 'next/link';

export default function WebsiteIcon({
    link = 'no-link',
}: {
    link: string,
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
                className="aria-hidden:opacity-0 scale-100 aria-hidden:scale-0 website-icon calm-fast"
                title={`Visit ${link}`}
                src="/icons/website.svg"
                alt={`redirect to ${link}`}
                aria-hidden={false}
            />
        </Link>
    );
}