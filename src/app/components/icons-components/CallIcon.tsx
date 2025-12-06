import Link from 'next/link';

export default function CallIcon() {
    return (
        <Link href="tel:0035799475294">
            <img
                tabIndex={0}
                role="button"
                className="phone-icon icon"
                src="/icons/phone.svg"
                alt=""
            />
        </Link>
    );
}