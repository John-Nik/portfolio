'use server'
import './styling.scss';
import ProjectCard from './components/ProjectCard/ProjectCard.jsx'

export default async function({}) {
    const content = require.context('../../../content', true);
    let projects = content.keys().map((filename) => content(filename));

    return (
      <>
            <h1 className={'title'}>// Portfolio</h1>
            <section>
                <div className={'container'}>
                    {
                        projects.map((project, key) => {
                            return (
                                <ProjectCard key={key} project={project} />
                                )
                        })
                    }
                </div>
            </section>
      </>
    )
}