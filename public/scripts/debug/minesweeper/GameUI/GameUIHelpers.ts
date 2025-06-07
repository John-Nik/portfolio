import { sleep } from "../helpers";

const GameUIHelpers = {
    bombsPlacedTextAnim() {
        function anim() {};

        anim.reset = () => {
            this.containerElemToInformUserBombCount.style.display = 'none';
            this.wrapperElemToInformUserBombCount.style.left = '0px';
            this.wrapperElemToInformUserBombCount.style.top = '0px';
            this.wrapperElemToInformUserBombCount.style.fontSize = '3rem';
            this.containerElemToInformUserBombCount.style.opacity = '0';
            this.isBombsPlacedTextVisible = false;
        };

        anim.fadeOut = () => {
            this.containerElemToInformUserBombCount.style.opacity = '0';
            this.isBombsPlacedTextVisible = false;
        };

        anim.fadeIn = async () => {
            this.containerElemToInformUserBombCount.style.display = 'flex';
            this.isBombsPlacedTextVisible = true;

            await sleep(100);

            this.containerElemToInformUserBombCount.style.opacity = '1';
        };

        anim.reduceOpacity = () => {
            this.containerElemToInformUserBombCount.style.opacity = '0.7';
        };

        anim.fullOpacity = () =>  {
            this.containerElemToInformUserBombCount.style.opacity = '1';
        };

        anim.centerPosition = () => {
            this.wrapperElemToInformUserBombCount.style.left = '0px';
            this.wrapperElemToInformUserBombCount.style.top = '0px';
        };
        
        anim.resetFontSize = () => {
            this.wrapperElemToInformUserBombCount.style.fontSize = '3rem';
        };

        anim.decreaseFontSize = () => {
            this.wrapperElemToInformUserBombCount.style.fontSize = '1rem';
        };

        anim.moveDownRightCorner = () => {
            this.wrapperElemToInformUserBombCount.style.left = 'calc(50% - 122px + 48px)';
            this.wrapperElemToInformUserBombCount.style.top = 'calc(50% - 40px + 68px)';
        };

        return anim;
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
        } else {
            this.displaySmileyFace();
            isSmileyDisplayed = true;
        }

        return isSmileyDisplayed;
    },
    displayBombsPlacedText(count: number) {
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
    minesweeperSessionIndicator(type: 'active' | 'inactive') {
        if (type === 'active') {
            this.gameBoard.minesweeperSessionIndicatorElem.innerHTML = '<div></div>';
        } else {
            this.gameBoard.minesweeperSessionIndicatorElem.innerHTML = '';
        }
    },
    removeDifficultySelectorsActiveStatus() {
        this.difficultySelectors.forEach((selector: HTMLButtonElement) => selector.classList.remove('active'));
    },
    setEventListenersToDifficultySelectors() {
        this.difficultySelectors.forEach(selector => {
            selector.addEventListener('click', (e: MouseEvent) => {
                this.removeDifficultySelectorsActiveStatus();
                
                const button = e.currentTarget as HTMLButtonElement;
                button.classList.add('active');
            });
        });
    },
}

export default GameUIHelpers;