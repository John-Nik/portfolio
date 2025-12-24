import GameBoard from '../../../minesweeper/GameBoard/GameBoard';
import Game from '../../minesweeper';
import { sleep } from '../helpers';

class GameUI {
    readonly DESKTOP_BREAKPOINT: number = 1024;
    readonly MOBILE_BREAKPOINT: number = 720;

    gameBoardElem: HTMLDivElement | null = document.querySelector('#game');
    heroSection: HTMLDivElement | null = document.querySelector('[data-hero-text-container]');
    gameSettings: HTMLDivElement | null = document.querySelector('[data-game-settings]');
    smileyFace: HTMLImageElement | null = document.querySelector('.dead-smiley-wrapper');
    socialsIcon: HTMLDivElement | null = document.querySelector('[data-socials-icon]');
    flagIcon: HTMLDivElement | null = document.querySelector('[data-flag-icon]');
    footerIconsContainer: HTMLDivElement | null = document.querySelector('.footer-links-container');
    gameSettingsSubtitle: HTMLSpanElement | null = document.querySelector('.end-game-status'); // Visible only on desktop
    startGameButton: HTMLButtonElement | null = document.querySelector('[data-start-game-button]');
    containerElemToInformUserBombCount: HTMLDivElement | null = document.querySelector('[data-bombs-placed-container]');
    wrapperElemToInformUserBombCount: HTMLDivElement | null = document.querySelector('[data-bombs-placed-wrapper]');
    elementToInformUserBombCount: HTMLDivElement | null = document.querySelector('[data-bombs-placed-text]');
    instructionsElem: HTMLSpanElement | null = document.querySelector('[data-instructions-span]');
    gameSettingsElem: HTMLDivElement | null = document.querySelector('[data-game-settings]');
    activeDifficultyElem: HTMLSpanElement | null = document.querySelector('[data-difficulty-selector][data-active=true]');
    isBombsPlacedTextVisible: boolean = false;
    showSettingsButton: HTMLButtonElement | null = document.querySelector('[data-show-game-settings-button]');
    game: Game | null = null;
    difficultySelectors: HTMLButtonElement[] = Array.from(document.querySelectorAll('[data-difficulty-selector]'));
    showGameSettingsButton: HTMLButtonElement | null = document.querySelector('.show-settings-panel-button'); // Only displayed on mobile view
    toggleBackgroundElem: HTMLDivElement | null = document.querySelector('.toggle-background');
    lastShownPanel: 'heroSection' | 'gameSettings' = 'heroSection';
    isDesktopResolution: boolean = false;
    resizeObserver: ResizeObserver | null = null;
    isBeingDestroyed: boolean = false;
    
    constructor(game: Game) {
        this.game = game;
    };

    init() {
        this.validateGameIsLinked();
        this.validateElem(this.gameBoardElem);
        this.validateElem(this.smileyFace);
        this.validateElem(this.startGameButton);
        this.validateElem(this.showSettingsButton);

        this.gameBoardElem.addEventListener('contextmenu', e => e.preventDefault(), { signal: this.game.abort.signal });
        this.adaptGameUserInstructionsToWidth(this.gameBoardElem.getBoundingClientRect().width);

        this.startGameButton.addEventListener('click', () => this.startGame(), { signal: this.game.abort.signal });
        this.smileyFace.addEventListener('click', () => this.startGame(), { signal: this.game.abort.signal });
        this.showSettingsButton.addEventListener('click', () => this.goToNextPanel(), { signal: this.game.abort.signal });

        this.setEventListenersToDifficultySelectors();

        this.isDesktopResolution = !this.isTablet();

        this.attachResizeObserver();
    }

    adaptGameUserInstructionsToWidth(width = window.innerWidth) {
        this.validateElem(this.instructionsElem);

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
        if (this.isMobile()) {
            this.resetBombsPlacedText();
            return;
        }

        if (await this.sleepAndCheckDestroyed(4500)) return;

        this.validateGameBoard();
        if (!this.game.board.autoplayRunning) return;

        this.fadeOutBombsPlacedText();

        if (await this.sleepAndCheckDestroyed(1500)) return;

        this.resetBombsPlacedText();
    }

