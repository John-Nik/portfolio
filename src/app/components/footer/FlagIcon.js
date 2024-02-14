'use client';
import { useState } from 'react';

export default function SocialsIcon() {
    let [isFlag, setIsFlag] = useState(0);

    function changeIcon() {
        let flagIcon = document.querySelector('.flag-icon');
        setIsFlag(() => (isFlag + 1) % 2); 
        
        if (isFlag) {
            flagIcon.src = '/icons/flag2.svg';
        } else {
            flagIcon.src = '/icons/shovel.png';
        }

    }

    return (
        <img className={'flag-icon'} onClick={changeIcon} src="/icons/flag2.svg" alt="" />
    )
}