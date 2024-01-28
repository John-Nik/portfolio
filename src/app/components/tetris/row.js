import Square from './square.js'

export default function Row({rowSquares, columns, rowID, matrix}) {
    let squarePosition = -1;
    return (
        rowSquares.map((square) => {
            squarePosition++;
            function randomizeBombChance() {
                if (Math.floor(Math.random() * 10) < 2) {
                    return true;
                } else {
                    return false;
                }
            }


            return <Square key={`${rowID}_${squarePosition}`} position={`${rowID}_${squarePosition}`} isSafe={randomizeBombChance()} matrix={matrix}></Square>
        })
    )
}