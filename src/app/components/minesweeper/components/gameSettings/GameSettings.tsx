'use client';
import { ReactElement, useRef, useEffect } from "react";
import { useInView } from 'react-intersection-observer';


export default function GameSettings(): ReactElement {
    const startGameButton = useRef(null);
    const gameControlPanel = useRef(null);
    const [difficultiesWrapper] = useInView({
        triggerOnce: true,
        onChange: (inView, intersectionObserverObject) => {
            if (inView) {
                setTimeout(() => {
                    intersectionObserverObject.target.childNodes.forEach((child: HTMLSpanElement) => {
                        child.classList.add('show');
                    })
    
                    startGameButton.current.classList.add('show');
                }, 100)
            }
        }
    })
    

    function startGame(): void {
        const smileyFace: HTMLDivElement = document.querySelector('.dead-smiley-wrapper');
        const userInitiatedGameStart = document.querySelector('.user-initiated-game-start');

        smileyFace.style.display = 'none';
        userInitiatedGameStart.innerHTML = '<div></div>';

        hidePanels();
    }

    function hidePanels(): void {
        const textContentWrapper: HTMLDivElement = document.querySelector('.textContent');
        textContentWrapper.style.opacity = '0';
        gameControlPanel.current.style.opacity = '0';

        setTimeout((): void => {
            textContentWrapper.style.display = 'none';
            gameControlPanel.current.style.display = 'none';
        }, 500)
    }

    function changeDifficulty(clickedButton: { currentTarget: HTMLSpanElement }): void {
        const buttons: HTMLSpanElement[] = Array.from(document.querySelectorAll('.difficulty-feedback'));
        
        buttons.forEach((button): void => {
            button.classList.remove('active');
        })

        clickedButton.currentTarget.classList.add('active');
    }


    return (
        <>
            <div className={'gameSettings'} ref={gameControlPanel}>
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
                                <div className={'difficulty-options-wrapper'} ref={difficultiesWrapper}>
                                    <span className={'difficulty-feedback'} onClick={changeDifficulty} data-difficulty={0}>Easy</span>
                                    <span className={'difficulty-feedback active'} onClick={changeDifficulty} data-difficulty={1}>Normal</span>
                                    <span className={'difficulty-feedback'} onClick={changeDifficulty} data-difficulty={2}>Hard</span>
                                    <span className={'difficulty-feedback'} onClick={changeDifficulty} data-difficulty={3}>Challenging</span>
                                </div>
                            </div>
                        </div>

                        <div className={'start-game-button-wrapper'}>
                            <button onClick={startGame} ref={startGameButton} className={'start-game-button'}>start-game</button>
                            <div className={'end-game-status'} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}