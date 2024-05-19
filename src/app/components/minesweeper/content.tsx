import GameSettings from './components/gameSettings/GameSettings';
import TextContent from './components/textContent/TextContent';
import { ReactElement } from 'react';

export default function Content(): ReactElement {
    return (
        <>
            <div className={'bombs-placed-container'}>
                <div className={'wrapper'}>
                    <span className={'bombs-placed-title'}>// Bombs Placed</span>
                    <span className={'bombs-placed-text'}>// 465</span>
                </div>
            </div>
            <div id={'content'}>
                <div className={'container'}>

                    <TextContent />

                    <div className={'user-initiated-game-start'} aria-hidden={'true'}></div>

                    <GameSettings />
                </div>
            </div>
        </>
    )
}