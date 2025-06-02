'use client';
import { ReactElement, useRef, useEffect } from "react";
import DownloadCVButton from "../../../buttons/DownloadCVButton";

export default function TextContent(): ReactElement {
    const workTitle = useRef(null);

    useEffect(() => {
        const timer = 70;
        const titles = [' a Front-End Devel', ' a Back-End Dev', ' a Full-Stack Developer'];
        let arrayIndex = 0;
        let charAtIndex = 0;
        let strArr: string[] = [];
        let addingChars = true;
        let interval: NodeJS.Timeout;

        const homepageMinesweeper = document.querySelector('.is-minesweeper-playing-in-homepage');
        const aboutMePageMinesweeper = document.querySelector('.is-minesweeper-playing-in-about-page');
        
        homepageMinesweeper.innerHTML = '<div></div>';
        aboutMePageMinesweeper.innerHTML = '';

        const updateTitle = (title: HTMLSpanElement) => (title.textContent = strArr.join(''));

        function animateTitle(title: any) {
            const currentTitle = titles[arrayIndex];

            if (arrayIndex === titles.length - 1 && strArr.length === currentTitle.length + 1) {
                clearInterval(interval);

                const popChar = () => {
                    strArr.pop();
                    updateTitle(title);
                    setTimeout(() => {
                        strArr.push('|');
                        updateTitle(title);
                    }, 1000);
                };

                popChar();
                let interval2 = setInterval(popChar, 2000);

                setTimeout(() => {
                    clearInterval(interval2);
                    setTimeout(() => {
                        strArr.pop();
                        updateTitle(title);
                    }, 1000);
                }, 4000);
                return;
            }

            if (addingChars) {
                if (charAtIndex < currentTitle.length) {
                    strArr.pop();
                    strArr.push(currentTitle[charAtIndex], '|');
                    updateTitle(title);
                    charAtIndex++;
                } else {
                    clearInterval(interval);
                    addingChars = false;
                    setTimeout(() => {
                        interval = setInterval(() => animateTitle(title), timer);
                    }, 250);
                }
            } else {
                if (charAtIndex === 2) {
                    arrayIndex++;
                    addingChars = true;
                    return;
                }
                strArr.pop();
                strArr.pop();
                strArr.push('|');
                updateTitle(title);
                charAtIndex--;
            }
        }

        interval = setInterval(() => animateTitle(workTitle.current), timer);

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className={'textContent'}>
                <span className={'topper'}>Hello, my name is</span>
                <h1 className={'title'}>Giannis Nikolaou</h1>
                <h2 className={'work'} ref={workTitle}></h2>
                <div className={'buttons-container'}>
                    <a href={'/contact.html'} className={'get-in-touch-button'}>
                        <div className={'GIT-wrapper'}>
                            <span>Get in touch</span>
                        </div>
                    </a>
                    <DownloadCVButton />
                    <button className={'show-settings-panel-button'}>
                        Start-Game
                    </button>
                </div>
            </div>
        </>
    )
}