import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/footer.jsx';

export default function({children}) {
    return (
        <>
            <Header />

            {children}

            <Footer />
        </>
    )
}


export const metadata = {
    title: 'Giannis N. | Portfolio',
    alternates: {
        canonical: '/portfolio'
    },
}