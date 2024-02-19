const workTitle = document.querySelector('.work');
let timer = 70;
let titles = [' a UI Designer', ' a UX Des', ' a front-end developer'];
let arrayIndex = 0;
let charAtIndex = 0;
let stringPrintedArray = [];
let stringPrinted = '';
let isFuncAddingChars = true;
let interval = setInterval(animateTitle, timer);


function animateTitle() {
    if ( arrayIndex == titles.length - 1) {
        if ( stringPrintedArray.length == titles[arrayIndex].length + 1 ) {
            popCharacter();
            stringPrinted = stringPrintedArray.join('');
            workTitle.textContent = stringPrinted;
            clearInterval(interval);
            
            function popCharacter() {
                stringPrintedArray.pop();
                stringPrinted = stringPrintedArray.join('');
                workTitle.textContent = stringPrinted;
                setTimeout(pushCharacter, 1000);
            }

            function pushCharacter() {
                stringPrintedArray.push('|')
                stringPrinted = stringPrintedArray.join('');
                workTitle.textContent = stringPrinted;
            }

            let interval2 = setInterval(popCharacter, 2000);

            setTimeout(() => {
                clearInterval(interval2)

                setTimeout(() => {
                    stringPrintedArray.pop();
                    stringPrinted = stringPrintedArray.join('');
                    workTitle.textContent = stringPrinted;
                }, 1000)
            }, 4000)
            return;
        }
    }

    if (isFuncAddingChars) {
        if ( charAtIndex != titles[arrayIndex].length) {
            stringPrintedArray.pop();
            stringPrintedArray.push(titles[arrayIndex].charAt(charAtIndex));
            stringPrintedArray.push('|');
            stringPrinted = stringPrintedArray.join('');
            workTitle.textContent = stringPrinted;
            charAtIndex++;
        } else {
            clearInterval(interval);
            isFuncAddingChars = false;
            setTimeout(() => {
                interval = setInterval(animateTitle, timer);
            }, 250)
        }
    } else {
        if ( charAtIndex == 2 ) {
            arrayIndex++;
            isFuncAddingChars = true;
            return;
        }

        stringPrintedArray.pop();
        stringPrintedArray.pop();
        stringPrintedArray.push('|');
        stringPrinted = stringPrintedArray.join('');
        workTitle.textContent = stringPrinted;
        charAtIndex = charAtIndex - 1;
    }
}