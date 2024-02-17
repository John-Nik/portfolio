const minesweeperContainer = document.querySelector('#minesweeper-container');
let containerHeight = '';

if (window.innerWidth < 1200) {
    containerHeight = window.innerHeight - 64 - 58 + 'px';
} else {
    containerHeight = window.innerHeight - 90 - 58 + 'px';
}

minesweeperContainer.style.height = containerHeight;

window.addEventListener('resize', () => {
    if (window.innerWidth < 1200) {
        containerHeight = window.innerHeight - 64 - 58 + 'px';
    } else {
        containerHeight = window.innerHeight - 90 - 58 + 'px';
    }

    minesweeperContainer.style.height = containerHeight;
})