import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

type Direction = 'DOWN' | 'UP';

export default function useBringToView(customFunc?: (isVisible: boolean) => void) {
    const [exitPosition, setExitPosition] = useState<Direction>('DOWN');

    const { ref } = useInView({
        threshold: 0.3,
        onChange: (isVisible, intersectionObject) => {
            const textContent = intersectionObject.target as HTMLParagraphElement;
            const viewportOffset = textContent.getBoundingClientRect().top;

            textContent.dataset.show = `${isVisible}`;

            if (customFunc) {
                customFunc(isVisible);
                return;
            }

            if (isVisible) {
                textContent.style.transform = 'translateY(0px)';
            } else {
                textContent.style.transform = exitPosition === 'DOWN'
                    ? 'translateY(75px)'
                    : 'translateY(-75px)';
            }

            setExitPosition(viewportOffset < 0 ? 'UP' : 'DOWN');
        }
    });

    return { ref };
};