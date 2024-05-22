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
        let dPR = devicePixelRatio;
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        let flatMatrix = [];
        let interval;
        let cachedImageSquare;
        let droppedSquares = 0;



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
            position: number[];
            Square: Konva.Group;

            constructor (position: number[]) {
                this.isRevealed = false;
                this.hasBomb = false;
                this.isFlagged = false;
                this.position = position;

                if (Math.random() < 0.3) {
                    this.hasBomb = true;
                }

                this.drawSquare()
            }

            private drawSquare() {
                let [Y, X] = this.position;
                let square = new Konva.Rect({
                    x: 0,
                    y: 0,
                    width: squareWidth * dPR,
                    height: squareHeight * dPR,
                    fill: '#010e18',
                    strokeWidth: 1,
                    stroke: 'black',
                    shadowForStrokeEnabled: false,
                    perfectDrawEnabled: false
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
                    x: X * (squareWidth * dPR),
                    y: Y * (squareHeight * dPR)
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

                if (this.isFlagged) {
                    return;
                }

                if (this.isRevealed) {
                    return;
                }

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

            flagSquare() {
                this.isFlagged = true;
                this.Square.moveTo(animLayer);

                Konva.Image.fromURL('/icons/flag.svg', (image) => {
                    image.setAttrs({
                        x: this.Square.children[0].attrs.width / 4,
                        y: this.Square.children[0].attrs.height / 5,
                        width: squareWidth * dPR / 1.5,
                        height: squareWidth * dPR / 1.5
                    })

                    this.Square.add(image);
                })

                return;
            }

            revealSquare(bombsCounted: number) {
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

            revealNeighboringSquares() {
                let surroundingSquares = this.getSurroundingSquaresAboutMePage();

                this.revealSquare(0);

                surroundingSquares.forEach((square) => {
                    square.digSquare();
                });

                flatMatrix = [];
                matrix.forEach((line) => {
                    line.forEach((square: square) => {
                        if (square.isRevealed) return;
                        if (square.isFlagged) return;

                        flatMatrix.push(square);
                    })
                })
                return;
            }

            countBombs() {
                let bombsCounted = 0;
                let surroundingSquares = this.getSurroundingSquaresAboutMePage();
            
                surroundingSquares.forEach((square) => {
                    if (square.hasBomb) {
                        bombsCounted++;
                    }
                })
            
                return bombsCounted;
            }

            dropSquare() {
                droppedSquares++;
                let randomPixels = Math.floor(Math.random() * canvasStage.height());
                let endGoal = randomPixels + this.Square.y();
                let startPosition = this.Square.y();

                if (droppedSquares > 100) {
                    endGoal = canvasStage.height();
                }

                function bezier(t:number, initial:number, p1:number, p2:number, final:number) {
                    return ((1 - t) * (1 - t) * (1 - t) * initial) + (3 * (1 - t) * (1 - t) * t * p1) + (3 * (1 - t) * t * t * p2) + (t * t * t * final);
                }

                setTimeout(() => {
                    animation.stop();
                    if (droppedSquares > 100) this.Square.destroy();
                }, 1000)

                let animation = new Konva.Animation((frame) => {
                    let time = frame.time;                       

                    this.Square.y(bezier(time / 1000, startPosition, endGoal, endGoal, endGoal));
                }, animLayer);

                setTimeout(() => {
                    animation.start();
                }, Math.random() * 5)
            }

            getSurroundingSquaresAboutMePage() {
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

        for (let i = 0; i < canvasLines; i++) {
            matrix.push([]);
        }

        matrix.forEach((line, lineIndex) => {
            for (let i = 0; i < canvasColumns; i++) {
                line.push(new square([lineIndex, i]));
            }
        })



        flatMatrix = matrix.flat();
        interval = setInterval(autoplayGame, 1500);

        function autoplayGame() {
            let randomNumber = Math.floor(Math.random() * flatMatrix.length);

            if (randomNumber === 0) {
                clearInterval(interval);
                return;
            }

            console.log(flatMatrix);
            flatMatrix[randomNumber].digSquare();
            flatMatrix.splice(randomNumber, 1);
        }

        window.addEventListener('keydown', () => {
            flatMatrix[Math.floor(Math.random() * flatMatrix.length)].digSquare();
        })

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
            dPR = null;
            windowWidth = null;
            windowHeight = null;
            flatMatrix = null;
            clearInterval(interval);
            interval = null;
            canvasStage = null;
            backgroundLayer = null;
            animLayer = null;
            cachedImageSquare = null;
            droppedSquares = 0;
        }
    }, [])




    return (
        <>
            <div id={'background-game'} />
        </>
    )
}