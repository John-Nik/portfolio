import GameBoard from "../GameBoard/GameBoard";
import { sleep } from "../helpers";
import GameUIHelpers from "./GameUIHelpers";

class GameUI {
    readonly DESKTOP_BREAKPOINT: number = 1024;
    readonly MOBILE_BREAKPOINT: number = 720;

    gameBoardElem: HTMLDivElement = document.querySelector('#game') as HTMLDivElement;
    heroSection: HTMLDivElement = document.querySelector('.textContent');
    gameSettings: HTMLDivElement = document.querySelector('.gameSettings');
    smileyFace: HTMLImageElement = document.querySelector('.dead-smiley-wrapper');
    socialsIcon: HTMLDivElement = document.querySelector('.socials-icon-wrap');
    flagIcon: HTMLDivElement = document.querySelector('.flag-icon-wrap');
    footerIconsContainer: HTMLDivElement = document.querySelector('.footer-links-container');
    gameSettingsSubtitle: HTMLSpanElement = document.querySelector('.end-game-status'); // Visible only on desktop
    startGameButton: HTMLButtonElement = document.querySelector('.start-game-button');
    containerElemToInformUserBombCount: HTMLDivElement = document.querySelector('.bombs-placed-container');
    wrapperElemToInformUserBombCount: HTMLDivElement = document.querySelector('.bombs-placed-container .wrapper');
    elementToInformUserBombCount: HTMLDivElement = document.querySelector('.bombs-placed-text');
    instructionsElem: HTMLSpanElement = document.querySelector('.game-instructions-span');
    elemToTriggerTapMode: HTMLDivElement = document.querySelector('.flag-icon-wrap');
    gameSettingsElem: HTMLDivElement = document.querySelector('.gameSettings');
    activeDifficultyElem: HTMLSpanElement = document.querySelector('.difficulty-feedback.active');
    isBombsPlacedTextVisible: boolean = false;
    showSettingsButton: HTMLButtonElement | null = document.querySelector('.show-settings-panel-button');
    gameBoard: GameBoard;
    difficultySelectors: HTMLButtonElement[] = Array.from(document.querySelectorAll('.difficulty-feedback'));
    showGameSettingsButton: HTMLButtonElement = document.querySelector('.show-settings-panel-button'); // only displayed on mobile view
    toggleBackgroundElem: HTMLDivElement = document.querySelector('.toggle-background');
    lastShownPanel: 'heroSection' | 'gameSettings' = 'heroSection';
    isDesktopResolution: boolean;
    resizeObserver: ResizeObserver | null = null;

    // Explicitly defined types for GameUIHelpers methods
    bombsPlacedTextAnim: typeof GameUIHelpers.bombsPlacedTextAnim;
    isMobile: typeof GameUIHelpers.isMobile;
    isTablet: typeof GameUIHelpers.isTablet;
    displaySmileyFace: typeof GameUIHelpers.displaySmileyFace;
    hideSmileyFace: typeof GameUIHelpers.hideSmileyFace;
    toggleSmileyFace: typeof GameUIHelpers.toggleSmileyFace;
    displayBombsPlacedText: typeof GameUIHelpers.displayBombsPlacedText;
    currentlyChosenDifficulty: typeof GameUIHelpers.currentlyChosenDifficulty;
    displayHeroSection: typeof GameUIHelpers.displayHeroSection;
    hideHeroSection: typeof GameUIHelpers.hideHeroSection;
    displayGameSettings: typeof GameUIHelpers.displayGameSettings;
    hideGameSettings: typeof GameUIHelpers.hideGameSettings;
    minesweeperSessionIndicator: typeof GameUIHelpers.minesweeperSessionIndicator;
    removeDifficultySelectorsActiveStatus: typeof GameUIHelpers.removeDifficultySelectorsActiveStatus;
    setEventListenersToDifficultySelectors: typeof GameUIHelpers.setEventListenersToDifficultySelectors;
    


    constructor() {
        this.init();
    };

    init() {
        this.gameBoardElem.addEventListener('contextmenu', e => e.preventDefault());
        this.adaptGameUserInstructionsToWidth(this.gameBoardElem.getBoundingClientRect().width);

        this.startGameButton.addEventListener('click', () => this.startGame());
        this.smileyFace.addEventListener('click', () => this.startGame());
        this.showSettingsButton.addEventListener('click', () => this.goToNextPanel());

        this.setEventListenersToDifficultySelectors();

        this.isDesktopResolution = !this.isTablet();

        this.attachResizeObserver();
    }

