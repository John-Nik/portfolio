interface Props {
    className?: string;
}

export default function EmailIcon(props: Props) {
    return (
        <img
            className={props?.className}
            src="/icons/email.svg"
            alt=""
            aria-hidden={false}
        />
    );
}