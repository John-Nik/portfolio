import { sleep } from "../helpers";
import GameUIHelpers from "./GameUIHelpers";
class GameUI {
    constructor() {
        this.DESKTOP_BREAKPOINT = 1024;
        this.MOBILE_BREAKPOINT = 720;
        this.gameBoardElem = document.querySelector('#game');
        this.heroSection = document.querySelector('.textContent');
        this.gameSettings = document.querySelector('.gameSettings');
        this.smileyFace = document.querySelector('.dead-face-wrapper');
        this.socialsIcon = document.querySelector('.socials-icon-wrap');
        this.flagIcon = document.querySelector('.flag-icon-wrap');
        this.footerIconsContainer = document.querySelector('.footer-links-container');
        this.gameSettingsSubtitle = document.querySelector('.end-game-status'); // Visible only on desktop
        this.startGameButton = document.querySelector('.start-game-button');
        this.containerElemToInformUserBombCount = document.querySelector('.bombs-placed-container');
        this.wrapperElemToInformUserBombCount = document.querySelector('.bombs-placed-container .wrapper');
        this.elementToInformUserBombCount = document.querySelector('.bombs-placed-text');
        this.instructionsElem = document.querySelector('.game-instructions-span');
        this.elemToTriggerTapMode = document.querySelector('.flag-icon-wrap');
        this.gameSettingsElem = document.querySelector('.gameSettings');
        this.activeDifficultyElem = document.querySelector('.difficulty-feedback.active');
        this.isBombsPlacedTextVisible = false;
        this.showSettingsButton = document.querySelector('.show-settings-panel-button');
        this.difficultySelectors = Array.from(document.querySelectorAll('.difficulty-feedback'));
        this.init();
    }
    ;
    init() {
        this.gameBoardElem.addEventListener('contextmenu', e => e.preventDefault());
        this.adaptGameUserInstructionsToWidth(this.gameBoardElem.getBoundingClientRect().width);
        this.startGameButton.addEventListener('click', () => this.startGame());
        this.difficultySelectors.forEach(selector => {
            selector.addEventListener('click', (e) => {
                this.removeDifficultySelectorsActiveStatus();
                const button = e.currentTarget;
                button.classList.add('active');
            });
        });
    }
    adaptGameUserInstructionsToWidth(width = window.innerWidth) {
        if (width < this.DESKTOP_BREAKPOINT) {
            this.instructionsElem.innerHTML = '// Click bottom right flag to switch to flagging or digging squares';
        }
        else {
            this.instructionsElem.innerHTML = '// Left click to dig square <br> // Right click to flag square';
        }
    }
    lostGame() {
        this.displaySmileyFace();
        this.displayLostGameText();
        this.resetBombsCountElemPosition();
        this.shakeBoard();
        this.hideBombsCountText();
        this.adaptGameUserInstructionsToWidth();
    }
    winGame() {
        this.resetBombsCountElemPosition();
        this.displayWinGameText();
        this.adaptGameUserInstructionsToWidth();
    }
    async resetBombsCountElemPosition() {
        if (this.isMobile()) {
            this.bombsPlacedTextAnim.reset();
            return;
        }
        await sleep(4500);
        if (!this.gameBoard.autoplayRunning)
            return;
        this.bombsPlacedTextAnim.fadeOut();
        await sleep(1500);
        this.bombsPlacedTextAnim.reset();
    }
    shakeBoard(times = 10) {
        this.gameBoardElem.style.scale = "1.01";
        const intervalShakeGameBoard = setInterval(() => {
            if (times === 0) {
                clearInterval(intervalShakeGameBoard);
                this.gameBoardElem.style.scale = "1";
                return;
            }
            const randomX = Math.ceil(Math.random() * 2);
            const randomY = Math.ceil(Math.random() * 2);
            const useNegativeShakeCoords = times % 2 === 0;
            this.gameBoardElem.style.left = useNegativeShakeCoords ? `-${randomX}px` : `${randomX}px`;
            this.gameBoardElem.style.top = useNegativeShakeCoords ? `-${randomY}px` : `${randomY}px`;
            times--;
        }, 30);
    }
    async startGame(bombsCount = this.gameBoard.bombsPresent.value) {
        this.gameBoard.stopGameAutoplay();
        this.gameBoard.resetBoard();
        this.hideSmileyFace();
        this.minesweeperSessionIndicator.setActive();
        this.hideGameSettings();
        this.hideHeroSection();
        console.log('hellow rodl');
        if (this.isBombsPlacedTextVisible) {
            this.bombsPlacedTextAnim.centerPosition();
            this.bombsPlacedTextAnim.fullOpacity();
            this.bombsPlacedTextAnim.resetFontSize();
            await sleep(2000);
            this.elementToInformUserBombCount.textContent = '//';
            await sleep(500);
            this.bombsPlacedTextAnim.moveDownRightCorner();
            this.bombsPlacedTextAnim.reduceOpacity();
            this.bombsPlacedTextAnim.decreaseFontSize();
            await sleep(250);
            this.displayBombsPlacedText(bombsCount);
        }
        else {
            this.bombsPlacedTextAnim.fadeIn();
            this.displayBombsPlacedText(bombsCount);
            await sleep(2000);
            this.bombsPlacedTextAnim.moveDownRightCorner();
            this.bombsPlacedTextAnim.reduceOpacity();
            this.bombsPlacedTextAnim.decreaseFontSize();
        }
    }
    async hideBombsCountText() {
        if (this.isTablet()) {
            this.bombsPlacedTextAnim.reset();
            return;
        }
        await sleep(4500);
        // If the user decided to restart the game in those 4500ms timespan, then exit the function early
        if (!this.gameBoard.autoplayRunning)
            return;
        this.bombsPlacedTextAnim.fadeOut();
        await sleep(1500);
        this.bombsPlacedTextAnim.reset();
    }
    async displayLostGameText() {
        if (this.isMobile()) {
            this.showSettingsButton.innerHTML = 'You-lost<br>Play-again?';
            this.displayHeroSection();
            return;
        }
        this.gameSettingsSubtitle.innerHTML = "You've lost the game";
        this.startGameButton.innerHTML = 'Play-again';
        this.displayHeroSection();
        this.displayGameSettings();
    }
    async displayWinGameText() {
        if (this.isMobile()) {
            this.showSettingsButton.innerHTML = 'You-won<br>Play-again?';
            this.displayHeroSection();
            return;
        }
        this.gameSettingsSubtitle.innerHTML = "You've won!";
        this.startGameButton.innerHTML = 'Play-again';
        this.displayHeroSection();
        this.displayGameSettings();
    }
}
Object.assign(GameUI.prototype, GameUIHelpers);
export default GameUI;
