'use server';
import FullPortfolioPage from '../components/FullPortfolioPage/FullPortfolioPage';
import { importProjects } from '../../../../helpers/importProjects';

export default async function page() {    
    const projects = await importProjects();

    return (
        <FullPortfolioPage projects={projects} />
    );
}