    async shakeBoard(times = 10) {
        this.validateElem(this.gameBoardElem);

        this.gameBoardElem.style.scale = '1.005';

        for (let i = 1; i <= times; i++) {
            this.validateElem(this.gameBoardElem);

            if (i === times) {
                this.gameBoardElem.style.scale = '1';
                this.gameBoardElem.style.left = '0px';
                this.gameBoardElem.style.top = '0px';
                continue;
            }

            const useNegativeShakeCoords = times % 2 === 0;
            const randomX = Math.ceil(Math.random() * 2) * (useNegativeShakeCoords ? -1 : 1);
            const randomY = Math.ceil(Math.random() * 2) * (useNegativeShakeCoords ? -1 : 1);

            this.gameBoardElem.style.left = `${randomX}px`;
            this.gameBoardElem.style.top = `${randomY}px`;

            if (await this.sleepAndCheckDestroyed(30)) return;
        }
    }

    async startGame(bombsCount: number | undefined = this.game?.board?.bombsPresent.value) {
        if (bombsCount === undefined) {
            throw new Error('Bombs count is undefined. That is unexpected. Is the game initiated?');
        }

        this.validateGameBoard();

        this.game.board.stopGameAutoplay();
        this.game.board.startGame();

        this.hideSmileyFace();
        this.hideGameSettings();
        this.hideHeroSection();

        if (this.isBombsPlacedTextVisible) {
            this.centerPositionBombsPlacedText();
            this.fullOpacityBombsPlacedText();
            this.resetFontSizeBombsPlacedText();

            if (await this.sleepAndCheckDestroyed(2000)) return;

            this.validateElem(this.elementToInformUserBombCount);

            this.elementToInformUserBombCount.textContent = '//';

            if (await this.sleepAndCheckDestroyed(500)) return;

            this.moveDownRightCornerBombsPlacedText();
            this.reduceOpacityBombsPlacedText();
            this.decreaseFontSizeBombsPlacedText();

            if (await this.sleepAndCheckDestroyed(250)) return;

            this.displayBombsPlacedText(bombsCount);
        } else {
            this.fadeInBombsPlacedText();
            this.displayBombsPlacedText(bombsCount);

            if (await this.sleepAndCheckDestroyed(2000)) return;

            this.moveDownRightCornerBombsPlacedText();
            this.reduceOpacityBombsPlacedText();
            this.decreaseFontSizeBombsPlacedText();
        }
    }

    async hideBombsCountText() {
        if (this.isTablet()) {
            this.resetBombsPlacedText();
            return;
        }

        if (await this.sleepAndCheckDestroyed(4500)) return;

        this.validateGameBoard();

        // If the user decided to restart the game in those 4500ms timespan, then exit the function early
        if (!this.game.board.autoplayRunning) return;

        this.fadeOutBombsPlacedText();

        if (await this.sleepAndCheckDestroyed(1500)) return;

        this.resetBombsPlacedText();
    }

    displayLostGameText() {
        if (this.isMobile()) {
            if (!this.showSettingsButton) {
                throw new Error('Show settings button not found in DOM.');
            }

            this.showSettingsButton.innerHTML = 'You-lost<br>Play-again?';
            this.displayHeroSection();
            return;
        }

        this.validateElem(this.gameSettingsSubtitle);
        this.validateElem(this.startGameButton);

        this.gameSettingsSubtitle.innerHTML = "You've lost the game";
        this.startGameButton.innerHTML = 'Play-again';
        
        this.displayHeroSection();
        this.displayGameSettings();
    }

