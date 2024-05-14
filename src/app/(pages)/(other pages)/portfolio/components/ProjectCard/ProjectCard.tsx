'use client'
import './styling.scss';
import GithubIcon from '../../../../../components/icons-components/GithubIcon';
import WebsiteIcon from '../../../../../components/icons-components/WebsiteIcon';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { ReactElement } from 'react';

export default function ProjectCard({project, children}: {project: any, children?: any}): ReactElement {
    const router: AppRouterInstance = useRouter();

    return (
        <div className={"item-container"}>
            {children}
            <div tabIndex={0} role="button" onKeyDown={(e) => {if (e.key === "Enter") { router.push(`/portfolio/${project.attributes.link}`) }}} onClickCapture={(e) => {e.stopPropagation; console.log(router); router.push(`/portfolio/${project.attributes.title}`, project.attributes.title)}} className={'card'}>
                <Image className={'background'} src={`/${project.attributes.img}`} width={376} height={376} priority={false} quality={100}  sizes="50vw" style={{width: 'calc(100% - 2px)', height: 'calc(100% - 2px)'}} alt={`${project.attributes.title} Profile Picture`}/>
                <h2>{project.attributes.title}</h2>
            </div>
            <div className={'icons-wrapper'}>
                <WebsiteIcon link={project.attributes.siteLink} />
                <GithubIcon link={project.attributes.githubLink} />
            </div>
        </div>
    )
}