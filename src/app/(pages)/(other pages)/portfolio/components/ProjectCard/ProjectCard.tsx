'use client'
import './styling.scss';
import GithubIcon from '../../../../../components/icons-components/GithubIcon';
import WebsiteIcon from '../../../../../components/icons-components/WebsiteIcon';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { ReactElement, useRef } from 'react';

export default function ProjectCard({project, children, key}: {project: any, children?: any, key: number}): ReactElement {
    const router: AppRouterInstance = useRouter();
    let isEnabled = useRef(project.attributes.isEnabled);
    
    
    function isCardEnabled() {
        if (!isEnabled.current) {
            return 'grayscale(50) brightness(0.75)';
        } else {
            return '';
        }
    }

    return (
        <div className={"item-container"}>
            {children}
            <div 
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                    if ((e.key === "Enter") && (isEnabled.current)) 
                        router.push(`/portfolio/${project.attributes.link}`);
                }}
                onClickCapture={(e) => {
                    e.stopPropagation;
                    if (!isEnabled.current) return;

                    console.log(router);
                    router.push(`/portfolio/${project.attributes.title}`, project.attributes.title);
                }}
                className={'card'}
            >
                <Image 
                    className={'background'}
                    src={`/${project.attributes.img}`}
                    width={376}
                    height={376}
                    priority={key <= 1 ? true : false}
                    quality={100}
                    sizes="50vw"
                    style={{
                        width: 'calc(100% - 2px)', 
                        height: 'calc(100% - 2px)',
                        filter: isCardEnabled()
                    }}
                    alt={`${project.attributes.title} Profile Picture`}
                />
                <h2>{project.attributes.title}</h2>
            </div>
            <div className={'icons-wrapper'}>
                {isEnabled.current ? 
                    <>
                        <WebsiteIcon link={project.attributes.siteLink} />
                        <GithubIcon link={project.attributes.githubLink} />
                    </> 
                : 
                    <span style={{
                        fontSize: '2.25rem',
                        color: 'white',
                        backdropFilter: 'blur(5px) brightness(0.5)',
                        borderRadius: '5px',
                        padding: '4px 0.5ch 0px 0.5ch'
                    }}>In Dev</span>
                }
            </div>
        </div>
    )
}