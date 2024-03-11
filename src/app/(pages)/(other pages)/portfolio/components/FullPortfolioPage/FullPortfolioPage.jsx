'use client';
import { usePathname } from "next/navigation";
import ProjectCard from "../ProjectCard/ProjectCard";
import './styling.scss';

export default function FullPortfolioPage({projects}) {
    const pathname = usePathname()
    .split("/")
    .slice(2)[0]
    .toLowerCase();

    let dataToPull = projects.filter((project) => project.attributes.title.toLowerCase().includes(pathname))
    let projectAttributes = dataToPull[0].attributes;

    return (
        <section >
            <div className={'container'}>
                <ProjectCard project={dataToPull[0]} />
                <div className={'text-wrapper'}>
                    <h1 className={'title'}>// {projectAttributes.title}</h1>
                    <div className={'body'} dangerouslySetInnerHTML={{__html: dataToPull[0].html}} />
                </div>
            </div>
        </section>
    )
}