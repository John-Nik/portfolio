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

            <form name="contact2" method="POST" data-netlify="true" hidden>
                <input type="hidden" name="form-name" value="contact2" />
                <input required={true} id="fname" name="nameInput2" type="text" />

                <input required={true} id="femail" name="emailInput2" type="text" />

                <textarea required={true} className="fmessage" id="fmessage" name="messageInput2" type="text" />
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

            <Footer className="contact-page-footer" />
        </>
    )
}

export const metadata = {
    title: 'Giannis N. | Contact',
    alternates: {
        canonical: '/contact'
    },
}