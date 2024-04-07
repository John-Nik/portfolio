'use client'
import { ReactElement, useEffect } from 'react';
import DownloadCVButton from '../buttons/DownloadCVButton';

export default function Content(): ReactElement {
    function startGame(): void {
        const gameStart: HTMLDivElement = document.querySelector('.user-initiated-game-start');
        const smileyFace: HTMLDivElement = document.querySelector('.dead-smiley-wrapper');

        smileyFace.style.display = 'none';
        gameStart.innerHTML = '<div></div>';

        hidePanels();
    }



    function hidePanels(): void {
        const textContentWrapper: HTMLDivElement = document.querySelector('.textContent');
        const gameControlPanel: HTMLDivElement = document.querySelector('.gameSettings');

        textContentWrapper.style.opacity = '0';
        gameControlPanel.style.opacity = '0';
        setTimeout((): void => {
            textContentWrapper.style.display = 'none';
            gameControlPanel.style.display = 'none';
        }, 500)
    }



    function changeDifficulty(clickedbutton: { 
        currentTarget: HTMLSpanElement
    }): void {
        const buttons: HTMLSpanElement[] = Array.from(document.querySelectorAll('.difficulty-feedback'));
        buttons.forEach((button): void => {
            button.classList.remove('active');
        })

        clickedbutton.currentTarget.classList.add('active');
    }



    function showSettingsPanel(): void {
        const informationPanel: HTMLDivElement = document.querySelector('.textContent');
        const settingsPanel: HTMLDivElement = document.querySelector('.gameSettings');
        const footerIconsContainer: HTMLUListElement = document.querySelector('.footer-links-container');
        const socialsIcon: HTMLLIElement = document.querySelector('.socials-icon-wrap');
        const flagIcon: HTMLLIElement = document.querySelector('.flag-icon-wrap');

        footerIconsContainer.classList.toggle('hide-icons');
        socialsIcon.classList.toggle('show');
        flagIcon.classList.toggle('show');


        informationPanel.style.opacity = '0';
        setTimeout((): void => {
            informationPanel.style.display = 'none';
            settingsPanel.style.display = 'flex';

            setTimeout((): void => {
                settingsPanel.style.opacity = '1';
            }, 20)
        }, 200)
    }



    useEffect((): void => {
        const homepageMinesweeper: HTMLDivElement = document.querySelector('.is-minesweeper-playing-in-homepage');
        const aboutMePageMinesweeper: HTMLDivElement = document.querySelector('.is-minesweeper-playing-in-about-page');

        homepageMinesweeper.innerHTML = '<div></div>';
        aboutMePageMinesweeper != null ? aboutMePageMinesweeper.innerHTML = '' : '';


        // cannot place it in its own function since the values aren't stored unless I use useState, and the problem with that is that it will continuously loop over the other 2 functions, putting unnecessary strain on the cpu, so writing the code inside the useEffect, and making it more difficult to understand is the better solution
        let timer: number = 70;
        let titles: string[] = [' a UI Designer', ' a UX Des', ' a front-end developer'];
        let arrayIndex: number = 0;
        let charAtIndex: number = 0;
        let stringPrintedArray: string[] = [];
        let stringPrinted: string = '';
        let isFuncAddingChars: boolean = true;
        let interval = setInterval(animateTitle, timer);
        const workTitle: HTMLHeadingElement = document.querySelector('.work');
        

        animateTitle();
        function animateTitle(): void {
            if ( arrayIndex == titles.length - 1) {
                if ( stringPrintedArray.length == titles[arrayIndex].length + 1 ) {
                    const popCharacter = (): void => {
                        stringPrintedArray.pop();
                        stringPrinted = stringPrintedArray.join('');
                        workTitle.textContent = stringPrinted;
                        setTimeout(pushCharacter, 1000);
                    }

                    const pushCharacter = (): void => {
                        stringPrintedArray.push('|')
                        stringPrinted = stringPrintedArray.join('');
                        workTitle.textContent = stringPrinted;
                    }

                    popCharacter();
                    stringPrinted = stringPrintedArray.join('');
                    workTitle.textContent = stringPrinted;
                    clearInterval(interval);
                    
                    let interval2 = setInterval(popCharacter, 2000);

                    setTimeout(() => {
                        clearInterval(interval2)

                        setTimeout(() => {
                            stringPrintedArray.pop();
                            stringPrinted = stringPrintedArray.join('');
                            workTitle.textContent = stringPrinted;
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
                    workTitle.textContent = stringPrinted;
                    charAtIndex++;
                } else {
                    clearInterval(interval);
                    isFuncAddingChars = false;
                    setTimeout(() => {
                        interval = setInterval(animateTitle, timer);
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
                workTitle.textContent = stringPrinted;
                charAtIndex = charAtIndex - 1;
            }
        }
    }, [])

    return (
        <>
            <div className={'bombs-placed-container'}>
                <div className={'wrapper'}>
                    <span className={'bombs-placed-title'}>// Bombs Placed</span>
                    <span className={'bombs-placed-text'}>// 465</span>
                </div>
            </div>
            <div id={'content'}>
                <div className={'container'}>

                    <div className={'textContent'}>
                        <span className={'topper'}>Hello, my name is</span>
                        <h1 className={'title'}>Giannis Nikolaou</h1>
                        <h2 className={'work'}></h2>
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

                    <div className={'user-initiated-game-start'} aria-hidden={'true'}></div>

                    

                    <div className={'gameSettings'}>
                        <div className={'wrapper game-settings-container'}>
                            <div className={'bolt-container'} aria-hidden={'true'}>
                                <img id={'bolt1'} src='/icons/bolt.svg' alt="" />
                                <img id={'bolt2'} src='/icons/bolt.svg' alt="" />
                                <img id={'bolt3'} src='/icons/bolt.svg' alt="" />
                                <img id={'bolt4'} src='/icons/bolt.svg' alt="" />
                            </div>

                            <div className={'game-settings-wrapper'}>
                                <div className={'game-instructions'}>
                                    <span className={'game-instructions-span'}>
                                        // Left click to dig square
                                        <br />
                                        // Right click to flag square
                                    </span>
                                </div>

                                <div className={'settings'}>
                                    <div className={'difficulty-wrapper'}>
                                        <span className={'difficulty //'}>// Difficulty</span>
                                        <div className={'difficulty-options-wrapper'}>
                                            <span className={'difficulty-feedback'} onClick={changeDifficulty} data-difficulty={0}>Easy</span>
                                            <span className={'difficulty-feedback active'} onClick={changeDifficulty} data-difficulty={1}>Normal</span>
                                            <span className={'difficulty-feedback'} onClick={changeDifficulty} data-difficulty={2}>Hard</span>
                                            <span className={'difficulty-feedback'} onClick={changeDifficulty} data-difficulty={3}>Challenging</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={'start-game-button-wrapper'}>
                                    <button onClick={startGame} className={'start-game-button'}>start-game</button>
                                    <div className={'end-game-status'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}