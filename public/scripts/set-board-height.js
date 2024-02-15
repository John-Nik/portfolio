const minesweeperContainer = document.querySelector('#minesweeper-container');
let containerHeight = '';

if (window.innerWidth < 860) {
    containerHeight = window.innerHeight - 64 - 58 + 'px';
} else {
    containerHeight = window.innerHeight - 90 - 58 + 'px';
}


minesweeperContainer.style.height = containerHeight;