import Link from 'next/link';
import GithubIcon from './GithubIcon';
import { twMerge } from 'tailwind-merge';

interface Props {
    link: string,
    className?: string
}

export default function GithubIconLink(props: Props) {
    const {
        link = 'no-link',
        className,
    } = props;

    if (link === 'no-link') return;

    return (
        <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
        >
            <GithubIcon
                className={twMerge('opacity-80 aria-hidden:opacity-0 hover:aria-hidden:opacity-0 hover:opacity-100 shadow-[0_0_5px_black] aria-hidden:shadow-none scale-100 aria-hidden:scale-0 calm-fast', className)}
                alt="redirect to github"
                title="GitHub Link"
            />
        </Link>
    );
}