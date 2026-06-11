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
                className={twMerge(className, 'rounded-1/2 opacity-80 aria-hidden:opacity-0 hover:aria-hidden:opacity-0 hover:opacity-100 shadow-[0_0_5px_black] aria-hidden:shadow-none scale-100 aria-hidden:scale-0 calm-fast w-8 h-8')}
                title={`Visit ${link}`}
                src="/icons/website.svg"
                alt={`redirect to ${link}`}
                aria-hidden={false}
            />
        </Link>
    );
}