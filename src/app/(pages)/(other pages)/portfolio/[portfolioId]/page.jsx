'use server'
import './styling.scss';
import GithubIcon from '@/app/components/icons-components/GithubIcon';
import WebsiteIcon from '@/app/components/icons-components/WebsiteIcon';

export default function() {
    const content = require.context('../../../content', true);
    let allProjectsContent = content.keys().map((filename) => content(filename));

    return (
      <>
            <h1 className={'title'}>// Portfolio</h1>
            <section>
                <div className={'container'}>
                    {
                        allProjectsContent.map((project) => {
                            return (
                                <div className={"item-container"}>
                                    <img className={'background'} src={`${project.attributes.img}`} />
                                    <h2>{project.attributes.title}</h2>
                                    <div className={'icons-wrapper'}>
                                        <WebsiteIcon link={project.attributes.siteLink} />
                                        <GithubIcon link={project.attributes.githubLink} className={'github-icon'} />
                                    </div>
                                </div>
                                )
                        })
                    }
                </div>
            </section>
      </>
    )
}