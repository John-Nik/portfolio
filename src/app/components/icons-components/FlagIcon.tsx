'use client';
import { 
    useEffect,
    ReactElement,
    useRef
} from 'react';

export default function SocialsIcon(): ReactElement {
    const flagIcon = useRef<HTMLImageElement>(null);

    useEffect((): void =>  {
        if (!('ontouchstart' in window)) return;

        const flagIconWrap = document.querySelector('.flag-icon-wrap');
        if (!flagIcon.current || !flagIconWrap) return;

        flagIcon.current.classList.add('touch-enabled-device');
        flagIconWrap.classList.add('touch-enabled-device');
    }, []);

    function toggleBetweenFlagAndShovelIcon(): void {
        if (!flagIcon.current) return;

        flagIcon.current.src = flagIcon.current.src.includes('shovel')
            ? '/icons/flag.svg'
            : '/icons/shovel.png';
    }

    return (
        <img
            className="w-6 h-6"
            ref={flagIcon}
            data-flag-icon
            onClick={toggleBetweenFlagAndShovelIcon}
            src="/icons/shovel.png"
            alt=""    
        />
    );
}