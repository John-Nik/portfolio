'use client'
import './styling.scss';
import { useEffect } from 'react';


export default function SkillsSection() {
    useEffect(() => {
        const html5Icon = document.querySelector('.html5');
        const css3Icon = document.querySelector('.css3');
        const scssAndJsIcon = document.querySelectorAll('#tridiv');
        let windowWidth = window.innerWidth;

        window.addEventListener('resize', setIconSize)

        setIconSize();
        function setIconSize() {
            windowWidth = window.innerWidth;

            if (windowWidth < 800) {
                html5Icon.style.scale = `${windowWidth * 0.002}`;
                css3Icon.style.scale = `${windowWidth * 0.0020}`;
                scssAndJsIcon.forEach((icon) => {
                    icon.style.scale = `${windowWidth * 0.0003}`;
                })
            } else {
                html5Icon.style.scale = `1.596`;
                css3Icon.style.scale = `1.596`;
                scssAndJsIcon.forEach((icon) => {
                    icon.style.scale = `0.3192`;
                })
            }
        }
    }, [])

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
                                            <div className="face side s19" />
                                            <div className="face side s20" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'threeD-icon'}>
                            <div className={'javascript'}>
                                <div id="tridiv">
                                    <div className={"scene"}>
                                        <div className={"shape cuboid-1 cub-1"}>
                                            <div className={"face ft"}></div>
                                            <div className={"face bk"}></div>
                                            <div className={"face rt"}></div>
                                            <div className={"face lt"}></div>
                                            <div className={"face bm"}></div>
                                            <div className={"face tp"}><span>JS</span></div>
                                            <div className={"cr cr-0"}>
                                                <div className={"face side s0"}></div>
                                                <div className={"face side s1"}></div>
                                                <div className={"face side s2"}></div>
                                                <div className={"face side s3"}></div>
                                                <div className={"face side s4"}></div>
                                                <div className={"face side s5"}></div>
                                                <div className={"face side s6"}></div>
                                                <div className={"face side s7"}></div>
                                                <div className={"face side s8"}></div>
                                                <div className={"face side s9"}></div>
                                                <div className={"face side s10"}></div>
                                                <div className={"face side s11"}></div>
                                                <div className={"face side s12"}></div>
                                                <div className={"face side s13"}></div>
                                                <div className={"face side s14"}></div>
                                                <div className={"face side s15"}></div>
                                                <div className={"face side s16"}></div>
                                            </div>
                                            <div className={"cr cr-1"}>
                                                <div className={"face side s0"}></div>
                                                <div className={"face side s1"}></div>
                                                <div className={"face side s2"}></div>
                                                <div className={"face side s3"}></div>
                                                <div className={"face side s4"}></div>
                                                <div className={"face side s5"}></div>
                                                <div className={"face side s6"}></div>
                                                <div className={"face side s7"}></div>
                                                <div className={"face side s8"}></div>
                                                <div className={"face side s9"}></div>
                                                <div className={"face side s10"}></div>
                                                <div className={"face side s11"}></div>
                                                <div className={"face side s12"}></div>
                                                <div className={"face side s13"}></div>
                                                <div className={"face side s14"}></div>
                                                <div className={"face side s15"}></div>
                                                <div className={"face side s16"}></div>
                                            </div>
                                            <div className={"cr cr-2"}>
                                                <div className={"face side s0"}></div>
                                                <div className={"face side s1"}></div>
                                                <div className={"face side s2"}></div>
                                                <div className={"face side s3"}></div>
                                                <div className={"face side s4"}></div>
                                                <div className={"face side s5"}></div>
                                                <div className={"face side s6"}></div>
                                                <div className={"face side s7"}></div>
                                                <div className={"face side s8"}></div>
                                                <div className={"face side s9"}></div>
                                                <div className={"face side s10"}></div>
                                                <div className={"face side s11"}></div>
                                                <div className={"face side s12"}></div>
                                                <div className={"face side s13"}></div>
                                                <div className={"face side s14"}></div>
                                                <div className={"face side s15"}></div>
                                                <div className={"face side s16"}></div>
                                            </div>
                                            <div className={"cr cr-3"}>
                                                <div className={"face side s0"}></div>
                                                <div className={"face side s1"}></div>
                                                <div className={"face side s2"}></div>
                                                <div className={"face side s3"}></div>
                                                <div className={"face side s4"}></div>
                                                <div className={"face side s5"}></div>
                                                <div className={"face side s6"}></div>
                                                <div className={"face side s7"}></div>
                                                <div className={"face side s8"}></div>
                                                <div className={"face side s9"}></div>
                                                <div className={"face side s10"}></div>
                                                <div className={"face side s11"}></div>
                                                <div className={"face side s12"}></div>
                                                <div className={"face side s13"}></div>
                                                <div className={"face side s14"}></div>
                                                <div className={"face side s15"}></div>
                                                <div className={"face side s16"}></div>
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