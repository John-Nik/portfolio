'use client';
// Import { useEffect } from 'react';
// Import Konva from 'konva';

export default function Canvas() {

    // UseEffect(() => {
    //     Let canvasElement = document.querySelector('#background-game') as HTMLDivElement;
    //     Let canvasWidth = canvasElement.offsetWidth;
    //     Let canvasHeight = canvasElement.offsetHeight;
    //     Let matrix = [];
    //     Let squareSize = 32;
    //     Let canvasLines = Math.floor(canvasHeight / squareSize);
    //     Let canvasColumns = Math.floor(canvasWidth / squareSize);
    //     Let squareWidth = canvasWidth / canvasColumns;
    //     Let squareHeight = canvasHeight / canvasLines;
    //     Let flatMatrix = [];
    //     Let interval;
    //     Let droppedSquares = 0;

    //     // Define the canvas stage and layers
    //     Let canvasStage = new Konva.Stage({
    //         Container: 'background-game',
    //         Width: canvasWidth,
    //         Height: canvasHeight * 2.2
    //     });

    //     Let backgroundLayer = new Konva.Layer({ listening: false });
    //     Let animLayer = new Konva.Layer({ listening: false });
    //     CanvasStage.add(backgroundLayer);
    //     CanvasStage.add(animLayer);


    //     Class square {
    //         IsRevealed: boolean;
    //         HasBomb: boolean;
    //         IsFlagged: boolean;
    //         Position: [Y: number, X: number];
    //         Square: Konva.Group;

    //         Constructor(position: [Y: number, X: number]) {
    //             This.isRevealed = false;
    //             This.hasBomb = false;
    //             This.isFlagged = false;
    //             This.position = position;

    //             If (Math.random() < 0.3) this.hasBomb = true;

    //             This.drawSquare();
    //         }

    //         Private drawSquare() {
    //             Const [Y, X] = this.position;
    //             Const square = new Konva.Rect({
    //                 X: 0,
    //                 Y: 0,
    //                 Width: squareWidth,
    //                 Height: squareHeight,
    //                 Fill: '#010e18',
    //                 StrokeWidth: 1,
    //                 Stroke: 'black',
    //                 ShadowForStrokeEnabled: false,
    //                 PerfectDrawEnabled: false,
    //                 HitStrokeWidth: 0
    //             });

    //             Const lighting = new Konva.Line({
    //                 X: 2,
    //                 Y: 32,
    //                 Stroke: '#ffffff1a',
    //                 StrokeWidth: 2,
    //                 Points: [0, 0, 0, -30, 30, -30]
    //             });

    //             Const shadows = new Konva.Line({
    //                 X: 4,
    //                 Y: 31,
    //                 Stroke: '#03030380',
    //                 StrokeWidth: 1,
    //                 Points: [0, 0, 28, 0, 28, -31]
    //             });

    //             This.Square = new Konva.Group({
    //                 X: X * squareWidth,
    //                 Y: Y * squareHeight
    //             });


    //             This.Square.add(square);
    //             This.Square.add(lighting);
    //             This.Square.add(shadows);
    //             BackgroundLayer.add(this.Square);
    //         }

    //         DigSquare() {
    //             If ((this.hasBomb) && (!this.isFlagged)) {
    //                 This.flagSquare();
    //                 This.dropSquare();
    //                 Return;
    //             }

    //             If (this.isFlagged) return;
    //             If (this.isRevealed) return;

                
    //             Const bombsCounted = this.countBombs();
    //             If (bombsCounted === 0) {
    //                 This.Square.destroy();
    //                 This.revealNeighboringSquares();
    //                 Return;
    //             }

    //             This.dropSquare();
    //             This.revealSquare(bombsCounted);
    //             Return;
    //         }

    //         Private flagSquare() {
    //             This.isFlagged = true;
    //             This.Square.moveTo(animLayer);

    //             Konva.Image.fromURL('/icons/flag.svg', (image) => {
    //                 Image.setAttrs({
    //                     X: this.Square.children[0].attrs.width / 4,
    //                     Y: this.Square.children[0].attrs.height / 5,
    //                     Width: squareWidth / 1.5,
    //                     Height: squareWidth / 1.5
    //                 });

    //                 This.Square.add(image);
    //             });
    //             Return;
    //         }

    //         Private revealSquare(bombsCounted: number) {
    //             Const textColor = ['#26D980', '#62D926', '#269DD9', '#4426D9', '#D926D9', '#D9BB26', '#D98026', '#D92644'];

    //             This.isRevealed = true;

    //             This.Square.moveTo(animLayer);
    //             This.Square.children.pop();
    //             This.Square.children.pop();

    //             If (bombsCounted === 0) return;
                
    //             Const numberOfBombs = new Konva.Text({
    //                 X: 0,
    //                 Y: 2,
    //                 Width: this.Square.children[0].attrs.width,
    //                 Height: this.Square.children[0].attrs.height,
    //                 Text: `${bombsCounted}`,
    //                 FontSize: this.Square.children[0].attrs.height / 1.7,
    //                 Fill: `${textColor[bombsCounted - 1]}`,
    //                 Align: 'center',
    //                 VerticalAlign: 'middle',
    //                 FontStyle: '500'
    //             });
                
    //             This.Square.add(numberOfBombs);
    //             Return;
    //         }

    //         Private revealNeighboringSquares() {
    //             Const surroundingSquares = this.getSurroundingSquaresAboutMePage();

    //             This.revealSquare(0);

    //             SurroundingSquares.forEach((square) => {
    //                 Square.digSquare();
    //             });

    //             FlatMatrix = []; //Reset the flat matrix
    //             Matrix.forEach((line) => {
    //                 Line.forEach((square: square) => {
    //                     If (square.isRevealed) return;
    //                     If (square.isFlagged) return;

    //                     FlatMatrix.push(square);
    //                 });
    //             });
    //             Return;
    //         }

    //         Private countBombs() {
    //             Let bombsCounted = 0;
    //             Const surroundingSquares = this.getSurroundingSquaresAboutMePage();
            
    //             SurroundingSquares.forEach((square) => {
    //                 If (square.hasBomb) {
    //                     BombsCounted++;
    //                 }
    //             });
            
    //             Return bombsCounted;
    //         }

    //         Private dropSquare() {
    //             DroppedSquares++;
    //             Const randomPixels = Math.floor(Math.random() * canvasStage.height() / 2);
    //             Let endGoal = randomPixels + canvasStage.height() / 2.2;
    //             Const startPosition = this.Square.y();
    //             Const timeToAnim = droppedSquares > 100 ? 4000 : 2300;

    //             If (droppedSquares > 100) {
    //                 EndGoal = canvasStage.height();
    //             }

    //             Function bezier(t:number, initial:number, p1:number, p2:number, final:number) {
    //                 Return ((1 - t) * (1 - t) * (1 - t) * initial) + (3 * (1 - t) * (1 - t) * t * p1) + (3 * (1 - t) * t * t * p2) + (t * t * t * final);
    //             }

    //             SetTimeout(() => {
    //                 Animation.stop();
    //                 If (droppedSquares > 100) this.Square.destroy();
    //             }, timeToAnim);

    //             Const animation = new Konva.Animation((frame) => {
    //                 Const time = frame.time / (timeToAnim / 1000);

    //                 This.Square.y(bezier(time / 1000, startPosition, endGoal, endGoal, endGoal));
    //             }, animLayer);

    //             SetTimeout(() => {
    //                 Animation.start();
    //             }, Math.random() * 50);
    //         }

    //         Private getSurroundingSquaresAboutMePage() {
    //             Const surroundingSquares = [];
    //             Const [Y, X] = this.position;
            
    //             For (let i = -1; i < 2; i++) {
    //                 If (matrix[Number(Y) + Number(i)] != undefined) {
    //                     For (let j = -1; j < 2; j++) {
    //                         If (matrix[Number(Y) + Number(i)][Number(X) + Number(j)] != undefined) {
    //                             If (Number(Y) + Number(i) != Y || Number(X) + Number(j) != X) {
    //                                 SurroundingSquares.push( matrix[Number(Y) + Number(i)][Number(X) + Number(j)] );
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
            
    //             Return surroundingSquares;
    //         }
    //     }

    //     PopulateBoard();
    //     Function populateBoard() {
    //         For (let i = 0; i < canvasLines; i++) {
    //             Matrix.push([]);
    //         }
    
    //         Matrix.forEach((row, rowIndex) => {
    //             For (let i = 0; i <= canvasColumns; i++) {
    //                 Row.push(new square([rowIndex, i]));
    //             }
    //         });
    //     }


    //     Let initialPopulation = true;
    //     Const resizeObserver = new ResizeObserver(() => {
    //         If ((canvasElement.offsetWidth > canvasWidth === false) && (canvasElement.offsetHeight * 2.2 > canvasHeight === false)) return;

    //         If (initialPopulation) {
    //             InitialPopulation = false;
    //             Return;
    //         }


    //         CanvasHeight = canvasElement.offsetHeight;
    //         CanvasWidth = canvasElement.offsetWidth;
    //         CanvasStage.height(canvasHeight * 2.2);
    //         CanvasStage.width(canvasWidth);

    //         If (canvasLines < Math.floor(canvasHeight / squareSize)) {
    //             Const dY = Math.floor(canvasHeight / squareSize) - canvasLines;

    //             For (let i = 0; i < dY; i++) {
    //                 Const row = [];
    //                 For (let j = 0; j < canvasColumns; j++) {
    //                     Row.push(new square([canvasLines + i, j]));
    //                 }
    //                 Matrix.push(row);
                    
    //             }

    //             CanvasLines += dY;
    //             FlatMatrix = matrix.flat();
    //         }
        
    //         If (canvasColumns < Math.floor(canvasWidth / squareSize)) {
    //             Const dX = Math.floor(canvasWidth / squareSize) - canvasColumns;

    //             Matrix.forEach((row, rowIndex) => {
    //                 For (let i = 0; i <= dX; i++) {
    //                     Row.push(new square([rowIndex, i + canvasColumns]));
    //                 }
    //             });

    //             CanvasColumns += dX;
    //             FlatMatrix = matrix.flat();
    //         }
    //     });
    //     ResizeObserver.observe(canvasElement);



    //     FlatMatrix = matrix.flat();

    //     Interval = setInterval(autoplayGame, 1500);
    //     Function autoplayGame() {
    //         Const randomNumber = Math.floor(Math.random() * flatMatrix.length);

    //         If (flatMatrix.length === 0) {
    //             ClearInterval(interval);
    //             Return;
    //         }

    //         FlatMatrix[randomNumber].digSquare();
    //         FlatMatrix.splice(randomNumber, 1);
    //     }

        

    //     Return () => {
    //         CanvasElement =  null;
    //         CanvasWidth = null;
    //         CanvasHeight = null;
    //         Matrix = null;
    //         SquareSize = null;
    //         CanvasLines = null;
    //         CanvasColumns = null;
    //         SquareWidth = null;
    //         SquareHeight = null;
    //         FlatMatrix = null;
    //         ClearInterval(interval);
    //         Interval = null;
    //         CanvasStage = null;
    //         BackgroundLayer = null;
    //         AnimLayer = null;
    //         DroppedSquares = null;
    //         ResizeObserver.disconnect();
    //         InitialPopulation = null;
    //     };
    // }, []);

    return (
        <div
            aria-hidden="true"
            id="background-game"
            className="z-0 absolute grid blur-2xs w-full h-[80dvh] min-h-[600px] max-h-[800px]"
        />
    );
}