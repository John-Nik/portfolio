'use client';
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import './styling.scss';

export default function FullPortfolioPage({projects}) {
    const router = useRouter();
    const pathname = usePathname()
    .split("/")
    .slice(2)[0]
    .toLowerCase();

    let dataToPull = projects.filter((project) => project.attributes.title.toLowerCase().includes(pathname))
    let projectAttributes = dataToPull[0].attributes;

    useEffect(() => {
        const card = document.querySelector('.item-container');

        card.addEventListener('mousemove', (mouse) => {
            const rect = card.getBoundingClientRect();
            const mouseOnCardPosX = mouse.clientX - rect.left;
            const mouseOnCardPosY = mouse.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${mouseOnCardPosX}px`)
            card.style.setProperty('--mouse-y', `${mouseOnCardPosY}px`)
        })



        const titleTag = document.querySelector('title');
        titleTag.innerHTML = `Giannis N. | ${projectAttributes.title} Project`;
    }, [])

    function sendToPortfolioPage() {
        router.push('/portfolio');
    }

    return (
        <section className={'full-page-project'}>
            <div className={'container full-page-card'}>
                <div onClick={sendToPortfolioPage} className={'back-arrow'}>
                    <img src="/icons/back-arrow.svg" />
                </div>
                <ProjectCard project={dataToPull[0]} />
                <div className={'text-wrapper'}>
                    <h1 className={'title'}>// {projectAttributes.title}</h1>
                    <div className={'body'} dangerouslySetInnerHTML={{__html: dataToPull[0].html}} />
                </div>
            </div>
        </section>
    )
}