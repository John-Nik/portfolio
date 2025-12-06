import Link from 'next/link';

export default function EmailIcon() {
    return (
        <Link href="mailto:nikolaou.giannis@yahoo.com?subject=Cool website">
            <img
                tabIndex={0}
                role="button"
                className="email-icon icon"
                src="/icons/email.svg"
                alt=""
            />
        </Link>
    );
}