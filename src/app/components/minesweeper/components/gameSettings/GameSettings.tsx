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
                                    <span className={'difficulty-feedback'} data-difficulty={0}>Easy</span>
                                    <span className={'difficulty-feedback active'} data-difficulty={1}>Normal</span>
                                    <span className={'difficulty-feedback'} data-difficulty={2}>Hard</span>
                                    <span className={'difficulty-feedback'} data-difficulty={3}>Challenging</span>
                                </div>
                            </div>
                        </div>

                        <div className={'start-game-button-wrapper'}>
                            <button ref={startGameButton} className={'start-game-button'}>start-game</button>
                            <div className={'end-game-status'} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}