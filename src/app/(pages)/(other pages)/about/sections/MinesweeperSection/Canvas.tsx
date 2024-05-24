'use client';
import { useEffect } from "react";
import Konva from "konva";

export default function() {

    useEffect(() => {
        let canvasElement = document.querySelector('#background-game') as HTMLDivElement;
        let canvasWidth = canvasElement.offsetWidth;
        let canvasHeight = canvasElement.offsetHeight;
        let matrix = [];
        let squareSize = 32;
        let canvasLines = Math.floor(canvasHeight / squareSize);
        let canvasColumns = Math.floor(canvasWidth / squareSize);
        let squareWidth = canvasWidth / canvasColumns;
        let squareHeight = canvasHeight / canvasLines;
        let flatMatrix = [];
        let interval;
        let droppedSquares = 0;



        // define the canvas stage and layers
        let canvasStage = new Konva.Stage({
            container: 'background-game',
            width: canvasWidth,
            height: canvasHeight * 2.2
        })

        let backgroundLayer = new Konva.Layer({ listening: false });
        let animLayer = new Konva.Layer({ listening: false });
        canvasStage.add(backgroundLayer);
        canvasStage.add(animLayer);


        class square {
            isRevealed: boolean;
            hasBomb: boolean;
            isFlagged: boolean;
            position: [Y: number, X: number];
            Square: Konva.Group;

            constructor (position: [Y: number, X: number]) {
                this.isRevealed = false;
                this.hasBomb = false;
                this.isFlagged = false;
                this.position = position;

                if (Math.random() < 0.3) this.hasBomb = true;

                this.drawSquare()
            }

            private drawSquare() {
                let [Y, X] = this.position;
                let square = new Konva.Rect({
                    x: 0,
                    y: 0,
                    width: squareWidth,
                    height: squareHeight,
                    fill: '#010e18',
                    strokeWidth: 1,
                    stroke: 'black',
                    shadowForStrokeEnabled: false,
                    perfectDrawEnabled: false,
                    hitStrokeWidth: 0
                })

                let lighting = new Konva.Line({
                    x: 2,
                    y: 32,
                    stroke: '#ffffff1a',
                    strokeWidth: 2,
                    points: [0, 0, 0, -30, 30, -30]
                })

                let shadows = new Konva.Line({
                    x: 4,
                    y: 31,
                    stroke: '#03030380',
                    strokeWidth: 1,
                    points: [0, 0, 28, 0, 28, -31]
                })

                this.Square = new Konva.Group({
                    x: X * squareWidth,
                    y: Y * squareHeight
                })


                this.Square.add(square);
                this.Square.add(lighting);
                this.Square.add(shadows);
                backgroundLayer.add(this.Square);
            }

            digSquare() {
                if ((this.hasBomb) && (!this.isFlagged)) {
                    this.flagSquare();
                    this.dropSquare();
                    return;
                }

                if (this.isFlagged) return;
                if (this.isRevealed) return;

                
                let bombsCounted = this.countBombs();
                if (bombsCounted === 0) {
                    this.Square.destroy();
                    this.revealNeighboringSquares();
                    return;
                }

                this.dropSquare();
                this.revealSquare(bombsCounted);
                return;
            }

            private flagSquare() {
                this.isFlagged = true;
                this.Square.moveTo(animLayer);

                Konva.Image.fromURL('/icons/flag.svg', (image) => {
                    image.setAttrs({
                        x: this.Square.children[0].attrs.width / 4,
                        y: this.Square.children[0].attrs.height / 5,
                        width: squareWidth / 1.5,
                        height: squareWidth / 1.5
                    })

                    this.Square.add(image);
                })
                return;
            }

            private revealSquare(bombsCounted: number) {
                let textColor = ['#26D980', '#62D926', '#269DD9', '#4426D9', '#D926D9', '#D9BB26', '#D98026', '#D92644'];

                this.isRevealed = true;

                this.Square.moveTo(animLayer);
                this.Square.children.pop();
                this.Square.children.pop();

                if (bombsCounted === 0) return;
                
                let numberOfBombs = new Konva.Text({
                    x: 0,
                    y: 2,
                    width: this.Square.children[0].attrs.width,
                    height: this.Square.children[0].attrs.height,
                    text: `${bombsCounted}`,
                    fontSize: this.Square.children[0].attrs.height / 1.7,
                    fill: `${textColor[bombsCounted - 1]}`,
                    align: 'center',
                    verticalAlign: 'middle',
                    fontStyle: '500'
                })
                
                this.Square.add(numberOfBombs);
                return;
            }

            private revealNeighboringSquares() {
                let surroundingSquares = this.getSurroundingSquaresAboutMePage();

                this.revealSquare(0);

                surroundingSquares.forEach((square) => {
                    square.digSquare();
                });

                flatMatrix = []; //reset the flat matrix
                matrix.forEach((line) => {
                    line.forEach((square: square) => {
                        if (square.isRevealed) return;
                        if (square.isFlagged) return;

                        flatMatrix.push(square);
                    })
                })
                return;
            }

            private countBombs() {
                let bombsCounted = 0;
                let surroundingSquares = this.getSurroundingSquaresAboutMePage();
            
                surroundingSquares.forEach((square) => {
                    if (square.hasBomb) {
                        bombsCounted++;
                    }
                })
            
                return bombsCounted;
            }

            private dropSquare() {
                droppedSquares++;
                let randomPixels = Math.floor(Math.random() * canvasStage.height() / 2);
                let endGoal = randomPixels + canvasStage.height() / 2.2;
                let startPosition = this.Square.y();
                let timeToAnim = droppedSquares > 100 ? 4000 : 2300;

                if (droppedSquares > 100) {
                    endGoal = canvasStage.height();
                }

                function bezier(t:number, initial:number, p1:number, p2:number, final:number) {
                    return ((1 - t) * (1 - t) * (1 - t) * initial) + (3 * (1 - t) * (1 - t) * t * p1) + (3 * (1 - t) * t * t * p2) + (t * t * t * final);
                }

                setTimeout(() => {
                    animation.stop();
                    if (droppedSquares > 100) this.Square.destroy();
                }, timeToAnim)

                let animation = new Konva.Animation((frame) => {
                    let time = frame.time / (timeToAnim / 1000);

                    this.Square.y(bezier(time / 1000, startPosition, endGoal, endGoal, endGoal));
                }, animLayer);

                setTimeout(() => {
                    animation.start();
                }, Math.random() * 50)
            }

            private getSurroundingSquaresAboutMePage() {
                let surroundingSquares = [];
                let [Y, X] = this.position;
            
                for (let i = -1; i < 2; i++) {
                    if (matrix[Number(Y) + Number(i)] != undefined) {
                        for (let j = -1; j < 2; j++) {
                            if (matrix[Number(Y) + Number(i)][Number(X) + Number(j)] != undefined) {
                                if (Number(Y) + Number(i) != Y || Number(X) + Number(j) != X) {
                                    surroundingSquares.push( matrix[Number(Y) + Number(i)][Number(X) + Number(j)] )
                                }
                            }
                        }
                    }
                }
            
                return surroundingSquares;
            }
        }

        populateBoard();
        function populateBoard() {
            for (let i = 0; i < canvasLines; i++) {
                matrix.push([]);
            }
    
            matrix.forEach((row, rowIndex) => {
                for (let i = 0; i <= canvasColumns; i++) {
                    row.push(new square([rowIndex, i]));
                }
            })
        }


        let initialPopulation = true;
        const resizeObserver = new ResizeObserver(() => {
            if ((canvasElement.offsetWidth > canvasWidth === false) && (canvasElement.offsetHeight * 2.2 > canvasHeight === false)) return;

            if (initialPopulation) {
                initialPopulation = false;
                return;
            }


            canvasHeight = canvasElement.offsetHeight;
            canvasWidth = canvasElement.offsetWidth;
            canvasStage.height(canvasHeight * 2.2);
            canvasStage.width(canvasWidth);

            if (canvasLines < Math.floor(canvasHeight / squareSize)) {
                let dY = Math.floor(canvasHeight / squareSize) - canvasLines;

                for (let i = 0; i < dY; i++) {
                    let row = [];
                    for (let j = 0; j < canvasColumns; j++) {
                        row.push(new square([canvasLines + i, j]));
                    }
                    matrix.push(row);
                    
                }

                canvasLines += dY;
                flatMatrix = matrix.flat();
            }
        
            if (canvasColumns < Math.floor(canvasWidth / squareSize)) {
                let dX = Math.floor(canvasWidth / squareSize) - canvasColumns;

                matrix.forEach((row, rowIndex) => {
                    for (let i = 0; i <= dX; i++) {
                        row.push(new square([rowIndex, i + canvasColumns]));
                    }
                })

                canvasColumns += dX;
                flatMatrix = matrix.flat();
            }
        })
        resizeObserver.observe(canvasElement);



        flatMatrix = matrix.flat();

        interval = setInterval(autoplayGame, 1500);
        function autoplayGame() {
            let randomNumber = Math.floor(Math.random() * flatMatrix.length);

            if (flatMatrix.length === 0) {
                clearInterval(interval);
                return;
            }

            flatMatrix[randomNumber].digSquare();
            flatMatrix.splice(randomNumber, 1);
        }

        

        return () => {
            canvasElement =  null;
            canvasWidth = null;
            canvasHeight = null;
            matrix = null;
            squareSize = null;
            canvasLines = null;
            canvasColumns = null;
            squareWidth = null;
            squareHeight = null;
            flatMatrix = null;
            clearInterval(interval);
            interval = null;
            canvasStage = null;
            backgroundLayer = null;
            animLayer = null;
            droppedSquares = null;
            resizeObserver.disconnect();
            initialPopulation = null;
        }
    }, [])




    return (
        <>
            <div aria-hidden="true" id={'background-game'} />
        </>
    )
}