/* eslint-disable react/jsx-no-comment-textnodes */
import GameSettings from './components/gameSettings/GameSettings';
import TextContent from './components/textContent/TextContent';

export default function Content() {
    return (
        <>
            <div className="bombs-placed-container">
                <div className="wrapper">
                    <span className="bombs-placed-title">
                        // Bombs Placed
                    </span>
                    <span className="bombs-placed-text">
                        // 465
                    </span>
                </div>
            </div>

            <div id="content">
                <div className="container">
                    <TextContent />

                    <GameSettings />
                </div>
            </div>
        </>
    );
}