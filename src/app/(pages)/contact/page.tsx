/* eslint-disable react/jsx-no-comment-textnodes */
import Header from '../../components/header/Header';
import Footer from '../../components/footer';
import Sidebar from './components/Sidebar';
import CodeWrapper from './components/CodeWrapper';
import FormWrapper from './components/FormWrapper';
import { metadataType } from '../../page';
import { ContactProvider } from './provide-inject/ContactContext';

export default function page() {
    return (
        <> 
            <Header />

            <ContactProvider>
                <main className="relative flex flex-row h-full">
                    <Sidebar />

                    <div className="flex justify-center w-full h-fit">
                        <div className="flex flex-col mt-16 px-4 w-full max-w-7xl h-fit">
                            <h1 className="mb-16 page-title">
                                // ContactMe
                            </h1>

                            <div className="flex w-full">
                                <FormWrapper />
                                <CodeWrapper />
                            </div>
                        </div>
                    </div>
                </main>
            </ContactProvider>

            <Footer className="lg:hidden" />
        </>
    );
}

export const metadata: metadataType = {
    title: 'Giannis N. | Contact',
    alternates: {
        canonical: '/contact'
    },
};