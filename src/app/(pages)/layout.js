import Header from '../components/header/Header';
import Footer from '../components/footer/footer';

export default function({children}) {
    return (
        <>
            <Header />

            <main>
                {children}
            </main>

            <Footer />
        </>
    )
}