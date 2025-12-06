'use client';
import { 
    useEffect,
    ReactElement,
    useRef
} from 'react';

export default function SocialsIcon(): ReactElement {
    const flagIcon = useRef<HTMLImageElement>(null);

    function toggleBetweenFlagAndShovelIcon(): void {
        if (!flagIcon.current) return;

        if (flagIcon.current.src.includes('shovel')) {
            flagIcon.current.src = '/icons/flag2.svg';
        } else {
            flagIcon.current.src = '/icons/shovel.png';
        }
    }

    useEffect((): void =>  {
        if (!('ontouchstart' in window)) return;

        const flagIconWrap = document.querySelector('.flag-icon-wrap');
        
        flagIcon.current.classList.add('touch-enabled-device');
        flagIconWrap.classList.add('touch-enabled-device');
    }, []);

    return (
        <img
            ref={flagIcon}
            className="flag-icon"
            onClick={toggleBetweenFlagAndShovelIcon}
            src="/icons/shovel.png"
            alt=""    
        />
    );
}