    displayWinGameText() {
        if (this.isMobile()) {
            if (!this.showSettingsButton) {
                throw new Error('Show settings button not found in DOM.');
            }

            this.showSettingsButton.innerHTML = 'You-won<br>Play-again?';
            this.displayHeroSection();
            return;
        }

        this.validateElem(this.gameSettingsSubtitle);
        this.validateElem(this.startGameButton);

        this.gameSettingsSubtitle.innerHTML = "You've won!";
        this.startGameButton.innerHTML = 'Play-again';
        
        this.displayHeroSection();
        this.displayGameSettings();
    }

    async goToNextPanel() {
        this.validateElem(this.heroSection);
        this.validateElem(this.gameSettings);

        this.lastShownPanel = 'gameSettings';

        this.compactFooter();

        this.heroSection.style.opacity = '0';

        if (await this.sleepAndCheckDestroyed(200)) return;

        this.heroSection.style.display = 'none';
        this.gameSettings.style.display = 'flex';

        if (await this.sleepAndCheckDestroyed(5)) return;

        this.gameSettings.style.opacity = '1';
    }

    compactFooter() {
        this.validateElem(this.footerIconsContainer);
        this.validateElem(this.socialsIcon);
        this.validateElem(this.flagIcon);

        this.footerIconsContainer.classList.add('hide-icons');
        this.socialsIcon.classList.add('show');
        this.flagIcon.classList.add('show');
    }

    unpackFooter() {
        this.validateElem(this.toggleBackgroundElem);
        this.validateElem(this.footerIconsContainer);
        this.validateElem(this.socialsIcon);
        this.validateElem(this.flagIcon);

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

        this.validateElem(this.gameBoardElem);

        this.resizeObserver.observe(this.gameBoardElem);
    }

    resetBombsPlacedText() {
        this.validateElem(this.containerElemToInformUserBombCount);
        this.validateElem(this.wrapperElemToInformUserBombCount);

        this.containerElemToInformUserBombCount.style.display = 'none';
        this.wrapperElemToInformUserBombCount.style.left = '0px';
        this.wrapperElemToInformUserBombCount.style.top = '0px';
        this.wrapperElemToInformUserBombCount.style.fontSize = '3rem';
        this.containerElemToInformUserBombCount.style.opacity = '0';
        this.isBombsPlacedTextVisible = false;
    };

    fadeOutBombsPlacedText() {
        this.validateElem(this.containerElemToInformUserBombCount);

        this.containerElemToInformUserBombCount.style.opacity = '0';
        this.isBombsPlacedTextVisible = false;
    };

    async fadeInBombsPlacedText() {
        this.validateElem(this.containerElemToInformUserBombCount);

        this.containerElemToInformUserBombCount.style.display = 'flex';
        this.isBombsPlacedTextVisible = true;

        if (await this.sleepAndCheckDestroyed(100)) return;

        this.containerElemToInformUserBombCount.style.opacity = '1';
    };

    reduceOpacityBombsPlacedText() {
        this.validateElem(this.containerElemToInformUserBombCount);

        this.containerElemToInformUserBombCount.style.opacity = '0.7';
    };

    fullOpacityBombsPlacedText() {
        this.validateElem(this.containerElemToInformUserBombCount);

        this.containerElemToInformUserBombCount.style.opacity = '1';
    };

    centerPositionBombsPlacedText() {
        this.validateElem(this.wrapperElemToInformUserBombCount);

        this.wrapperElemToInformUserBombCount.style.left = '0px';
        this.wrapperElemToInformUserBombCount.style.top = '0px';
    };

    resetFontSizeBombsPlacedText() {
        this.validateElem(this.wrapperElemToInformUserBombCount);

        this.wrapperElemToInformUserBombCount.style.fontSize = '3rem';
    };

    decreaseFontSizeBombsPlacedText() {
        this.validateElem(this.wrapperElemToInformUserBombCount);

        this.wrapperElemToInformUserBombCount.style.fontSize = '1rem';
    };

