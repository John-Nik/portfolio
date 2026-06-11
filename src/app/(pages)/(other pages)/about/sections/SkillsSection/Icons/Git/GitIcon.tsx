import './style.scss';

export default function GitIcon() {
    return (
        <div className="threeD-icon">
            <div className="git targetHover">
                <div id="tridiv">
                    <div className="scene">
                        <div className="shape cuboid-1 cub-1">
                            <div className="face ft" />
                            <div className="flex justify-start items-start face bm">
                                <div className="top-0 left-0 absolute flex bg-[#F03C2E] rounded-xl w-full h-full" />
                                <div className="top-1/2 left-0 absolute flex bg-white w-94 h-60 -translate-y-1/2" />
                                <img
                                    src="/icons/git-icon.svg"
                                    alt=""
                                    className="z-10"
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
