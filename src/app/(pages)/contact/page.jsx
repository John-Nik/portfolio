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

            <form name="contact" method="POST" data-netlify="true" hidden>
                <input type="hidden" name="form-name" value="contact" />
                <input required={true} id="fname" name="nameInput" type="text" />

                <input required={true} id="femail" name="emailInput" type="text" />

                <textarea required={true} className="fmessage" id="fmessage" name="messageInput" type="text" />
            </form>

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