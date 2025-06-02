const SquareHelpers = {
    animateSquareBounce() {
        this.elem.animate([
            { scale: '0.9' },
            { scale: '1' }
        ], {
            duration: 250,
            iterations: 1,
            easing: 'ease-in-out',
        })
    },
    flagSquare() {
        this.isFlagged = true;
        this.gameBoard.bombsPresent.value--;
        this.gameBoard.squaresInteractedWith++;
        this.elem.innerHTML = this.flagSvg;
    },
    toggleSquareFlag() {
        if (this.isRevealed) return;

        if (this.isFlagged) {
            this.unflagSquare();
        } else {
            this.flagSquare();
        }

        this.gameBoard.checkIfGameIsFinished();
    },
    unflagSquare() {
        this.isFlagged = false;
        this.gameBoard.bombsPresent.value++;
        this.gameBoard.squaresInteractedWith--;
        this.elem.innerHTML = '';
    },
    revealSquare() {
        this.isRevealed = true;
        this.gameBoard.squaresInteractedWith++;
        this.elem.classList.add('revealed');
    },
    unRevealSquare() {
        this.isRevealed = false;
        this.gameBoard.squaresInteractedWith--;
        this.elem.classList.remove('revealed');
        this.elem.innerHTML = '';
    },
    toggleSquareReveal() {
        if (this.isRevealed) {
            this.unRevealSquare();
        } else {
            this.revealSquare();
        }
    }
}

export default SquareHelpers;