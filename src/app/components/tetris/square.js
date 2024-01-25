'use client'
import { useState } from 'react';
import './square.scss';

export default function Square({isSafe, id}) {
    const [hasBomb, setHasBomb] = useState(!isSafe);
    const [isRevealed, setIsRevealed] = useState(false);

    function userDiggedSquare() {
        console.log(hasBomb, isRevealed)
        setIsRevealed(true);
    }

    return (
        <div className={`${isRevealed ? 'reveal' : ''} square`} onClick={userDiggedSquare}>
            {isRevealed ? `${hasBomb ? 'FF' : 'TT'}` : ''}
        </div>
    )
}