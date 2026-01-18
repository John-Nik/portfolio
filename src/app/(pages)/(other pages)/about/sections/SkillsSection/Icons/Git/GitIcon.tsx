import './style.scss';

export default function GitIcon() {
    return (
        <div className="threeD-icon">
            <div className="git targetHover">
                <div id="tridiv">
                    <div className="scene">
                        <div className="shape cuboid-1 cub-1">
                            <div className="face ft" />
                            <div className="face bm">
                                <img
                                    src="/icons/git-icon.svg"
                                    alt=""
                                />
                            </div>
                            <div className="cr cr-0">
                                <div className="face side s0" />
                                <div className="face side s1" />
                                <div className="face side s2" />
                            </div>
                            <div className="cr cr-3">
                                <div className="face side s0" />
                                <div className="face side s1" />
                                <div className="face side s2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
