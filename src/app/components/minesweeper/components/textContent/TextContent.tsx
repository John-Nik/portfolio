'use client';
import { ReactElement, useRef, useEffect } from "react";
import DownloadCVButton from "../../../buttons/DownloadCVButton";

export default function TextContent(): ReactElement {
    const informationPanel = useRef(null);
    const workTitle = useRef(null);




    useEffect(() => {
        let timer: number = 70;
        let titles: string[] = [' a UI/UX Designer', ' a website builder', ' a front-end developer'];
        let arrayIndex: number = 0;
        let charAtIndex: number = 0;
        let stringPrintedArray: string[] = [];
        let stringPrinted: string = '';
        let isFuncAddingChars: boolean = true;
        let interval = setInterval(() => animateTitle(workTitle.current), timer);
        const homepageMinesweeper: HTMLDivElement = document.querySelector('.is-minesweeper-playing-in-homepage');
        const aboutMePageMinesweeper: HTMLDivElement = document.querySelector('.is-minesweeper-playing-in-about-page');
    
        homepageMinesweeper.innerHTML = '<div></div>';
        aboutMePageMinesweeper != null ? aboutMePageMinesweeper.innerHTML = '' : '';

        function animateTitle(title: any): void {
            if ( arrayIndex == titles.length - 1) {
                if ( stringPrintedArray.length == titles[arrayIndex].length + 1 ) {
                    const popCharacter = (): void => {
                        stringPrintedArray.pop();
                        stringPrinted = stringPrintedArray.join('');
                        title.textContent = stringPrinted;
                        setTimeout(pushCharacter, 1000);
                    }
    
                    const pushCharacter = (): void => {
                        stringPrintedArray.push('|')
                        stringPrinted = stringPrintedArray.join('');
                        title.textContent = stringPrinted;
                    }
    
                    popCharacter();
                    stringPrinted = stringPrintedArray.join('');
                    title.textContent = stringPrinted;
                    clearInterval(interval);
                    
                    let interval2 = setInterval(popCharacter, 2000);
    
                    setTimeout(() => {
                        clearInterval(interval2)
    
                        setTimeout(() => {
                            stringPrintedArray.pop();
                            stringPrinted = stringPrintedArray.join('');
                            title.textContent = stringPrinted;
                        }, 1000)
                    }, 4000)
                    return;
                }
            }
    
            if (isFuncAddingChars) {
                if ( charAtIndex != titles[arrayIndex].length) {
                    stringPrintedArray.pop();
                    stringPrintedArray.push(titles[arrayIndex].charAt(charAtIndex));
                    stringPrintedArray.push('|');
                    stringPrinted = stringPrintedArray.join('');
                    title.textContent = stringPrinted;
                    charAtIndex++;
                } else {
                    clearInterval(interval);
                    isFuncAddingChars = false;
                    setTimeout(() => {
                        interval = setInterval(() => animateTitle(title), timer);
                    }, 250)
                }
            } else {
                if ( charAtIndex == 2 ) {
                    arrayIndex++;
                    isFuncAddingChars = true;
                    return;
                }
    
                stringPrintedArray.pop();
                stringPrintedArray.pop();
                stringPrintedArray.push('|');
                stringPrinted = stringPrintedArray.join('');
                title.textContent = stringPrinted;
                charAtIndex = charAtIndex - 1;
            }
        }
    }, [])
    



    function showSettingsPanel(): void {
        const settingsPanel: HTMLDivElement = document.querySelector('.gameSettings');
        const footerIconsContainer: HTMLUListElement = document.querySelector('.footer-links-container');
        const socialsIcon: HTMLLIElement = document.querySelector('.socials-icon-wrap');
        const flagIcon: HTMLLIElement = document.querySelector('.flag-icon-wrap');

        footerIconsContainer.classList.toggle('hide-icons');
        socialsIcon.classList.toggle('show');
        flagIcon.classList.toggle('show');


        informationPanel.current.style.opacity = '0';
        setTimeout((): void => {
            informationPanel.current.style.display = 'none';
            settingsPanel.style.display = 'flex';

            setTimeout((): void => {
                settingsPanel.style.opacity = '1';
            }, 20)
        }, 200)
    }

    



    return (
        <>
            <div className={'textContent'} ref={informationPanel}>
                <span className={'topper'}>Hello, my name is</span>
                <h1 className={'title'}>Giannis Nikolaou</h1>
                <h2 className={'work'} ref={workTitle}></h2>
                <div className={'buttons-container'}>
                    <a href={'/contactMe.html'} className={'get-in-touch-button'}>
                        <div className={'GIT-wrapper'}>
                            <span>Get in touch</span>
                        </div>
                    </a>
                    <DownloadCVButton />
                    <button onClick={showSettingsPanel} className={'show-settings-panel-button'}>
                        Start-Game
                    </button>
                </div>
            </div>
        </>
    )
}