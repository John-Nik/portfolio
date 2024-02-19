const bolt2 = document.querySelector('#bolt2');
const bolt4 = document.querySelector('#bolt4');
const gameSettingsPanel = document.querySelector('.game-settings-container');
let panelHeight;
let showSettingsPanelButton = document.querySelector('.show-settings-panel-button');

showSettingsPanelButton.addEventListener('click', () => {
    setTimeout(() => {
        panelHeight = gameSettingsPanel.offsetHeight;
        let desiredMarginTop = panelHeight * 1 - 35 + 'px';
        
        bolt2.style.marginTop = desiredMarginTop;
        bolt4.style.marginTop = desiredMarginTop;
    }, 210)
})

window.addEventListener('resize', () => {
    panelHeight = gameSettingsPanel.offsetHeight;
    let desiredMarginTop = panelHeight * 1 - 35 + 'px';
    
    bolt2.style.marginTop = desiredMarginTop;
    bolt4.style.marginTop = desiredMarginTop;
})