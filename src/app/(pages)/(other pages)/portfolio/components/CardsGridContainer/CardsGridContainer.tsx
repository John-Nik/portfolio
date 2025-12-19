'use client';
import { ReactElement } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import WebsiteIcon from '../../../../../components/icons-components/WebsiteIcon';
import GithubIcon from '../../../../../components/icons-components/GithubIcon';
import { Project } from '../../types/Project';
import Link from 'next/link';

export const runtime = 'nodejs';

export default function CardsGridContainer({ projects}: { projects: Project[] }): ReactElement {
    const router = useRouter();

    function handleKeyDown(e: React.KeyboardEvent<HTMLImageElement>, link: string, isDisabled = false) {
        if (e.key !== 'Enter') return;
        redirect(link, isDisabled);
    }

    function redirect(link: string, isDisabled = false) {
        if (isDisabled) return;
        router.push(link);
    }

    function adjustGlobeBrightness(mode: 'normal' | 'dim'): void {
        const globeImage: HTMLElement | null = document.querySelector('#globe-perf');

        if (!globeImage) {
            throw new Error('no globe found');
        }

        if (mode === 'normal') {
            globeImage.style.filter = 'brightness(1)';
        } else {
            globeImage.style.filter = 'brightness(0.8)';
        }
    }

    return (
        <>
            <div className="project-card-container">
                <Link href="/portfolio/globe-perf">
                    <Image
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
                        <WebsiteIcon link="no-link" />
                        <GithubIcon link="https://www.github.com/John-Nik/Globe-perf" />
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
                                className="w-full h-full flex"
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
                                        <WebsiteIcon link={project.siteLink} />
                                        <GithubIcon link={project.githubLink} />
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