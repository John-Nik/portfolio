import Link from 'next/link';

export default function EmailIcon() {
    return (
        <Link href="mailto:nikolaou.giannis@yahoo.com?subject=Cool website">
            <img
                tabIndex={0}
                role="button"
                className="opacity-100 aria-hidden:opacity-0 scale-100 aria-hidden:scale-0 calm-fast"
                src="/icons/email.svg"
                alt=""
                aria-hidden={false}
            />
        </Link>
    );
}