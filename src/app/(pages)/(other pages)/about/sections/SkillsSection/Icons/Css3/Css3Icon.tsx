import type { RefObject } from 'react';
import './style.scss';

type Css3IconProps = {
    iconRef?: RefObject<HTMLDivElement | null>;
};

export default function Css3Icon({ iconRef }: Css3IconProps) {
    return (
        <div className="threeD-icon">
            <div
                className="css3"
                ref={iconRef}
            >
                <div className="img-wrapper targetHover">
                    <img
                        src="icons/css3-logo.svg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}
