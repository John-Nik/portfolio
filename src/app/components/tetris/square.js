'use client'
import { useState } from 'react';
import './square.scss';


export default function Square({position, onClick, matrix, handleEmptySquare}) {
    const [posY, setPosY] = useState(position.split('_')[0]);
    const [posX, setPosX] = useState(position.split('_')[1]);
    const [hasBomb, setHasBomb] = useState(matrix[posY][posX][1]);
    let [isRevealed, setIsRevealed] = useState(false);
    let [bombsSurrounding, setBombsSurrounding] = useState(0);
    let [squareFlagged, setSquareFlagged] = useState(false);

    function userDiggedSquare() {
        let bombsCounted = 0;
        const squaresSurrounding = [];
        let click = onClick;
        click(posY, posX);
        
        if (!isRevealed) {
            for (let i = 0; i < 3; i++) {
                if (matrix[Number(posY) + (i - 1)] != undefined) {
                    for (let j = 0; j < 3; j++) {
                        if (matrix[Number(posY) + (i - 1)][Number(posX) + (j - 1)] != undefined) {
                            squaresSurrounding.push(matrix[Number(posY) + (i - 1)][Number(posX) + (j - 1)][1])
                        }
                    }
                }
            }
    
            squaresSurrounding.forEach((square) => {
                if (square === true) {
                    bombsCounted++;
                }
            })
            setBombsSurrounding(bombsCounted);
            setIsRevealed(true);
        }

        if (bombsCounted === 0) {
            let emptySquare = handleEmptySquare;
            emptySquare(posY, posX);
        }
    }

    return (
        <div className={`${isRevealed ? `reveal B${bombsSurrounding} ${hasBomb ? 'bombed' : ''}` : ''} square ${squareFlagged ? 'flag' : ''}`} onClick={() => {userDiggedSquare()}} onContextMenu={(event) => {setSquareFlagged(true); event.preventDefault()}}>
            {isRevealed ? hasBomb ? '' : bombsSurrounding > 0 ? `${bombsSurrounding}` : '' : '' }
        </div>
    )
}