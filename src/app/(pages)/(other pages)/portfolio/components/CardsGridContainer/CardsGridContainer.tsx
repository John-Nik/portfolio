'use client';
import { ReactElement, ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import WebsiteIcon from "../../../../../components/icons-components/WebsiteIcon";
import GithubIcon from "../../../../../components/icons-components/GithubIcon";

export default function CardsGridContainer({projects}: {projects: ReactNode[]}): ReactElement {
    const router = useRouter();

    
    return (
        <>
            <div className="project-card-container">
                <Image
                    className={'background'}
                    src={'/images/globe-perf.webp'}
                    width={310}
                    height={224}
                    priority={true}
                    quality={100}
                    sizes='50vw'
                    id="globe-perf"
                    style={{
                        width: 'calc(100% - 2px)',
                        height: 'calc(100% - 2px)',
                        opacity: '0.8',
                        filter: 'brightness(0.8)',
                        objectFit: 'cover',
                    }}
                    alt={'Globe-Perf preview picture'}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            router.push('/portfolio/globe-perf');
                    }}
                    onClickCapture={(e) => {
                        e.stopPropagation;
                        router.push('/portfolio/globe-perf');
                    }}
                    onMouseEnter={() => {
                        (document.querySelector('#globe-perf') as HTMLImageElement).style.filter = 'brightness(1)';
                    }}
                    onMouseLeave={() => {
                        (document.querySelector('#globe-perf') as HTMLImageElement).style.filter = 'brightness(0.8)';
                    }}
                />

                <div className="content">
                    <h2>Globe-Perf</h2>
                    <div className="icons-container">
                        <WebsiteIcon link={'no-link'} />
                        <GithubIcon link={'https://www.github.com/John-Nik/Globe-perf'} />
                    </div>
                </div>
            </div>
            {
                projects.map((project: any, projectIndex: number): ReactElement => {
                    return (
                        <div className="project-card-container" key={projectIndex}>
                            <Image
                                className={'background'}
                                src={`/${project.attributes.img}`}
                                width={310}
                                height={224}
                                priority={projectIndex <= 2 ? true : false}
                                quality={100}
                                sizes='50vw'
                                style={{
                                    width: 'calc(100% - 2px)',
                                    height: 'calc(100% - 2px)',
                                    backgroundColor: `#${project.attributes.backgroundColor}`,
                                    filter: !project.attributes.isEnabled ? 'brightness(0.5) saturate(0.5)' : '',
                                    cursor: !project.attributes.isEnabled ? 'default' : ''
                                }}
                                alt={`${project.attributes.title} Profile Picture`}
                                onKeyDown={(e) => {
                                    if ((e.key === "Enter") && (project.attributes.isEnabled))
                                        router.push(`/portfolio/${project.attributes.link}`);
                                }}
                                onClickCapture={(e) => {
                                    e.stopPropagation;
                                    if (!project.attributes.isEnabled) return;

                                    router.push(`/portfolio/${project.attributes.title}`, project.attributes.title);
                                }}
                            />

                            <div className="content">
                                <h2>{ project.attributes.title }</h2>
                                { project.attributes.isEnabled ? 
                                    <div className="icons-container">
                                        <WebsiteIcon link={project.attributes.siteLink} />
                                        <GithubIcon link={project.attributes.githubLink} />
                                    </div>
                                    :
                                    <span>In Dev</span>
                                }
                            </div>
                        </div>
					);
                })
            }
        </>
    )
}