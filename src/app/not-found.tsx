'use client';
import Header from './components/header/Header';
import Footer from './components/footer/footer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Custom404() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/');
        }, 5000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <>
            <Header />

            <main className="flex flex-col justify-center items-center gap-4 mx-6 min-[800px]:mt-24 h-[calc(100dvh-64px-58px)]! min-[800px]:h-[calc(100dvh-90px-59px)] overflow-hidden">
                <Image
                    src="/icons/question-mark.svg"
                    alt=""
                    height="150"
                    width="150"
                    priority={true}
                />

                <h1 className="relative flex flex-col items-center mt-1 px-4! w-full font-thin text-white after:text-gray-200 after:text-2xl text-4xl text-center after:text-center after:content-[''] after:animate-countdown">
                    Page Not Found
                </h1>
            </main>

            <Footer />
        </>
    );
}