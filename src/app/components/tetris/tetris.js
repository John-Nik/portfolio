'use client';

import './tetris.scss'
import { useEffect, useState } from 'react';
import Row from './row.js'
import Square from './square.js'


export default function Tetris() {
    let [matrixState, setMatrixState] = useState([]);
    let [isInitiallyRendered, setIsInitiallyRendered] = useState(false);

    useEffect(() => {
        if (!isInitiallyRendered) {
            let matrix = [];

            const tetrisContainer = document.querySelector('#tetris-container');
            let containerHeight = tetrisContainer.offsetHeight;
            let containerWidth = tetrisContainer.offsetWidth;
            let columnsToFit = Math.floor(containerWidth / 32);
            let columnsWidth = containerWidth / columnsToFit;
            columnsWidth = columnsWidth.toFixed(2);
            let rowsToFit = Math.floor(containerHeight / columnsWidth);

            tetrisContainer.style.gridTemplateColumns = `repeat(${columnsToFit}, minmax(32px, 1fr))`;
            tetrisContainer.style.gridTemplateRows = `repeat(${rowsToFit}, minmax(32px, 1fr))`

            for (let i = 0; i < rowsToFit; i++) {
                matrix.push([]);
            }

            matrix.forEach((row) => {
                for (let i = 0; i < columnsToFit; i++) {
                    let placeBomb = false;

                    if (Math.random() < 0.2) {
                        placeBomb = true;
                    }
                    row.push([false, placeBomb]);
                }
            })

            setMatrixState(() => matrix);
            setIsInitiallyRendered(true);
        }
    }, [])

    function dugSquare(posY, posX) {
        let row = matrixState[posY];
        setMatrixState([...matrixState.slice()]);
    }

    
    if (matrixState.length != 0) {
        let rowCount = -1;

        return (
            matrixState.map((rowSquaresArray) => {
                rowCount++;
                let squareCount = -1;

                return (
                    rowSquaresArray.map((squareInfo) => {
                        squareCount++;

                        console.log(matrixState[rowCount][squareCount][0])
                        return (
                            <Square key={`${rowCount}_${squareCount}`} position={`${rowCount}_${squareCount}`} isRevealed={matrixState[rowCount][squareCount][0]} onClick={(posY, posX) => {dugSquare(posY, posX);}} matrix={matrixState} handleEmptySquare={(posY, posX) => {handleEmptySquare(posY, posX)}}></Square>
                        )
                    })
                )
            })
        )
    }
}

































// export default function Tetris() {
//     let [buttons, setButtons] = useState([]);
//     let [k, setk] = useState(0);
//     let [matrixProcessed, setMatrixProcessed] = useState([]);
//     let matrixContext = createContext(matrixProcessed);
    


//     function updateMatrix(rowIndex, squareIndex) {

//         console.log(matrixProcessed);
//     }
    


//     useEffect(() => {
//         let matrix = [];

//         const tetrisContainer = document.querySelector('#tetris-container');
//         let containerHeight = tetrisContainer.offsetHeight;
//         let containerWidth = tetrisContainer.offsetWidth;
//         let columnsToFit = Math.floor(containerWidth / 32);
//         let columnsWidth = containerWidth / columnsToFit;
//         columnsWidth = columnsWidth.toFixed(2);
//         let rowsToFit = Math.floor(containerHeight / columnsWidth);



//         tetrisContainer.style.gridTemplateColumns = `repeat(${columnsToFit}, minmax(32px, 1fr))`;
//         tetrisContainer.style.gridTemplateRows = `repeat(${rowsToFit}, minmax(32px, 1fr))`
        
//         for (let i = 0; i < rowsToFit; i++) {
//             matrix.push([]);
//         }

        
//         matrix.forEach((row) => {
//             for (let i = 0; i < columnsToFit; i++) {
//                 let placeBomb = false;

//                 if (Math.random() < 0.2) {
//                     placeBomb = true;
//                 }
//                 row.push([false, placeBomb]);
//             }
//         })

//         setMatrixProcessed(() => matrix);
//     }, [])

//     if (matrixProcessed.length != 0) {
//         let rowCount = -1;

//         return (
//             matrixProcessed.map((rowSquaresArray) => {
//                 rowCount++;
//                 let squareCount = -1;

//                 return (
//                     rowSquaresArray.map(() => {
//                         squareCount++;


//                         return (
//                             <Square key={`${rowCount}_${squareCount}`} isRevealed={matrixContext[rowCount][squareCount][0]} position={`${rowCount}_${squareCount}`} handleClick={(rowCountone, squareCountone) => updateMatrix(rowCountone, squareCountone)}></Square>
//                         )
//                     })
//                 )
                
//                 // return (
//                 //     <Row rowSquares={rowSquaresArray} key={rowCount} rowID={rowCount} matrix={matrixProcessed}></Row>
//                 // )
//             })
//         )
//     }
// }