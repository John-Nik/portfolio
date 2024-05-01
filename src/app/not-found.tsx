'use client'
import Header from "./components/header/Header";
import Footer from "./components/footer/footer";
import Image from "next/image";
import './not-found.scss'
import { useRouter } from "next/navigation";

export default function Custom404() {
    const router = useRouter();

    setTimeout(() => {
        router.push('/');
    }, 5000)

    return (
        <>
            <Header />

            <main class="notFoundMain">
                <Image src="icons/question-mark.svg" alt="" height="150" width="150" priority={true} />
                <h1 style={{color: 'white'}}>Page Not Found</h1>
            </main>

            <Footer />
        </>
    )
}