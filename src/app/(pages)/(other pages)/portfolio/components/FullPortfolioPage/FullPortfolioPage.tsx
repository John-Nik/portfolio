/* eslint-disable react/jsx-no-comment-textnodes */
'use client';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './styling.scss';
import { Project } from '../../types/Project';
import Link from 'next/link';

interface Props {
    projects: Project[]
}

export default function FullPortfolioPage({ projects }: Props): ReactNode {
    const router = useRouter();
    const pathname = usePathname().toLowerCase();
    const [selectedProject, setSelectedProject] = useState(projects.find(project => {
        return pathname.includes(project.link);
    }));

    useEffect((): void => {
        if (!selectedProject || !selectedProject.isEnabled) {
            router.push('/portfolio');
            return;
        }

        const titleTag = document.querySelector<HTMLTitleElement>('title');

        if (!titleTag) {
            throw new Error('card or titleTag is missing. Are the searched-for containers mounted?');
        }

        titleTag.textContent = `Giannis N. | ${selectedProject.name} Project`;
    }, []);

    return (
        <main>
            <section className="full-page-project">
                <div className="container full-page-card">
                    <div className="card-wrapper">
                        <Link
                            href="/portfolio"
                            className="back-arrow"
                        >
                            <Image
                                src="/icons/back-arrow.svg"
                                width={40}
                                height={40}
                                alt=""
                                priority={true}
                            />
                        </Link>
                        {
                            !!selectedProject && (
                                <ProjectCard
                                    project={selectedProject}
                                    hasHoverEffect={true}
                                    projectIndex={0}
                                    no-redirect-link="true"
                                />
                            )
                        }
                    </div>

                    <div className="text-wrapper">
                        <h1 className="title">
                            // {selectedProject?.name}
                        </h1>
                        {
                            !!selectedProject && (
                                <div
                                    className="body"
                                    dangerouslySetInnerHTML={{ __html: selectedProject.body }}
                                />
                            )
                        }
                    </div>
                </div>
            </section>
        </main>
    );
}