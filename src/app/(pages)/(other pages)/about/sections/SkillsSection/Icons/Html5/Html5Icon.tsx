import type { RefObject } from 'react';
import './style.scss';

type Html5IconProps = {
    iconRef?: RefObject<HTMLDivElement | null>;
};

export default function Html5Icon({ iconRef }: Html5IconProps) {
    return (
        <div className="threeD-icon">
            <div
                className="html5"
                ref={iconRef}
            >
                <div className="img-wrapper targetHover">
                    <img
                        src="icons/html5-logo.svg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}
