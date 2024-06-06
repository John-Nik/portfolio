'use client';
import { useEffect, useState } from "react";
import './styling.scss';
import Script from 'next/script';
import './minesweeper.scss';
import { useInView } from 'react-intersection-observer';
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import('./Canvas'), {ssr: false})

interface Direction {
    direction: 'DOWN' | 'UP';
}

export default function MinesweeperSection() {
    const [exitPosition, setExitPosition] = useState<Direction>({direction: 'DOWN'});
    const [ref] = useInView({
        threshold: 0.3,
        onChange: (isVisible, intersectionObject) => {
            const textContent = intersectionObject.target as HTMLParagraphElement;
            const viewportOffset = textContent.getBoundingClientRect().top;

            if (exitPosition.direction === 'DOWN') {
                textContent.style.transform = 'translateY(75px)';
            } else {
                textContent.style.transform = 'translateY(-75px)';
            }

            if (isVisible) {
                textContent.classList.add('show');
            } else {
                textContent.classList.remove('show');
            }

            if (textContent.classList.contains('show')) {
                textContent.style.transform = 'translateY(0px)';
            }

            if (viewportOffset < 0) {
                setExitPosition({direction: 'UP'});
            } else {
                setExitPosition({direction: 'DOWN'});
            }    
        }
    });

    useEffect((): ()=>void => {
        const homepageMinesweeper: HTMLDivElement = document.querySelector('.is-minesweeper-playing-in-homepage');
        const aboutMePageMinesweeper: HTMLDivElement = document.querySelector('.is-minesweeper-playing-in-about-page');
        const textContent = document.querySelector('.hyphenate');
        const textContentObserver = new IntersectionObserver((element) => {
            if (element[0].isIntersecting) {
                element[0].target.classList.add('show');
            }
        })


        aboutMePageMinesweeper.innerHTML = '<div></div>';
        homepageMinesweeper != null ? homepageMinesweeper.innerHTML = '' : '';

        textContentObserver.observe(textContent);

        return () => {
            textContentObserver.unobserve(textContent);
        }
    }, [])

    return (
        <section id={'minesweeper-section'}>
            <Canvas />

            <div className={'text-content'}>
                <p lang="en-us" className={'hyphenate'} ref={ref}>I had found myself in a situation that pushed me to learn web development. <span className={'break-line'}></span>Without knowing, this experience ignited a passion within me for the whole process, from building simple HTML to learning complex algorithms, connecting backend with frontend, figuring how networks work and setting them up, all in the efforts of continually seeking <span className={'colored-text'}>more</span> knowledge, <span className={'colored-text'}>more</span> challenges, <span className={'colored-text'}>more</span> unknowns, leading to <span className={'colored-text'}>more proficiency</span> in the field.</p>
            </div>
            
            <Script src="scripts/handle-about-me-minesweeper-section-text-screen-resize.js" strategy="lazyOnload" />
        </section>
    )
}