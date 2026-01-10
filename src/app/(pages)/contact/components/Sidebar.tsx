import Link from 'next/link';
import DownloadCVButton from '../../../components/DownloadCVButton';
import EmailIcon from '../../../components/icons-components/EmailIcon';
import GithubIcon from '../../../components/icons-components/GithubIcon';

export default function Sidebar() {
    return (
        <aside className="hidden top-0 left-0 sticky lg:flex flex-col py-4 border-white/50 border-r-2 w-1/5 min-w-62 max-w-107 h-full">
            <div className="relative flex flex-col justify-between px-4 h-full">
                <div className="flex justify-center mt-18 w-full">
                    <DownloadCVButton className="text-2xl" />
                </div>

                <ul className="flex flex-col gap-3">
                    <li>
                        <Link
                            href="mailto:nikolaou.giannis@yahoo.com?subject=Cool website"
                            className="flex flex-row items-center gap-2 hover:brightness-80 calm-fast"
                        >
                            <EmailIcon />

                            <span className="text-[clamp(16px,1.2vw,20px)] text-white">
                                nikolaou.giannis@yahoo.com
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="https://www.github.com/John-Nik"
                            className="flex flex-row items-center gap-2 hover:brightness-80 calm-fast"
                        >
                            <GithubIcon />

                            <span className="text-[clamp(16px,1.2vw,20px)] text-white">
                                github.com/John-Nik
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}