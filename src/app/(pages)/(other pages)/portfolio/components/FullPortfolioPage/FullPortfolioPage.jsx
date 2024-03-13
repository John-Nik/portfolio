'use client';
import { usePathname } from "next/navigation";
import ProjectCard from "../ProjectCard/ProjectCard";
import './styling.scss';
import { useEffect } from "react";

export default function FullPortfolioPage({projects}) {

    function pageMarginBottom() {
        if (window.innerWidth < 800) {
            return 58 * 3;
        } else {
            return 56 * 3
        }
    }

    function getNavBarHeight() {
        const header = document.querySelector('header');
        return header.offsetHeight;
    }

    function getFooterHeight() {
        const footer = document.querySelector('footer');
        return footer.offsetHeight;
    }

    function getMainHeight() {
        const main = document.querySelector('main');
        return main.offsetHeight
    }

    useEffect(() => {
        const page = document.querySelector('.full-page-project');
        let currentMarginBottom = pageMarginBottom();
        let mainHeight = getMainHeight();
        let footerHeight = getFooterHeight();
        let navBarHeight = getNavBarHeight();

        
        if (window.innerHeight == mainHeight + footerHeight + navBarHeight) {
            return;
        } else if (window.innerHeight < mainHeight + footerHeight + navBarHeight) {
            page.style.marginBottom = `${currentMarginBottom - (currentMarginBottom / 3)}px`
        }
    })

    const pathname = usePathname()
    .split("/")
    .slice(2)[0]
    .toLowerCase();

    let dataToPull = projects.filter((project) => project.attributes.title.toLowerCase().includes(pathname))
    let projectAttributes = dataToPull[0].attributes;

    return (
        <section className={'full-page-project'}>
            <div className={'container full-page-card'}>
                <ProjectCard project={dataToPull[0]} />
                <div className={'text-wrapper'}>
                    <h1 className={'title'}>// {projectAttributes.title}</h1>
                    <div className={'body'} dangerouslySetInnerHTML={{__html: dataToPull[0].html}} />
                </div>
            </div>
        </section>
    )
}