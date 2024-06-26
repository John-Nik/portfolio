'use server'
import FullPortfolioPage from "../components/FullPortfolioPage/FullPortfolioPage";

export default async function() {    
    const content = require.context('../../../../content', true);
    let projects = content.keys().map((filename) => content(filename));

    return (
        <>
            <FullPortfolioPage projects={projects} />
        </>
    )
}