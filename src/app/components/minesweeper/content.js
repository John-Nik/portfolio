'use client'
import './content.scss'

export default function Content() {
    function startGame() {
        const container = document.querySelector('.container');
        const containerWidth = container.offsetWidth;
        const gameStart = document.querySelector('.user-initiated-game-start');
        const textContentWrapper = document.querySelector('.textContent');
        const gameControlPanel = document.querySelector('.gameSettings');
        const smileyFace = document.querySelector('.dead-smiley-wrapper');

        smileyFace.style.display = 'none';

        if (containerWidth >= 720) {
            textContentWrapper.style.opacity = '0';
            gameControlPanel.style.opacity = '0';
            setTimeout(() => {
                textContentWrapper.style.display = 'none';
                gameControlPanel.style.display = 'none';
            }, 500)
        }


        gameStart.innerHTML = '<div></div>';
    }

    function changeDifficulty(clickedbutton) {
        const buttons = document.querySelectorAll('.difficulty-feedback');
        buttons.forEach((button) => {
            button.classList.remove('active');
        })

        clickedbutton.currentTarget.classList.add('active');
    }

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
                        <h2 className={'work'}> a front-end developer</h2>
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
                        </div>
                    </div>

                    <div className={'user-initiated-game-start'} aria-hidden={'true'}></div>

                    

                    <div className={'gameSettings'}>
                        <div className={'wrapper'}>
                            <div className={'bolt-container'} aria-hidden={'true'}>
                                <img id={'bolt1'} src='/icons/bolt.svg' />
                                <img id={'bolt2'} src='/icons/bolt.svg' />
                                <img id={'bolt3'} src='/icons/bolt.svg' />
                                <img id={'bolt4'} src='/icons/bolt.svg' />
                            </div>

                            <div className={'game-settings-wrapper'}>
                                <div className={'game-instructions'}>
                                    <span>
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