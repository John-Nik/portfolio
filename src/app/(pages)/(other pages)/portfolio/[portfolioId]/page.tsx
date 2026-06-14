import FullPortfolioPage from './FullPortfolioPage';
import { importProjects } from '../../../../helpers/importProjects';

export const dynamicParams = false;

export async function generateStaticParams() {
    const projects = await importProjects();
    return projects.map((p) => ({ portfolioId: p.link }));
}

export default async function page() {
    const projects = await importProjects();
    return <FullPortfolioPage projects={projects} />;
}