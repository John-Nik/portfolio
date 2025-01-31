'use client'
import './styling.scss';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';


export default function SkillsSection() {
    const html5Icon = useRef(null);
    const css3Icon = useRef(null);
    const [firstIconsGrid] = useInView({
        threshold: 0.3,
        onChange: (isVisible, intersectionObject) => {
            const iconsGrid = intersectionObject.target as HTMLDivElement;

            if (isVisible) {
                iconsGrid.classList.add('show');
            } else {
                iconsGrid.classList.remove('show');
            }
        }
    });
    const [secondIconsGrid] = useInView({
        threshold: 0.3,
        onChange: (isVisible, intersectionObject) => {
            const iconsGrid = intersectionObject.target as HTMLDivElement;

            if (isVisible) {
                iconsGrid.classList.add('show');
            } else {
                iconsGrid.classList.remove('show');
            }
        }
    });


    useEffect((): ()=>void => {
        let allOtherIcons: HTMLDivElement[] = Array.from(document.querySelectorAll('#tridiv'));
        let allIcons = document.querySelectorAll('.targetHover');
        let minute = 1000 * 60;
        let windowWidth: number = window.innerWidth;
        let interval = setInterval(triggerHover, minute / 15);
        let removeHoverTimeoutFunc;


        function triggerHover() {
            const randomSelect = allIcons[Math.floor(Math.random() * allIcons.length)];

            randomSelect.classList.add('hover');

            removeHoverTimeoutFunc = setTimeout(() => {
                randomSelect.classList.remove('hover')
            }, minute / 15);
        }



        window.addEventListener('resize', setIconSize)

        setIconSize();
        function setIconSize(): void {
            windowWidth = window.innerWidth;

            if (windowWidth < 800) {
                html5Icon.current.style.scale = `${windowWidth * 0.003}`;
                css3Icon.current.style.scale = `${windowWidth * 0.003}`;
                allOtherIcons.forEach((icon): void => {
                    icon.style.scale = `${windowWidth * 0.0005}`;
                })
            } else {
                html5Icon.current.style.scale = `1.596`;
                css3Icon.current.style.scale = `1.596`;
                allOtherIcons.forEach((icon): void => {
                    icon.style.scale = `0.3192`;
                })
            }
        }

        return () => {
            windowWidth = null;
            clearInterval(interval);
            interval = null;
            minute = null;
            allIcons = null;
            allOtherIcons = null;
            clearTimeout(removeHoverTimeoutFunc);
            removeHoverTimeoutFunc = null;
            window.removeEventListener('resize', setIconSize);
        }
        
    }, [])

    return (
        <section id={'skills-section'}>
            <div className={'container'}>
                <p>Initially, I built personal projects to kickstart my journey. However, I soon felt the need for something <span className={'colored-text'}>more difficult,</span> and the idea of building websites for local businesses came to mind. That's when I decided to design and build websites for local businesses, accommodating all their wants and needs.</p>

                <div className={'threeD-icons-container'} ref={firstIconsGrid}>
                    <div className='threeD-icon'>
                        <div className={'html5'} ref={html5Icon}>
                            <div className={'img-wrapper targetHover'}>
                                <img src="icons/html5-logo.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className='threeD-icon'>
                        <div className={'css3'} ref={css3Icon}>
                            <div className={'img-wrapper targetHover'}>
                                <img src="icons/css3-logo.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className='threeD-icon'>
                        <div className={'scss targetHover'}>
                            <div id="tridiv">
                                <div className="scene">
                                    <div className="shape cylinder-1 cyl-1">
                                        <div className="face bm">
                                            <img src='/icons/sass.svg' alt="" />
                                        </div>
                                        <div className="face side s0" />
                                        <div className="face side s1" />
                                        <div className="face side s2" />
                                        <div className="face side s3" />
                                        <div className="face side s4" />
                                        <div className="face side s5" />
                                        <div className="face side s6" />
                                        <div className="face side s18" />
                                        <div className="face side s19" />
                                        <div className="face side s20" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='threeD-icon'>
                        <div className={'javascript targetHover'}>
                            <div id="tridiv">
                                <div className={"scene"}>
                                    <div className={"shape cuboid-1 cub-1"}>
                                        <div className={"face bk"} />
                                        <div className={"face rt"} />
                                        <div className={"face lt"} />
                                        <div className={"face bm"} />
                                        <div className={"face tp"}><span>JS</span></div>
                                        <div className={"cr cr-0"}>
                                            <div className={"face side s0"} />
                                            <div className={"face side s1"} />
                                            <div className={"face side s2"} />
                                            <div className={"face side s3"} />
                                            <div className={"face side s4"} />
                                            <div className={"face side s5"} />
                                            <div className={"face side s6"} />
                                            <div className={"face side s7"} />
                                            <div className={"face side s8"} />
                                            <div className={"face side s9"} />
                                            <div className={"face side s10"} />
                                            <div className={"face side s11"} />
                                            <div className={"face side s12"} />
                                            <div className={"face side s13"} />
                                            <div className={"face side s14"} />
                                            <div className={"face side s15"} />
                                            <div className={"face side s16"} />
                                        </div>
                                        <div className={"cr cr-1"}>
                                            <div className={"face side s0"} />
                                            <div className={"face side s1"} />
                                            <div className={"face side s2"} />
                                            <div className={"face side s3"} />
                                            <div className={"face side s4"} />
                                            <div className={"face side s5"} />
                                            <div className={"face side s6"} />
                                            <div className={"face side s7"} />
                                            <div className={"face side s8"} />
                                            <div className={"face side s9"} />
                                            <div className={"face side s10"} />
                                            <div className={"face side s11"} />
                                            <div className={"face side s12"} />
                                            <div className={"face side s13"} />
                                            <div className={"face side s14"} />
                                            <div className={"face side s15"} />
                                            <div className={"face side s16"} />
                                        </div>
                                        <div className={"cr cr-2"}>
                                            <div className={"face side s0"} />
                                            <div className={"face side s1"} />
                                            <div className={"face side s2"} />
                                            <div className={"face side s3"} />
                                            <div className={"face side s4"} />
                                            <div className={"face side s5"} />
                                            <div className={"face side s6"} />
                                            <div className={"face side s7"} />
                                            <div className={"face side s8"} />
                                            <div className={"face side s9"} />
                                            <div className={"face side s10"} />
                                            <div className={"face side s11"} />
                                            <div className={"face side s12"} />
                                            <div className={"face side s13"} />
                                            <div className={"face side s14"} />
                                            <div className={"face side s15"} />
                                            <div className={"face side s16"} />
                                        </div>
                                        <div className={"cr cr-3"}>
                                            <div className={"face side s0"} />
                                            <div className={"face side s1"} />
                                            <div className={"face side s2"} />
                                            <div className={"face side s3"} />
                                            <div className={"face side s4"} />
                                            <div className={"face side s5"} />
                                            <div className={"face side s6"} />
                                            <div className={"face side s7"} />
                                            <div className={"face side s8"} />
                                            <div className={"face side s9"} />
                                            <div className={"face side s10"} />
                                            <div className={"face side s11"} />
                                            <div className={"face side s12"} />
                                            <div className={"face side s13"} />
                                            <div className={"face side s14"} />
                                            <div className={"face side s15"} />
                                            <div className={"face side s16"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='threeD-icon'>
                        <div className={'typescript targetHover'}>
                            <div id="tridiv">
                                <div className={"scene"}>
                                    <div className={"shape cuboid-1 cub-1"}>
                                        <div className={"face bk"} />
                                        <div className={"face rt"} />
                                        <div className={"face lt"} />
                                        <div className={"face bm"} />
                                        <div className={"face tp"}><span>TS</span></div>
                                        <div className={"cr cr-0"}>
                                            <div className={"face side s0"} />
                                            <div className={"face side s1"} />
                                            <div className={"face side s2"} />
                                            <div className={"face side s3"} />
                                            <div className={"face side s4"} />
                                            <div className={"face side s5"} />
                                            <div className={"face side s6"} />
                                            <div className={"face side s7"} />
                                            <div className={"face side s8"} />
                                            <div className={"face side s9"} />
                                            <div className={"face side s10"} />
                                            <div className={"face side s11"} />
                                            <div className={"face side s12"} />
                                            <div className={"face side s13"} />
                                            <div className={"face side s14"} />
                                            <div className={"face side s15"} />
                                            <div className={"face side s16"} />
                                        </div>
                                        <div className={"cr cr-1"}>
                                            <div className={"face side s0"} />
                                            <div className={"face side s1"} />
                                            <div className={"face side s2"} />
                                            <div className={"face side s3"} />
                                            <div className={"face side s4"} />
                                            <div className={"face side s5"} />
                                            <div className={"face side s6"} />
                                            <div className={"face side s7"} />
                                            <div className={"face side s8"} />
                                            <div className={"face side s9"} />
                                            <div className={"face side s10"} />
                                            <div className={"face side s11"} />
                                            <div className={"face side s12"} />
                                            <div className={"face side s13"} />
                                            <div className={"face side s14"} />
                                            <div className={"face side s15"} />
                                            <div className={"face side s16"} />
                                        </div>
                                        <div className={"cr cr-2"}>
                                            <div className={"face side s0"} />
                                            <div className={"face side s1"} />
                                            <div className={"face side s2"} />
                                            <div className={"face side s3"} />
                                            <div className={"face side s4"} />
                                            <div className={"face side s5"} />
                                            <div className={"face side s6"} />
                                            <div className={"face side s7"} />
                                            <div className={"face side s8"} />
                                            <div className={"face side s9"} />
                                            <div className={"face side s10"} />
                                            <div className={"face side s11"} />
                                            <div className={"face side s12"} />
                                            <div className={"face side s13"} />
                                            <div className={"face side s14"} />
                                            <div className={"face side s15"} />
                                            <div className={"face side s16"} />
                                        </div>
                                        <div className={"cr cr-3"}>
                                            <div className={"face side s0"} />
                                            <div className={"face side s1"} />
                                            <div className={"face side s2"} />
                                            <div className={"face side s3"} />
                                            <div className={"face side s4"} />
                                            <div className={"face side s5"} />
                                            <div className={"face side s6"} />
                                            <div className={"face side s7"} />
                                            <div className={"face side s8"} />
                                            <div className={"face side s9"} />
                                            <div className={"face side s10"} />
                                            <div className={"face side s11"} />
                                            <div className={"face side s12"} />
                                            <div className={"face side s13"} />
                                            <div className={"face side s14"} />
                                            <div className={"face side s15"} />
                                            <div className={"face side s16"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='threeD-icon'>
                        <div className="tailwind targetHover">
                            <div id="tridiv">
                                <div className="scene">
                                    <div className="shape cylinder-1 cyl-1">
                                    <div className="face bm">
                                        <img src="icons/tailwindcss.svg" alt="" />
                                    </div>
                                    <div className="face side s0"></div>
                                    <div className="face side s1"></div>
                                    <div className="face side s2"></div>
                                    <div className="face side s3"></div>
                                    <div className="face side s4"></div>
                                    <div className="face side s5"></div>
                                    <div className="face side s6"></div>
                                    <div className="face side s7"></div>
                                    <div className="face side s8"></div>
                                    <div className="face side s9"></div>
                                    <div className="face side s10"></div>
                                    <div className="face side s11"></div>
                                    <div className="face side s12"></div>
                                    <div className="face side s13"></div>
                                    <div className="face side s14"></div>
                                    <div className="face side s15"></div>
                                    <div className="face side s16"></div>
                                    <div className="face side s17"></div>
                                    <div className="face side s18"></div>
                                    <div className="face side s19"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='threeD-icon'>
                        <div className={'php targetHover'}>
                            <div id="tridiv">
                                <div className={"scene"}>
                                    <div className={"shape cuboid-1 cub-1"}>
                                        <div className={"face bk"} />
                                        <div className={"face rt"} />
                                        <div className={"face lt"} />
                                        <div className={"face bm"} />
                                        <div className={"face tp"}>
                                            <img src="/icons/php.svg" alt="php icon" />
                                        </div>
                                        <div className={"cr cr-0"}>
                                            <div className={"face side s0"} />
                                            <div className={"face side s1"} />
                                            <div className={"face side s2"} />
                                            <div className={"face side s3"} />
                                            <div className={"face side s4"} />
                                            <div className={"face side s5"} />
                                            <div className={"face side s6"} />
                                            <div className={"face side s7"} />
                                            <div className={"face side s8"} />
                                            <div className={"face side s9"} />
                                            <div className={"face side s10"} />
                                            <div className={"face side s11"} />
                                            <div className={"face side s12"} />
                                            <div className={"face side s13"} />
                                            <div className={"face side s14"} />
                                            <div className={"face side s15"} />
                                            <div className={"face side s16"} />
                                        </div>
                                        <div className={"cr cr-1"}>
                                            <div className={"face side s0"} />
                                            <div className={"face side s1"} />
                                            <div className={"face side s2"} />
                                            <div className={"face side s3"} />
                                            <div className={"face side s4"} />
                                            <div className={"face side s5"} />
                                            <div className={"face side s6"} />
                                            <div className={"face side s7"} />
                                            <div className={"face side s8"} />
                                            <div className={"face side s9"} />
                                            <div className={"face side s10"} />
                                            <div className={"face side s11"} />
                                            <div className={"face side s12"} />
                                            <div className={"face side s13"} />
                                            <div className={"face side s14"} />
                                            <div className={"face side s15"} />
                                            <div className={"face side s16"} />
                                        </div>
                                        <div className={"cr cr-2"}>
                                            <div className={"face side s0"} />
                                            <div className={"face side s1"} />
                                            <div className={"face side s2"} />
                                            <div className={"face side s3"} />
                                            <div className={"face side s4"} />
                                            <div className={"face side s5"} />
                                            <div className={"face side s6"} />
                                            <div className={"face side s7"} />
                                            <div className={"face side s8"} />
                                            <div className={"face side s9"} />
                                            <div className={"face side s10"} />
                                            <div className={"face side s11"} />
                                            <div className={"face side s12"} />
                                            <div className={"face side s13"} />
                                            <div className={"face side s14"} />
                                            <div className={"face side s15"} />
                                            <div className={"face side s16"} />
                                        </div>
                                        <div className={"cr cr-3"}>
                                            <div className={"face side s0"} />
                                            <div className={"face side s1"} />
                                            <div className={"face side s2"} />
                                            <div className={"face side s3"} />
                                            <div className={"face side s4"} />
                                            <div className={"face side s5"} />
                                            <div className={"face side s6"} />
                                            <div className={"face side s7"} />
                                            <div className={"face side s8"} />
                                            <div className={"face side s9"} />
                                            <div className={"face side s10"} />
                                            <div className={"face side s11"} />
                                            <div className={"face side s12"} />
                                            <div className={"face side s13"} />
                                            <div className={"face side s14"} />
                                            <div className={"face side s15"} />
                                            <div className={"face side s16"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='threeD-icon'>
                        <div className='laravel targetHover'>
                        <div id="tridiv">
                            <div className="scene">
                                <div className="shape cuboid-2 cub-2">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-5 cub-5">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-3 cub-3">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-1 white-33">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-4 cub-4">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-6 cub-6">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-7 cub-7">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-8 cub-8">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-9 white-31">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-10 cub-10">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-11 cub-11">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-12 white-10">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-13 white-11">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-14 white-12">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-15 white-13">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-16 white-20">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-17 white-14">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-18 white-2">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-19 white-23">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-20 white-24">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-21 white-25">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-22 white-26">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-23 white-27">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-24 white-15">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-25 white-30">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-26 white-32">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-27 white-34">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-28 white-35">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-29 white-28">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-30 white-29">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-31 white-36">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-32 white-37">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-33 white-38">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-34 white-39">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-35 white-40">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-36 white-41">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                                <div className="shape cuboid-37 cub-9">
                                <div className="face ft"></div>
                                <div className="face bk"></div>
                                <div className="face rt"></div>
                                <div className="face lt"></div>
                                <div className="face bm"></div>
                                <div className="face tp"></div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p>
                This decision pushed me much faster to learn uncharted territories in the field, and even dwelling outside of it, and sometimes, delve deep into the outside parts of it. The experience I have gotten there escalated my <span className={'colored-text'}>sophistication</span> in the field.
                </p>

                <div className={'threeD-icons-container'} ref={secondIconsGrid}>
                    <div className='threeD-icon'>
                        <div className="git targetHover">
                            <div id="tridiv">
                                <div className="scene">
                                    <div className="shape cuboid-1 cub-1">
                                        <div className="face ft" />
                                        <div className="face bm">
                                            <img src="/icons/git-icon.svg" alt="" />
                                        </div>
                                        <div className="cr cr-0">
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
                    <div className='threeD-icon'>
                        <div className="nunjucks targetHover">
                            <div id="tridiv">
                                <div className="scene">
                                    <div className="shape cuboid-1 cub-1">
                                        <div className="face ft" />
                                        <div className="face rt" />
                                        <div className="face lt" />
                                        <div className="face bm">
                                            <img src="icons/nunjucks-icon.svg" alt="" />
                                        </div>
                                        <div className="cr cr-0">
                                            <div className="face side s0" />
                                            <div className="face side s1" />
                                            <div className="face side s2" />
                                            <div className="face side s3" />
                                            <div className="face side s4" />
                                        </div>
                                        <div className="cr cr-1">
                                            <div className="face side s0" />
                                            <div className="face side s1" />
                                            <div className="face side s2" />
                                            <div className="face side s3" />
                                            <div className="face side s4" />
                                        </div>
                                        <div className="cr cr-2">
                                            <div className="face side s0" />
                                            <div className="face side s1" />
                                            <div className="face side s2" />
                                            <div className="face side s3" />
                                            <div className="face side s4" />
                                        </div>
                                        <div className="cr cr-3">
                                            <div className="face side s0" />
                                            <div className="face side s1" />
                                            <div className="face side s2" />
                                            <div className="face side s3" />
                                            <div className="face side s4" />
                                        </div>
                                    </div>
                                </div>
                            </div>                              
                        </div>
                    </div>
                    <div className='threeD-icon'>
                        <div className="react targetHover">
                            <div id="tridiv">
                                <div className="scene">
                                    <div className="shape cylinder-1 cyl-1">
                                        <div className="face bm">
                                            <img src="icons/react-icon.svg" alt="" />
                                        </div>
                                        <div className="face side s0" />
                                        <div className="face side s1" />
                                        <div className="face side s2" />
                                        <div className="face side s3" />
                                        <div className="face side s4" />
                                        <div className="face side s5" />
                                        <div className="face side s18" />
                                        <div className="face side s19" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='threeD-icon'>
                        <div className="nextjs targetHover">
                            <div id="tridiv">
                                <div className="scene">
                                    <div className="shape cylinder-1 cyl-1">
                                    <div className="face bm">
                                        <img src="icons/next-js.svg" alt="" />
                                    </div>
                                    <div className="face side s0"></div>
                                    <div className="face side s1"></div>
                                    <div className="face side s2"></div>
                                    <div className="face side s3"></div>
                                    <div className="face side s4"></div>
                                    <div className="face side s5"></div>
                                    <div className="face side s6"></div>
                                    <div className="face side s7"></div>
                                    <div className="face side s8"></div>
                                    <div className="face side s9"></div>
                                    <div className="face side s10"></div>
                                    <div className="face side s11"></div>
                                    <div className="face side s12"></div>
                                    <div className="face side s13"></div>
                                    <div className="face side s14"></div>
                                    <div className="face side s15"></div>
                                    <div className="face side s16"></div>
                                    <div className="face side s17"></div>
                                    <div className="face side s18"></div>
                                    <div className="face side s19"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}