    moveDownRightCornerBombsPlacedText() {
        this.validateElem(this.wrapperElemToInformUserBombCount);

        this.wrapperElemToInformUserBombCount.style.left = 'calc(50% - 122px + 48px)';
        this.wrapperElemToInformUserBombCount.style.top = 'calc(50% - 40px + 68px)';
    }

    isMobile() {
        this.validateElem(this.gameBoardElem);

        return this.gameBoardElem.getBoundingClientRect().width < this.MOBILE_BREAKPOINT;
    };

    isTablet() {
        this.validateElem(this.gameBoardElem);
        
        return this.gameBoardElem.getBoundingClientRect().width < this.DESKTOP_BREAKPOINT;
    };

    displaySmileyFace() {
        this.validateElem(this.smileyFace);

        this.smileyFace.style.display = 'flex';
    };

    hideSmileyFace() {
        this.validateElem(this.smileyFace);

        this.smileyFace.style.display = 'none';
    };

    toggleSmileyFace() {
        this.validateElem(this.smileyFace);

        let isSmileyDisplayed = false;

        if (this.smileyFace.style.display === 'flex') {
            this.hideSmileyFace();
        } else {
            this.displaySmileyFace();
            isSmileyDisplayed = true;
        }

        return isSmileyDisplayed;
    };

    displayBombsPlacedText(count: number) {
        this.validateElem(this.elementToInformUserBombCount);

        this.elementToInformUserBombCount.textContent = `// ${count}`;
    };

    /**
     * Get the current difficulty level as an indexed number from the active difficulty element.
     */
    currentlyChosenDifficulty() {
        this.validateElem(this.activeDifficultyElem);

        return Number(this.activeDifficultyElem.dataset.difficulty);
    };

    async displayHeroSection() {
        this.validateElem(this.heroSection);

        this.heroSection.style.display = 'flex';

        if (await this.sleepAndCheckDestroyed(5)) return;

        this.heroSection.style.opacity = '1';
    };

    async hideHeroSection() {
        this.validateElem(this.heroSection);

        this.heroSection.style.opacity = '0';

        if (await this.sleepAndCheckDestroyed(5)) return;

        this.heroSection.style.display = 'none';
    };

    async displayGameSettings() {
        this.validateElem(this.gameSettings);

        this.gameSettings.style.display = 'flex';

        if (await this.sleepAndCheckDestroyed(5)) return;

        this.gameSettings.style.opacity = '1';
    };

    async hideGameSettings() {
        this.validateElem(this.gameSettings);

        this.gameSettings.style.opacity = '0';

        if (await this.sleepAndCheckDestroyed(5)) return;

        this.gameSettings.style.display = 'none';
    };

    removeDifficultySelectorsActiveStatus() {
        this.difficultySelectors.forEach(button => button.dataset.active = 'false');
    };

    setEventListenersToDifficultySelectors() {
        this.validateGameIsLinked();

        this.difficultySelectors.forEach(selector => {
            selector.addEventListener('click', (e: MouseEvent) => {
                this.removeDifficultySelectorsActiveStatus();

                const button = e.currentTarget;
                if (!(button instanceof HTMLButtonElement)) {
                    throw new Error('Difficulty selector is not an HTML Button');
                }

                button.dataset.active = 'true';
            }, { signal: this.game.abort.signal });
        });
    };

    async sleepAndCheckDestroyed(ms: number) {
        await sleep(ms);
        return this.isBeingDestroyed;
    };

    validateGameIsLinked(): asserts this is GameUI & { game: Game } {
        if (!this.game) {
            throw new Error('Game instance is not linked to a GameUI instance.');
        }
    }

    validateElem(elem: HTMLElement | null): asserts elem is HTMLElement {
        if (!elem) {
            throw new Error('Element is not initialized.');
        }
    }

    validateGameBoard(): asserts this is GameUI & { game: Game & { board: GameBoard } } {
        this.validateGameIsLinked();

        if (this.game.board === null) {
            throw new Error('GameBoard is not instantiated');
        }
    }

    destroy() {
        this.isBeingDestroyed = true;
    }
}

export default GameUI;