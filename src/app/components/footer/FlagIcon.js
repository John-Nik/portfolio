'use client';
import { useState, useEffect } from 'react';

export default function SocialsIcon() {
    let [isFlag, setIsFlag] = useState(1);

    function changeIcon() {
        let flagIcon = document.querySelector('.flag-icon');
        setIsFlag(() => (isFlag + 1) % 2); 
        
        if (isFlag) {
            flagIcon.src = '/icons/flag2.svg';
        } else {
            flagIcon.src = '/icons/shovel.png';
        }

    }

    useEffect(() =>  {
        if (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)) {
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