'use server';
import FullPortfolioPage from '../components/FullPortfolioPage/FullPortfolioPage';

export default async function page() {    
    const content = await require.context('../../../../content', true);
    const projects = content.keys().map((filename) => content(filename));

    return (
        <>
            <FullPortfolioPage projects={projects} />
        </>
    );
}