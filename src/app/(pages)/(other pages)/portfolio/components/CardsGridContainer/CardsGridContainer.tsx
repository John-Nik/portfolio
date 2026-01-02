'use client';
import { ReactElement, useRef } from 'react';
import Image from 'next/image';
import WebsiteIconLink from '../../../../../components/icons-components/WebsiteIconLink';
import GithubIconLink from '../../../../../components/icons-components/GithubIconLink';
import { Project } from '../../types/Project';
import Link from 'next/link';

export default function CardsGridContainer({ projects}: { projects: Project[] }): ReactElement {
    const globePerfImage = useRef<HTMLImageElement>(null);

    function adjustGlobeBrightness(mode: 'normal' | 'dim') {
        if (!globePerfImage.current) return;

        globePerfImage.current.style.filter = mode === 'normal'
            ? 'brightness(1)'
            : 'brightness(0.8)';
    };

    return (
        <>
            <div className="project-card-container">
                <Link href="/portfolio/globe-perf">
                    <Image
                        ref={globePerfImage}
                        className="background"
                        src="/images/globe-perf.webp"
                        width={310}
                        height={224}
                        priority={true}
                        quality={100}
                        sizes="50vw"
                        id="globe-perf"
                        style={{
                            width: 'calc(100% - 2px)',
                            height: 'calc(100% - 2px)',
                            opacity: '0.8',
                            filter: 'brightness(0.8)',
                            objectFit: 'cover',
                        }}
                        alt="Globe-Perf preview picture"
                        onMouseEnter={() => adjustGlobeBrightness('normal')}
                        onMouseLeave={() => adjustGlobeBrightness('dim')}
                    />
                </Link>

                <div className="content">
                    <h2>Globe-Perf</h2>
                    <div className="icons-container">
                        <WebsiteIconLink link="no-link" />
                        <GithubIconLink link="https://www.github.com/John-Nik/Globe-perf" />
                    </div>
                </div>
            </div>
            {
                projects.map((project, index): ReactElement => {
                    return (
                        <div
                            className="project-card-container"
                            key={index}
                        >
                            <Link
                                className="flex w-full h-full"
                                href={project.isEnabled ? `/portfolio/${project.link}` : ''}
                            >
                                <Image
                                    className="background"
                                    src={`/${project.img}`}
                                    width={310}
                                    height={224}
                                    priority={index <= 2 ? true : false}
                                    quality={100}
                                    sizes="50vw"
                                    style={{
                                        width: 'calc(100% - 2px)',
                                        height: 'calc(100% - 2px)',
                                        backgroundColor: `#${project.backgroundColor}`,
                                        filter: !project.isEnabled ? 'brightness(0.5) saturate(0.5)' : '',
                                        cursor: !project.isEnabled ? 'default' : ''
                                    }}
                                    alt={`${project.title} Profile Picture`}
                                />
                            </Link>

                            <div className="content">
                                <h2>{ project.title }</h2>

                                { project.isEnabled ? 
                                    <div className="icons-container">
                                        <WebsiteIconLink link={project.siteLink} />
                                        <GithubIconLink link={project.githubLink} />
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
    );
}