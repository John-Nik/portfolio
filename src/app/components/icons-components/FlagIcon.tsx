'use client';
import { useState, useEffect, ReactElement } from 'react';

export default function SocialsIcon(): ReactElement {
    let [isFlag, setIsFlag] = useState<number>(1);

    function changeIcon(): void {
        let flagIcon: HTMLImageElement = document.querySelector('.flag-icon');
        setIsFlag(() => (isFlag + 1) % 2); 
        
        if (isFlag) {
            flagIcon.src = '/icons/flag2.svg';
        } else {
            flagIcon.src = '/icons/shovel.png';
        }

    }

    useEffect((): void =>  {
        if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0)) {
            let flagIcon = document.querySelector('.flag-icon');
            let flagIconWrap = document.querySelector('.flag-icon-wrap');
            
            flagIcon.classList.add('touch-enabled-device');
            flagIconWrap.classList.add('touch-enabled-device');
        }
    }, [])

    

    return (
        <img className={'flag-icon'} onClick={changeIcon} src="/icons/shovel.png" alt="" />
    )
}