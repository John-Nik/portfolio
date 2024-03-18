import Header from "@/app/components/header/Header";
import Footer from "@/app/components/footer/footer";
import Sidebar from "./components/Sidebar/Sidebar";
import './styling.scss';
import CodeWrapper from "./components/CodeWrapper/CodeWrapper";
import FormWrapper from "./components/FormWrapper/FormWrapper";


export default function() {
    return (
        <>
            <Header />

            <main id={'contact-me-main'}>
                <Sidebar />
                <div className={'main-content-container'}>
                    <div className={'content-wrapper'}>
                        <div className={'title-wrapper'}>
                            <h1>// ContactMe</h1>
                        </div>
                        <div className={'form-container'}>
                        <FormWrapper />
                        <CodeWrapper />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}

export const metadata = {
    title: 'Giannis N. | Contact',
    alternates: {
        canonical: '/contact'
    },
}