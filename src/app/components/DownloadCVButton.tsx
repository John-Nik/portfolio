import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface Props {
    className?: string;
}

export default function DownloadCVButton({ className }: Props) {
    return (
        <Link
            href="https://rx-resume.john-nik.com/pandofla/fullstack-developer"
            className={twMerge('group flex justify-center items-center bg-transparent shadow-none backdrop-blur-sm py-[clamp(8px,1.6vw,16px)]! border-[#406ABF] border-2 hover:border-[hsl(220,50%,30%)] rounded-full w-full overflow-hidden text-[clamp(1.5rem,2vw,2rem)] text-white leading-tight active:scale-95! cursor-pointer pointer-events-auto calm-fast', className)}
        >
            <div className="z-5 absolute bg-[hsl(220,50%,30%)] rounded-full w-full h-full scale-0 group-hover:scale-110 calm-fast" />

            <span className="z-10">
                Download CV
            </span>
        </Link>
    );
}