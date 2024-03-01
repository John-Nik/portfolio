import './styling.scss';


export default function SkillsSection() {
    return (
        <section id={'skills-section'}>
            <div className={'container'}>
                    <p>Initially, I built personal projects to kickstart my journey. However, I soon felt the need for something <span className={'colored-text'}>more difficult,</span> and the idea of building websites for local businesses came to mind. That's when I decided to design and build websites for local businesses, accommodating all their wants and needs.</p>

                    <div className={'threeD-icons-container'}>
                        <div className={'threeD-icon'}>
                            <div className={'html5'}>
                                <div className={'img-wrapper'}>
                                    <img src="icons/html5-logo.svg" />
                                </div>
                            </div>
                        </div>
                        <div className={'threeD-icon'}>
                            <div className={'css3'}>
                                <div className={'img-wrapper'}>
                                    <img src="icons/css3-logo.svg" />
                                </div>
                            </div>
                        </div>
                        <div className={'threeD-icon'}>
                            <div className={'scss'}>
                                <div className={'img-wrapper'}>
                                    <img src="icons/sass.svg" />
                                </div>
                            </div>
                        </div>
                        <div className={'threeD-icon'}>
                            <div className={'javascript'}>
                                <div>
                                    <span>JS</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p>
                    This decision pushed me much faster to learn uncharted territories in the field, and even dwelling outside of it, and sometimes, delve deep into the outside parts of it. The experience I have gotten there escalated my <span className={'colored-text'}>sophistication</span> in the field.
                    </p>

                    <div className={'threeD-icons-container'}>
                        <div className={'nunjucks threeD-icon'}></div>
                        <div className={'react threeD-icon'}></div>
                        <div className={'nextjs threeD-icon'}></div>
                        <div className={'git threeD-icon'}></div>
                    </div>
            </div>
        </section>
    )
}