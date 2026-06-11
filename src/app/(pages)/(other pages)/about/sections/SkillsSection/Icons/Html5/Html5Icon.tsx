import type { RefObject } from 'react';

type Html5IconProps = {
    iconRef?: RefObject<HTMLDivElement | null>;
};

export default function Html5Icon({ iconRef }: Html5IconProps) {
    return (
        <div className="threeD-icon">
            <div
                className="absolute flex flex-row justify-center -mt-[525px] w-[1200px] aspect-square origin-center [transform:scale(0.09)] calm-super-slow"
                ref={iconRef}
            >
                <div
                    className={`
                        w-[980px] aspect-square flex relative origin-center
                        [transform-style:preserve-3d]
                        calm-super-slow
                        [transform:scale3d(1,1,1)_translate3d(0px,0px,0px)_rotateX(-30deg)_rotateY(-30deg)]
                        [&:has(*:hover)]:[transform:translate3d(200px,-100px,0px)_scale3d(1.3,1.3,1.3)_rotateX(0deg)_rotateY(0deg)]
                        [&.hover]:[transform:translate3d(200px,-100px,0px)_scale3d(1.3,1.3,1.3)_rotateX(0deg)_rotateY(0deg)]
                        targetHover
                    `}
                >
                    <span className="left-[980px] min-[800px]:left-[980px] absolute flex bg-[hsl(12,77%,35%)] w-[200px] h-[1010px] min-[800px]:h-[1010px] origin-top-left [transform:translate3d(0px,0px,100px)_rotateY(90deg)_rotateX(-6deg)]" />
                    <span className="absolute flex bg-[hsl(12,77%,35%)] w-[980px] h-[200px] origin-top-left [transform:translate3d(0px,1px,-100px)_rotateX(88.5deg)]" />
                    <img
                        src="icons/html5-logo.svg"
                        alt=""
                        className="absolute w-full h-full origin-top-left [transform:translate3d(0px,0px,100px)] [clip-path:polygon(0_0,100%_0,91%_83%,50%_100%,9%_83%)]"
                    />
                </div>
            </div>
        </div>
    );
}