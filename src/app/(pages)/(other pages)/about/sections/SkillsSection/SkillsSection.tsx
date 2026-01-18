'use client';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Css3Icon from './Icons/Css3/Css3Icon';
import GitIcon from './Icons/Git/GitIcon';
import Html5Icon from './Icons/Html5/Html5Icon';
import JavascriptIcon from './Icons/Javascript/JavascriptIcon';
import LaravelIcon from './Icons/Laravel/LaravelIcon';
import NextjsIcon from './Icons/Nextjs/NextjsIcon';
import NunjucksIcon from './Icons/Nunjucks/NunjucksIcon';
import PhpIcon from './Icons/Php/PhpIcon';
import ReactIcon from './Icons/React/ReactIcon';
import ScssIcon from './Icons/Scss/ScssIcon';
import TailwindIcon from './Icons/Tailwind/TailwindIcon';
import TypescriptIcon from './Icons/Typescript/TypescriptIcon';

export default function SkillsSection() {
    const html5Icon = useRef<HTMLDivElement | null>(null);
    const css3Icon = useRef<HTMLDivElement | null>(null);

    const iconsGridClasses =
        'threeD-icons-container grid w-full h-fit grid-cols-2 gap-6 mt-16 mb-[240px] min-[1080px]:grid-cols-4 ' +
        '[&_.threeD-icon]:flex [&_.threeD-icon]:justify-center [&_.threeD-icon]:items-start [&_.threeD-icon]:w-full ' +
        '[&_.threeD-icon]:h-[200px] [&_.threeD-icon]:max-w-[200px] [&_.threeD-icon]:overflow-visible ' +
        '[&_.threeD-icon]:justify-self-center [&_.threeD-icon]:self-center [&_.threeD-icon]:opacity-0 ' +
        '[&_.threeD-icon]:transition-opacity [&_.threeD-icon]:duration-200 ' +
        '[&_.threeD-icon]:ease-[cubic-bezier(0.445,0.05,0.55,0.95)] [&.show_.threeD-icon]:opacity-100 ' +
        '[&.show_.threeD-icon:nth-child(1)]:delay-[0ms] [&.show_.threeD-icon:nth-child(2)]:delay-[200ms] ' +
        '[&.show_.threeD-icon:nth-child(3)]:delay-[400ms] [&.show_.threeD-icon:nth-child(4)]:delay-[600ms] ' +
        '[&.show_.threeD-icon:nth-child(5)]:delay-[800ms] [&.show_.threeD-icon:nth-child(6)]:delay-[1000ms] ' +
        '[&.show_.threeD-icon:nth-child(7)]:delay-[1200ms] [&.show_.threeD-icon:nth-child(8)]:delay-[1400ms] ' +
        '[&.show_.threeD-icon:nth-child(9)]:delay-[1600ms] [&.show_.threeD-icon:nth-child(10)]:delay-[1800ms]';

    const [firstIconsGrid] = useInView({
        threshold: 0.3,
        onChange: (isVisible, intersectionObject) => {
            const iconsGrid = intersectionObject.target;

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
            const iconsGrid = intersectionObject.target;

            if (isVisible) {
                iconsGrid.classList.add('show');
            } else {
                iconsGrid.classList.remove('show');
            }
        }
    });

    useEffect(() => {
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
                randomSelect.classList.remove('hover');
            }, minute / 15);
        }

        window.addEventListener('resize', setIconSize);

        setIconSize();
        function setIconSize(): void {
            windowWidth = window.innerWidth;

            if (!html5Icon.current || !css3Icon.current) {
                return;
            }

            if (windowWidth < 800) {
                html5Icon.current.style.scale = `${windowWidth * 0.003}`;
                css3Icon.current.style.scale = `${windowWidth * 0.003}`;
                allOtherIcons.forEach((icon): void => {
                    icon.style.scale = `${windowWidth * 0.0005}`;
                });
            } else {
                html5Icon.current.style.scale = '1.596';
                css3Icon.current.style.scale = '1.596';
                allOtherIcons.forEach((icon): void => {
                    icon.style.scale = '0.3192';
                });
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
        };
        
    }, []);

    return (
        <section
            id="skills-section"
            className="flex justify-center items-end bg-[linear-gradient(180deg,rgba(1,14,25,1)_0%,rgba(0,6,10,1)_20%)] w-full h-fit"
        >
            <div className="relative flex flex-col justify-end items-center mt-[500px] px-6 w-full max-w-[1100px] h-fit container">
                <p className="mb-10 w-full h-fit font-[family-name:var(--fira-code)] text-[rgba(255,255,255,0.78)] lg:text-2xl text-left hyphens-auto">
                    Initially, I built personal projects to kickstart my journey. However, I soon felt the need for something <span className="text-secondary-tint-2">more difficult,</span> and the idea of building websites for local businesses came to mind. That&apos;s when I decided to design and build websites for local businesses, accommodating all their wants and needs.
                </p>

                <div
                    className={iconsGridClasses}
                    ref={firstIconsGrid}
                >
                    <Html5Icon iconRef={html5Icon} />
                    <Css3Icon iconRef={css3Icon} />
                    <ScssIcon />
                    <JavascriptIcon />
                    <TypescriptIcon />
                    <TailwindIcon />
                    <PhpIcon />
                    <LaravelIcon />
                </div>

                <p className="mb-10 w-full h-fit font-[family-name:var(--fira-code)] text-[rgba(255,255,255,0.78)] lg:text-2xl text-left hyphens-auto">
                    This decision pushed me much faster to learn uncharted territories in the field, and even dwelling outside of it, and sometimes, delve deep into the outside parts of it. The experience I have gotten there escalated my <span className="text-secondary-tint-2">sophistication</span> in the field.
                </p>

                <div
                    className={iconsGridClasses}
                    ref={secondIconsGrid}
                >
                    <GitIcon />
                    <NunjucksIcon />
                    <ReactIcon />
                    <NextjsIcon />
                </div>
            </div>
        </section>
    );
}
