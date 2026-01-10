import { twMerge } from 'tailwind-merge';

interface Props {
    className?: string
    title?: string
    alt?: string
}

export default function GithubIcon(props: Props) {
    return (
        <img
            className={twMerge('rounded-1/2', props?.className)}
            title={props?.title}
            src="/icons/github.svg"
            alt={props?.alt}
            aria-hidden={false}
        />
    );
}