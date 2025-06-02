import { sleep } from "../helpers";
const GameUIHelpers = {
    bombsPlacedTextAnim: {
        reset() {
            this.containerElemToInformUserBombCount.style.display = 'none';
            this.wrapperElemToInformUserBombCount.style.left = '0px';
            this.wrapperElemToInformUserBombCount.style.top = '0px';
            this.wrapperElemToInformUserBombCount.style.fontSize = '3rem';
            this.containerElemToInformUserBombCount.style.opacity = '0';
            this.isBombsPlacedTextVisible = false;
        },
        fadeOut() {
            this.containerElemToInformUserBombCount.style.opacity = '0';
            this.isBombsPlacedTextVisible = false;
        },
        async fadeIn() {
            this.containerElemToInformUserBombCount.style.display = 'flex';
            this.isBombsPlacedTextVisible = true;
            await sleep(100);
            this.containerElemToInformUserBombCount.style.opacity = '1';
        },
        reduceOpacity() {
            this.containerElemToInformUserBombCount.style.opacity = '0.7';
        },
        fullOpacity() {
            this.containerElemToInformUserBombCount.style.opacity = '1';
        },
        centerPosition() {
            this.wrapperElemToInformUserBombCount.style.left = '0px';
            this.wrapperElemToInformUserBombCount.style.top = '0px';
        },
        resetFontSize() {
            this.wrapperElemToInformUserBombCount.style.fontSize = '3rem';
        },
        decreaseFontSize() {
            this.wrapperElemToInformUserBombCount.style.fontSize = '1rem';
        },
        moveDownRightCorner() {
            this.wrapperElemToInformUserBombCount.style.left = 'calc(50% - 122px + 48px)';
            this.wrapperElemToInformUserBombCount.style.top = 'calc(50% - 40px + 68px)';
        }
    },
    isMobile() {
        return this.gameBoardElem.getBoundingClientRect().width < this.MOBILE_BREAKPOINT;
    },
    isTablet() {
        return this.gameBoardElem.getBoundingClientRect().width < this.DESKTOP_BREAKPOINT;
    },
    displaySmileyFace() {
        this.smileyFace.style.display = 'flex';
    },
    hideSmileyFace() {
        this.smileyFace.style.display = 'none';
    },
    toggleSmileyFace() {
        let isSmileyDisplayed = false;
        if (this.smileyFace.style.display === 'flex') {
            this.hideSmileyFace();
        }
        else {
            this.displaySmileyFace();
            isSmileyDisplayed = true;
        }
        return isSmileyDisplayed;
    },
    displayBombsPlacedText(count) {
        this.elementToInformUserBombCount.textContent = `// ${count}`;
    },
    /**
     * Get the current difficulty level as an indexed number from the active difficulty element.
     */
    currentlyChosenDifficulty() {
        return Number(this.activeDifficultyElem.dataset.difficulty);
    },
    async displayHeroSection() {
        this.heroSection.style.display = 'flex';
        await sleep(5);
        this.heroSection.style.opacity = '1';
    },
    async hideHeroSection() {
        this.heroSection.style.opacity = '0';
        await sleep(5);
        this.heroSection.style.display = 'none';
    },
    async displayGameSettings() {
        this.gameSettings.style.display = 'flex';
        await sleep(5);
        this.gameSettings.style.opacity = '1';
    },
    async hideGameSettings() {
        this.gameSettings.style.opacity = '0';
        await sleep(5);
        this.gameSettings.style.display = 'none';
    },
    minesweeperSessionIndicator: {
        setActive() {
            this.gameBoard.minesweeperSessionIndicatorElem.innerHTML = '<div></div>';
        },
        setInactive() {
            this.gameBoard.minesweeperSessionIndicatorElem.innerHTML = '';
        }
    },
    removeDifficultySelectorsActiveStatus() {
        this.difficultySelectors.forEach((selector) => selector.classList.remove('active'));
    }
};
export default GameUIHelpers;