    adaptGameUserInstructionsToWidth(width = window.innerWidth) {
        if (width < this.DESKTOP_BREAKPOINT) {
            this.instructionsElem.innerHTML = '// Click bottom right flag to switch to flagging or digging squares';
        } else {
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
        this.unpackFooter();
        this.lastShownPanel = 'heroSection';
    }

    winGame() {
        this.resetBombsCountElemPosition();
        this.displayWinGameText();
        this.adaptGameUserInstructionsToWidth();
        this.unpackFooter();
        this.lastShownPanel = 'heroSection';
    }

    async resetBombsCountElemPosition() {
        const animBombsText = this.bombsPlacedTextAnim();

        if (this.isMobile()) {
            animBombsText.reset();
            return;
        }

        await sleep(4500);

        if (!this.gameBoard.autoplayRunning) return;

        animBombsText.fadeOut();

        await sleep(1500);

        animBombsText.reset();
    }

    shakeBoard(times = 10) {
        this.gameBoardElem.style.scale = "1.005";

        const intervalShakeGameBoard = setInterval(() => {
            if (times === 0) {
                clearInterval(intervalShakeGameBoard);
                this.gameBoardElem.style.scale = "1";
                this.gameBoardElem.style.left = '0px';
                this.gameBoardElem.style.top = '0px';
                return;
            }

            const randomX = Math.ceil(Math.random() * 2);
            const randomY = Math.ceil(Math.random() * 2);
            const useNegativeShakeCoords = times % 2 === 0;

            this.gameBoardElem.style.left = useNegativeShakeCoords ? `-${randomX}px` : `${randomX}px`;
            this.gameBoardElem.style.top = useNegativeShakeCoords ? `-${randomY}px` : `${randomY}px`;

            times--;
        }, 30)
    }

    async startGame(bombsCount: number = this.gameBoard.bombsPresent.value) {
        const animBombsText = this.bombsPlacedTextAnim();

        this.gameBoard.stopGameAutoplay();
        this.gameBoard.startGame();
        
        this.hideSmileyFace();
        this.minesweeperSessionIndicator('active');
        this.hideGameSettings();
        this.hideHeroSection();

        if (this.isBombsPlacedTextVisible) {
            animBombsText.centerPosition();
            animBombsText.fullOpacity();
            animBombsText.resetFontSize();

            await sleep(2000);

            this.elementToInformUserBombCount.textContent = '//';

            await sleep(500);

            animBombsText.moveDownRightCorner();
            animBombsText.reduceOpacity();
            animBombsText.decreaseFontSize();

            await sleep(250);

            this.displayBombsPlacedText(bombsCount);
        } else {
            animBombsText.fadeIn();
            this.displayBombsPlacedText(bombsCount);

            await sleep(2000);

            animBombsText.moveDownRightCorner();
            animBombsText.reduceOpacity();
            animBombsText.decreaseFontSize();
        }
    }

    async hideBombsCountText() {
        const animBombsText = this.bombsPlacedTextAnim();

        if (this.isTablet()) {
            animBombsText.reset()
            return;
        }

        await sleep(4500);

        // If the user decided to restart the game in those 4500ms timespan, then exit the function early
        if (!this.gameBoard.autoplayRunning) return;

        animBombsText.fadeOut();

        await sleep(1500);

        animBombsText.reset();
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

    async goToNextPanel() {
        this.lastShownPanel = 'gameSettings';

        this.compactFooter();

        this.heroSection.style.opacity = '0';

        await sleep(200);

        this.heroSection.style.display = 'none';
        this.gameSettings.style.display = 'flex';

        await sleep(5);

        this.gameSettings.style.opacity = '1';
    }

    compactFooter() {
        this.footerIconsContainer.classList.add('hide-icons');
        this.socialsIcon.classList.add('show');
        this.flagIcon.classList.add('show');
    }

    unpackFooter() {
        this.toggleBackgroundElem.classList.remove('open');
        this.footerIconsContainer.classList.remove('show-icons');
        this.footerIconsContainer.classList.remove('hide-icons');
        this.socialsIcon.classList.remove('show');
        this.flagIcon.classList.remove('show');
    }

    attachResizeObserver() {
        this.resizeObserver = new ResizeObserver(entries => {
            const { width } = entries[0].contentRect;

            if (width >= this.DESKTOP_BREAKPOINT) {
                this.isDesktopResolution = true;
                this.displayHeroSection();
                this.displayGameSettings();
                return;
            }

            this.isDesktopResolution = false;

            if (this.lastShownPanel === 'heroSection') {
                this.hideGameSettings();
                this.displayHeroSection();
            } else {
                this.hideHeroSection();
                this.displayGameSettings();
            }
        });

        this.resizeObserver.observe(this.gameBoardElem);
    }
}

Object.assign(GameUI.prototype, GameUIHelpers);
export default GameUI;