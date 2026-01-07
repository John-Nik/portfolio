import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface Props {
    link: string,
    className?: string;
}

export default function WebsiteIcon(props: Props) {
    const { link = 'no-link', className } = props;

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
                className={twMerge(className, 'aria-hidden:opacity-0 scale-100 aria-hidden:scale-0 website-icon calm-fast')}
                title={`Visit ${link}`}
                src="/icons/website.svg"
                alt={`redirect to ${link}`}
                aria-hidden={false}
            />
        </Link>
    );
}