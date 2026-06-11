import type { RefObject } from 'react';

type Css3IconProps = {
    iconRef?: RefObject<HTMLDivElement | null>;
};

export default function Css3Icon({ iconRef }: Css3IconProps) {
    return (
        <div className="threeD-icon">
            <div
                className="top-[100px] relative flex flex-row justify-center w-[140px] aspect-square origin-center [transform:scale(0.9)] calm-super-slo"
                ref={iconRef}
            >
                <div
                    className={`
                        w-[98px] aspect-square flex relative origin-center
                        calm-super-slow
                        [transform:scale(1)_translate3d(0px,0px,0px)_rotateX(-30deg)_rotateY(30deg)]
                        [transform-style:preserve-3d]
                        [&:has(*:hover)]:[transform:translate3d(-20px,-10px,0px)_scale(1.3)_rotateX(0deg)_rotateY(0deg)]
                        [&.hover]:[transform:translate3d(-20px,-10px,0px)_scale(1.3)_rotateX(0deg)_rotateY(0deg)]
                        min-[800px]:[transform:scale(1)_translate3d(0px,0px,0px)_rotateX(-30deg)_rotateY(-30deg)]
                        min-[800px]:[&:has(*:hover)]:[transform:translate3d(20px,-10px,0px)_scale(1.3)_rotateX(0deg)_rotateY(0deg)]
                        min-[800px]:[&.hover]:[transform:translate3d(20px,-10px,0px)_scale(1.3)_rotateX(0deg)_rotateY(0deg)]
                        targetHover
                `}
                >
                    <span className="min-[800px]:left-[96px] absolute flex bg-[hsl(228,78%,35%)] w-5 h-[100px] min-[800px]:h-[98px] origin-top-left [transform:translate3d(1px,1px,10px)_rotateY(90deg)_rotateX(5deg)] min-[800px]:[transform:translate3d(1px,1px,10px)_rotateY(90deg)_rotateX(-5deg)_rotateZ(2deg)]" />
                    <span className="absolute flex bg-[hsl(228,78%,35%)] w-[98px] h-5 origin-top-left [transform:translate3d(0px,1px,-10px)_rotateX(90deg)]" />
                    <img
                        src="icons/css3-logo.svg"
                        alt=""
                        className="absolute w-[200%] origin-top-left [transform:translate3d(0px,0px,10px)] [clip-path:polygon(0_0,100%_0,95%_95%,50%_100%,5%_95%)]"
                    />
                </div>
            </div>
        </div>
    );
}