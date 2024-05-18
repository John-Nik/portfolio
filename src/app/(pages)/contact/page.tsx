export const runtime = 'edge';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/footer";
import Sidebar from "./components/Sidebar/Sidebar";
import './styling.scss';
import CodeWrapper from "./components/CodeWrapper/CodeWrapper";
import FormWrapper from "./components/FormWrapper/FormWrapper";
import { metadataType } from "../../page";


export default async function() {
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

            <Footer className="contact-page-footer" />
        </>
    )
}

export const metadata: metadataType = {
    title: 'Giannis N. | Contact',
    alternates: {
        canonical: '/contact'
    },
}