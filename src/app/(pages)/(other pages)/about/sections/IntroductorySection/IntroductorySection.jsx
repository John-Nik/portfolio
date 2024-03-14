'use client'
import './styling.scss';
import { useEffect } from 'react';

export default function IntroductorySection() {
    useEffect(() => {
        window.addEventListener('scroll', getScrollPercent);
    }, [])

    function changeBackgroundColor(userScrolledPagePercentage) {
        const footer = document.querySelector('footer');

        let percentageOfSectionScrolled = (userScrolledPagePercentage - 40) * 4,
            lightLevelHSL = 5 - (percentageOfSectionScrolled * 0.03),
            H = 206,
            S = 92 / 100,
            L = lightLevelHSL / 100;

        if (L < 0.0204) {
            L = 0.0204;
        }

        if (L > 0.055) {
            L = 0.055;
        }

        let rgbColors = hslToRgb(H, S, L);

        footer.style.backgroundColor = `rgba(${rgbColors}, 0.97)`;
    }

    function hslToRgb(H, S, L) {
        let d = S * (1 - Math.abs(2 * L - 1)),
            m = 255 * (L - (d / 2)),
            x = d * (1 - Math.abs(((H / 60) % 2) - 1)),
            // R = m because 180 <= H <= 240
            R = m,
            G = 255 * x + m,
            B = 255 * d + m,
            RGB = `${R}, ${G}, ${B}`;
        
        return RGB;
    }
   
    function getScrollPercent() {
        let h = document.documentElement, 
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';

        let percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;

        if (percent > 40) {
            changeBackgroundColor(percent);
        }
    }


    return (
        <section id="introduction">
            <div className={"container"}>
                <h1 className={'title'}>// About Me</h1>
                <div className={'about-me-wrapper'}>
                    <span className={'about-me'}>My name is Giannis, and I'm a front-end developer</span>
                    <span className={'smalltext'}>(and a part time philosopher)</span>
                </div>
            </div>
        </section>
    )
}