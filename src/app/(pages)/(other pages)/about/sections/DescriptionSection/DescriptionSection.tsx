'use client'
import { useEffect, useState } from 'react';
import './styling.scss';
import { useInView } from 'react-intersection-observer';


interface Direction {
    direction: 'DOWN' | 'UP';
}

export default function DescriptionSection() {
    const [exitPosition, setExitPosition] = useState<Direction>({direction: 'DOWN'});
    const { ref, inView, entry } = useInView({
        threshold: 0.3,
        onChange: (isVisible, intersectionObject) => {
            const textContent = intersectionObject.target as HTMLParagraphElement;
            const viewportOffset = textContent.getBoundingClientRect().top;

            if (exitPosition.direction === 'DOWN') {
                textContent.style.transform = 'translateY(75px)';
            } else {
                textContent.style.transform = 'translateY(-75px)';
            }

            if (isVisible) {
                textContent.classList.add('show');
            } else {
                textContent.classList.remove('show');
            }

            if (textContent.classList.contains('show')) {
                textContent.style.transform = 'translateY(0px)';
            }

            if (viewportOffset < 0) {
                setExitPosition({direction: 'UP'});
            } else {
                setExitPosition({direction: 'DOWN'});
            }    
        }
    });

    useEffect((): ()=>void => {
        const textContent = document.querySelector('.text-content p');
        
        const textContentObserver = new IntersectionObserver((element) => {
            if (element[0].isIntersecting) {
                element[0].target.classList.add('show');
            }
        })

        textContentObserver.observe(textContent);

        return () => {
            textContentObserver.unobserve(textContent);
        }
    }, [])

    return (
        <section id={'description-section'}>
            <div className={'container'}>
                <div className={'text-content'}>
                    <p ref={ref}>I am all about <span className={'colored-text'}>non-stop learning,</span> whether I am tackling difficult subjects or understanding simple concepts</p>
                </div>
                {/* <div className={'image-wrapper'}>
                    <Image src="/images/about-me-picture.png" width={600} height={600} alt="Placeholder picture" />
                </div> */}
            </div>
        </section>
    )
}