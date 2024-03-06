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
                                <div id="tridiv">
                                    <div className="scene">
                                        <div className="shape cylinder-1 cyl-1">
                                            <div className="face bm">
                                                <img src='/icons/sass.svg' />
                                            </div>
                                            <div className="face tp" />
                                            <div className="face side s0" />
                                            <div className="face side s1" />
                                            <div className="face side s2" />
                                            <div className="face side s3" />
                                            <div className="face side s4" />
                                            <div className="face side s5" />
                                            <div className="face side s6" />
                                            <div className="face side s7" />
                                            <div className="face side s8" />
                                            <div className="face side s9" />
                                            <div className="face side s10" />
                                            <div className="face side s11" />
                                            <div className="face side s12" />
                                            <div className="face side s13" />
                                            <div className="face side s14" />
                                            <div className="face side s15" />
                                            <div className="face side s16" />
                                            <div className="face side s17" />
                                            <div className="face side s18" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'threeD-icon'}>
                            <div className={'javascript'}>
                                <div id="tridiv">
                                    <div className="scene" >
                                        <div className="shape cuboid-1 cub-1">
                                            <div className="face ft" />
                                            <div className="face bk" />
                                            <div className="face rt" />
                                            <div className="face lt" />
                                            <div className="face bm" />
                                            <div className="face tp"><span>JS</span></div>
                                            <div className="cr cr-0">
                                                <div className="face side s0" />
                                                <div className="face side s1" />
                                                <div className="face side s2" />
                                            </div>
                                            <div className="cr cr-1">
                                                <div className="face side s0" />
                                                <div className="face side s1" />
                                                <div className="face side s2" />
                                            </div>
                                            <div className="cr cr-2">
                                                <div className="face side s0" />
                                                <div className="face side s1" />
                                                <div className="face side s2" />
                                            </div>
                                            <div className="cr cr-3">
                                                <div className="face side s0" />
                                                <div className="face side s1" />
                                                <div className="face side s2" />
                                            </div>
                                        </div>
                                    </div>
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