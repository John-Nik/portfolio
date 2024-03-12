const breakLineTextContent = document.querySelector('.break-line');

if (window.innerWidth < 950) {
    breakLineTextContent.innerHTML = '<br><br>'
} else {
    breakLineTextContent.innerHTML = '';
}

window.addEventListener('resize', () => {
    if (window.innerWidth < 950) {
        breakLineTextContent.innerHTML = '<br><br>'
    } else {
        breakLineTextContent.innerHTML = '';
    }
})