import Link from 'next/link';
import EmailIcon from './EmailIcon';

export default function EmailIconLink() {
    return (
        <Link href="mailto:nikolaou.giannis@yahoo.com?subject=Cool website">
            <EmailIcon className="opacity-100 aria-hidden:opacity-0 scale-100 aria-hidden:scale-0 calm-fast" />
        </Link>
    );
}