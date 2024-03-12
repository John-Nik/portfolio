'use client'
import { useEffect } from 'react';

export default function Content() {
    function startGame() {
        const container = document.querySelector('.container');
        const containerWidth = container.offsetWidth;
        const gameStart = document.querySelector('.user-initiated-game-start');
        const textContentWrapper = document.querySelector('.textContent');
        const gameControlPanel = document.querySelector('.gameSettings');
        const smileyFace = document.querySelector('.dead-smiley-wrapper');

        smileyFace.style.display = 'none';

        textContentWrapper.style.opacity = '0';
        gameControlPanel.style.opacity = '0';
        setTimeout(() => {
            textContentWrapper.style.display = 'none';
            gameControlPanel.style.display = 'none';
        }, 500)


        gameStart.innerHTML = '<div></div>';
        console.log('game begun')
    }



    function placeBoltsInCorrectPositions() {
        const bolt2 = document.querySelector('#bolt2');
        const bolt4 = document.querySelector('#bolt4');
        const gameSettingsPanel = document.querySelector('.game-settings-container');
        let panelHeight;

        panelHeight = gameSettingsPanel.offsetHeight;
        let desiredMarginTop = panelHeight * 1 - 35 + 'px';

        bolt2.style.marginTop = desiredMarginTop;
        bolt4.style.marginTop = desiredMarginTop;
    }



    function setBoardHeight() {
        const minesweeperContainer = document.querySelector('#minesweeper-container');
        let containerHeight = '';

        if (window.innerWidth < 1200) {
            containerHeight = window.innerHeight - 64 - 58 -1 + 'px';
        } else {
            containerHeight = window.innerHeight - 90 - 58 -1 + 'px';
        }

        minesweeperContainer.style.height = containerHeight;

        window.addEventListener('resize', () => {
            if (window.innerWidth < 1200) {
                containerHeight = window.innerHeight - 64 - 58 -1 + 'px';
            } else {
                containerHeight = window.innerHeight - 90 - 58 -1 + 'px';
            }

            minesweeperContainer.style.height = containerHeight;
        })
    }



    function changeDifficulty(clickedbutton) {
        const buttons = document.querySelectorAll('.difficulty-feedback');
        buttons.forEach((button) => {
            button.classList.remove('active');
        })

        clickedbutton.currentTarget.classList.add('active');
    }



    function showSettingsPanel() {
        const informationPanel = document.querySelector('.textContent');
        const settingsPanel = document.querySelector('.gameSettings');
        const footerIconsContainer = document.querySelector('.footer-links-container');
        const socialsIcon = document.querySelector('.socials-icon-wrap');
        const flagIcon = document.querySelector('.flag-icon-wrap');

        footerIconsContainer.classList.toggle('hide-icons');
        socialsIcon.classList.toggle('show');
        flagIcon.classList.toggle('show');


        informationPanel.style.opacity = '0';
        setTimeout(() => {
            informationPanel.style.display = 'none';
            settingsPanel.style.display = 'flex';
            placeBoltsInCorrectPositions();

            setTimeout(() => {
                settingsPanel.style.opacity = '1';
            }, 20)
        }, 200)
    }



    useEffect(() => {
        placeBoltsInCorrectPositions();
        setBoardHeight();


        const homepageMinesweeper = document.querySelector('.is-minesweeper-playing-in-homepage');
        const aboutMePageMinesweeper = document.querySelector('.is-minesweeper-playing-in-about-page');

        homepageMinesweeper.innerHTML = '<div></div>';
        aboutMePageMinesweeper != null ? aboutMePageMinesweeper.innerHTML = '' : '';


        // cannot place it in its own function since the values aren't stored unless I use useState, and the problem with that is that it will continuously loop over the other 2 functions, putting unnecessary strain on the cpu, so writing the code inside the useEffect, and making it more difficult to understand is the better solution
        let timer = 70;
        let titles = [' a UI Designer', ' a UX Des', ' a front-end developer'];
        let arrayIndex = 0;
        let charAtIndex = 0;
        let stringPrintedArray = [];
        let stringPrinted = '';
        let isFuncAddingChars = true;
        let interval = setInterval(animateTitle, timer);
        const workTitle = document.querySelector('.work');
        

        animateTitle();
        function animateTitle() {
            if ( arrayIndex == titles.length - 1) {
                if ( stringPrintedArray.length == titles[arrayIndex].length + 1 ) {
                    popCharacter();
                    stringPrinted = stringPrintedArray.join('');
                    workTitle.textContent = stringPrinted;
                    clearInterval(interval);
                    
                    function popCharacter() {
                        stringPrintedArray.pop();
                        stringPrinted = stringPrintedArray.join('');
                        workTitle.textContent = stringPrinted;
                        setTimeout(pushCharacter, 1000);
                    }

                    function pushCharacter() {
                        stringPrintedArray.push('|')
                        stringPrinted = stringPrintedArray.join('');
                        workTitle.textContent = stringPrinted;
                    }

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
                            <a href={'/cv/Giannis_Nikolaou_CV.pdf'} download className={'download-cv-button'}>
                                <div className={'DC-wrapper'}>
                                    <div className={'background'}></div>
                                    <span>Download CV</span>
                                </div>
                            </a>
                            <button onClick={showSettingsPanel} className={'show-settings-panel-button'}>
                                Start-Game
                            </button>
                        </div>
                    </div>

                    <div className={'user-initiated-game-start'} aria-hidden={'true'}></div>

                    

                    <div className={'gameSettings'}>
                        <div className={'wrapper game-settings-container'}>
                            <div className={'bolt-container'} aria-hidden={'true'}>
                                <img id={'bolt1'} src='/icons/bolt.svg' />
                                <img id={'bolt2'} src='/icons/bolt.svg' />
                                <img id={'bolt3'} src='/icons/bolt.svg' />
                                <img id={'bolt4'} src='/icons/bolt.svg' />
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