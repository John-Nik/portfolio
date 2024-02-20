const container=document.querySelector("#game");let difficulty,squares,rows,autoplayIntervalToDigSquare,boardWidth=container.offsetWidth,boardHeight=container.offsetHeight,screenWidth=window.innerWidth,squareSize=32,columnsToFit=Math.floor(boardWidth/squareSize),rowsToFit=Math.floor(boardHeight/squareSize),matrix=[],bombsPlaced=0,squaresInBoard=0,squaresInterractedWith=0,squaresInViewport=0,autoplayRunning=!0,userDugBombPosition="",isBombsPlacedTextVisibleToUser=!1;const tellUserBombsPlacedContainer=document.querySelector(".bombs-placed-container"),tellUserBombsPlacedWrapper=document.querySelector(".bombs-placed-container .wrapper"),tellUserBombsPlaced=document.querySelector(".bombs-placed-text");let instructions=document.querySelector(".game-instructions-span"),windowWidth=window.innerWidth,flagSvg='<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect x="0.666504" width="17" height="18" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_14_9231" transform="matrix(0.00827206 0 0 0.0078125 -0.0294118 0)"/></pattern><image id="image0_14_9231" width="128" height="128" xlink:href="data:image/png;base64,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"/></defs></svg>',mobileUserWantsToFlag=0;const triggerTapFlagIcon=document.querySelector(".flag-icon-wrap"),gameSettings=document.querySelector(".gameSettings");function chooseDifficulty(){let e=document.querySelector(".difficulty-feedback.active").dataset.difficulty;difficulty=[.12,.15,.2,.25][e]}function populateBoard(){matrix=[],container.innerHTML="",squaresInBoard=0,squaresInterractedWith=0,bombsPlaced=0,autoplayRunning?difficulty=.2:chooseDifficulty(),container.style.gridTemplateRows=`repeat(${rowsToFit}, minmax(24px, 1fr))`;for(let e=0;e<rowsToFit;e++)matrix.push([]),container.insertAdjacentHTML("beforeEnd",'<div class="row"></div>');rows=document.querySelectorAll(".row"),rows.forEach(((e,t)=>{for(let s=0;s<columnsToFit;s++)generateSquare(e,t,s);e.style.gridTemplateColumns=`repeat(${columnsToFit}, minmax(24px, 1fr))`})),squares=document.querySelectorAll(".square")}function generateSquare(e,t,s){let r=!1;Math.random()<difficulty&&(bombsPlaced++,r=!0),matrix[t].push({isRevealed:!1,hasBomb:r,isFlagged:!1,position:`${t}_${s}`,isWithinViewport:!0}),squaresInBoard++,squaresInViewport++,e.insertAdjacentHTML("beforeEnd",`<div class="square" data-position="${t}_${s}"></div>`)}function autoplayGame(){let e=matrix.reduce(((e,t)=>e.concat(t)));function t(){let t=e.filter((e=>{if(!e.isRevealed&&!e.isFlagged)return e}));!function(){if(0==t.length)clearInterval(autoplayIntervalToDigSquare),populateBoard(),autoplayGame();else{let e=Math.floor(Math.random()*t.length),s=t[e].position,r=s.split("_")[0],o=s.split("_")[1];if(t[e].hasBomb){return matrix[r][o].isFlagged=!0,void(document.querySelector(`[data-position="${r}_${o}"]`).innerHTML=flagSvg)}digSquare(r,o)}}()}autoplayRunning=!0,t(),autoplayIntervalToDigSquare=setInterval(t,1500)}function watchIfUserStartedGame(){const e=document.querySelector(".user-initiated-game-start");new MutationObserver((()=>{0!=e.childElementCount?(clearInterval(autoplayIntervalToDigSquare),autoplayRunning=!1,startGame()):e.innerHTML=""})).observe(e,{childList:!0})}function startGame(){populateBoard(),isBombsPlacedTextVisibleToUser?(informUserBombsPlacedText.centerPosition(),informUserBombsPlacedText.fullOpacity(),informUserBombsPlacedText.resetFontSize(),setTimeout((()=>{informUserBombsPlacedText.moveDownRightCorner(),informUserBombsPlacedText.reduceOpacity(),informUserBombsPlacedText.decreaseFontSize()}),2500),setTimeout((()=>{tellUserBombsPlaced.textContent="//",setTimeout((()=>{tellUserBombsPlaced.textContent=`// ${bombsPlaced}`}),750)}),2e3)):(informUserBombsPlacedText.fadeIn(),setTimeout((()=>{informUserBombsPlacedText.moveDownRightCorner(),informUserBombsPlacedText.reduceOpacity(),informUserBombsPlacedText.decreaseFontSize()}),2e3),tellUserBombsPlaced.textContent=`// ${bombsPlaced}`),setTimeout((()=>{squares.forEach((e=>{e.addEventListener("click",(e=>{userLeftClick(e)})),e.addEventListener("contextmenu",(e=>{userRightClick(e)}))}))}),1500)}function userLeftClick(e){if(mobileUserWantsToFlag)userRightClick(e);else if(!e.currentTarget.classList.contains("revealed")){digSquare(e.currentTarget.dataset.position.split("_")[0],e.currentTarget.dataset.position.split("_")[1]),isGameFinished()}}function digSquare(e,t){let s=document.querySelector(`[data-position="${e}_${t}"]`);0==matrix[e][t].isFlagged?(matrix[e][t].isRevealed=!0,squaresInterractedWith++,matrix[e][t].hasBomb?(s.innerHTML='<img src="/icons/bomb.svg"></img>',s.classList.add("revealed"),userDugBombPosition=`${e}_${t}`,lostGame()):0==countBombs(e,t)?emptySquare(e,t):(s.innerHTML=countBombs(e,t),s.classList.add(`B${countBombs(e,t)}`)),s.classList.add("revealed")):(squaresInterractedWith-=1,bombsPlaced++,tellUserBombsPlaced.textContent=`// ${bombsPlaced}`,matrix[e][t].isFlagged=!1,s.innerHTML="")}function userRightClick(e){e.preventDefault();let t=e.currentTarget.dataset.position.split("_")[0],s=e.currentTarget.dataset.position.split("_")[1];0==e.currentTarget.classList.contains("revealed")&&(0==matrix[t][s].isFlagged?(matrix[t][s].isFlagged=!0,squaresInterractedWith++,bombsPlaced-=1,e.currentTarget.innerHTML=flagSvg,tellUserBombsPlaced.textContent=`// ${bombsPlaced}`):(matrix[t][s].isFlagged=!1,squaresInterractedWith-=1,bombsPlaced++,e.currentTarget.innerHTML="",tellUserBombsPlaced.textContent=`// ${bombsPlaced}`)),isGameFinished()}triggerTapFlagIcon.addEventListener("click",(()=>{mobileUserWantsToFlag=(mobileUserWantsToFlag+1)%2})),chooseDifficulty(),container.addEventListener("contextmenu",(e=>{e.preventDefault()})),instructions.innerHTML=boardWidth<1024?"// Click bottom right flag to switch to flagging or digging squares":"// Left click to dig square <br> // Right click to flag square",populateBoard(),watchIfUserStartedGame(),autoplayGame();class informUserBombsPlacedText{static reset(){tellUserBombsPlacedContainer.style.display="none",tellUserBombsPlacedWrapper.style.left="0px",tellUserBombsPlacedWrapper.style.top="0px",tellUserBombsPlacedWrapper.style.fontSize="3rem",tellUserBombsPlacedContainer.style.opacity="0",isBombsPlacedTextVisibleToUser=!1}static fadeOut(){tellUserBombsPlacedContainer.style.opacity="0",isBombsPlacedTextVisibleToUser=!1}static moveDownRightCorner(){tellUserBombsPlacedWrapper.style.left="calc(50% - 122px + 48px)",tellUserBombsPlacedWrapper.style.top="calc(50% - 40px + 68px)"}static decreaseFontSize(){tellUserBombsPlacedWrapper.style.fontSize="1rem"}static resetFontSize(){tellUserBombsPlacedWrapper.style.fontSize="3rem"}static reduceOpacity(){tellUserBombsPlacedContainer.style.opacity="0.7"}static fullOpacity(){tellUserBombsPlacedContainer.style.opacity="1"}static centerPosition(){tellUserBombsPlacedWrapper.style.left="0px",tellUserBombsPlacedWrapper.style.top="0px"}static fadeIn(){tellUserBombsPlacedContainer.style.display="flex",setTimeout((()=>{tellUserBombsPlacedContainer.style.opacity="1"}),100),isBombsPlacedTextVisibleToUser=!0}}function removeUserSquareInterractivity(){squares.forEach((e=>{e.replaceWith(e.cloneNode(!0))}))}function lostGame(){const e=document.querySelector(".end-game-status"),t=document.querySelector(".start-game-button");let s=Math.ceil(2*Math.random()),r=Math.ceil(2*Math.random());const o=document.querySelector(".textContent"),i=document.querySelector(".gameSettings");let a=0,n=!1;const l=document.querySelector(".dead-smiley-wrapper"),c=document.querySelector(".footer-links-container"),d=document.querySelector(".socials-icon-wrap"),u=document.querySelector(".flag-icon-wrap");if(c.classList.toggle("hide-icons"),d.classList.toggle("show"),u.classList.toggle("show"),l.style.display="flex",autoplayRunning=!0,autoplayGame(),removeUserSquareInterractivity(),screenWidth>860?setTimeout((()=>{autoplayRunning&&(informUserBombsPlacedText.fadeOut(),setTimeout((()=>{informUserBombsPlacedText.reset()}),1500))}),4500):informUserBombsPlacedText.reset(),screenWidth<860){document.querySelector(".show-settings-panel-button").innerHTML="You-lost<br>Play-again?",o.style.display="flex",setTimeout((()=>{o.style.opacity="1"}))}else e.innerHTML="You've lost the game",t.innerHTML="Play-again",o.style.display="flex",i.style.display="flex",setTimeout((()=>{o.style.opacity="1",i.style.opacity="1"}),50);setTimeout((()=>{if(autoplayRunning){let e=userDugBombPosition.split("_")[0],t=userDugBombPosition.split("_")[1],s=document.querySelector(`[data-position="${e}_${t}"]`);matrix[e][t].isRevealed=!1,matrix[e][t].isFlagged=!0,s.innerHTML=flagSvg,s.classList.remove("revealed"),squaresInterractedWith++}}),5e3),container.style.scale="1.01",container.style.left=`${s}px`,container.style.top=`${r}px`;let m=setInterval((()=>{9==a&&clearInterval(m),n?(n=!1,container.style.left=`-${s}px`,container.style.top=`-${r}px`):(n=!0,container.style.left=`${s}px`,container.style.top=`${r}px`),a++}),30)}function countBombs(e,t){let s=0;return checkSurroundingSquares(e,t).forEach((e=>{e.hasBomb&&s++})),s}function checkSurroundingSquares(e,t){let s=[];for(let r=-1;r<2;r++)if(null!=matrix[Number(e)+Number(r)])for(let o=-1;o<2;o++)null!=matrix[Number(e)+Number(r)][Number(t)+Number(o)]&&(Number(e)+Number(r)==e&&Number(t)+Number(o)==t||s.push(matrix[Number(e)+Number(r)][Number(t)+Number(o)]));return s}function emptySquare(e,t){checkSurroundingSquares(e,t).forEach((e=>{let t=e.position.split("_")[0],s=e.position.split("_")[1];if(0==matrix[t][s].isRevealed&&0==matrix[t][s].isFlagged){let e=document.querySelector(`[data-position="${t}_${s}"]`),r=countBombs(t,s);squaresInterractedWith++,matrix[t][s].isRevealed=!0,e.classList.add("revealed"),e.classList.add(`B${r}`),0!=r?e.innerHTML=r:emptySquare(t,s)}}))}function isGameFinished(){squaresInViewport===squaresInterractedWith&&(autoplayRunning?populateBoard():winGame())}function winGame(){const e=document.querySelector(".end-game-status"),t=document.querySelector(".start-game-button"),s=document.querySelector(".textContent"),r=document.querySelector(".gameSettings"),o=document.querySelector(".footer-links-container"),i=document.querySelector(".socials-icon-wrap"),a=document.querySelector(".flag-icon-wrap");if(o.classList.toggle("hide-icons"),i.classList.toggle("show"),a.classList.toggle("show"),setTimeout((()=>{populateBoard(),autoplayGame(),autoplayRunning=!0}),3e4),screenWidth>860?setTimeout((()=>{autoplayRunning&&(informUserBombsPlacedText.fadeOut(),setTimeout((()=>{informUserBombsPlacedText.reset()}),1500))}),4500):informUserBombsPlacedText.reset(),removeUserSquareInterractivity(),screenWidth<720){document.querySelector(".show-settings-panel-button").innerHTML="You-won<br>Play-again?",s.style.display="flex",setTimeout((()=>{s.style.opacity="1"}),50)}else e.innerHTML="You've won!",t.innerHTML="Play-again",s.style.display="flex",r.style.display="flex",setTimeout((()=>{s.style.opacity="1",r.style.opacity="1"}),50)}let isDesktopRes,panelShownPriorWindowResize;function updateOldSiblingSquaresNearNewlyAddedSquares(e){let t=e.dataset.position.split("_")[0],s=e.dataset.position.split("_")[1],r="B"+e.textContent,o=countBombs(t,s);e.innerHTML=o,e.classList.replace(r,`B${o}`)}window.addEventListener("resize",(()=>{let e=container.offsetWidth,t=container.offsetHeight,s=Math.floor(e/squareSize),r=Math.floor(t/squareSize),o=s-columnsToFit,i=r-rowsToFit;const a=document.querySelector(".textContent");if(screenWidth=window.innerWidth,screenWidth<1024){document.querySelector(".end-game-status").innerHTML="",instructions.innerHTML="// Click bottom right flag to switch to flagging or digging squares",null==isDesktopRes&&(isDesktopRes=!1),isDesktopRes&&("textContent"==panelShownPriorWindowResize&&null!=panelShownPriorWindowResize&&(gameSettings.style.opacity="0",gameSettings.style.display="none",a.style.opacity="1",a.style.display="flex"),"gameSettings"==panelShownPriorWindowResize&&null!=panelShownPriorWindowResize&&(gameSettings.style.opacity="1",gameSettings.style.display="flex",a.style.opacity="0",a.style.display="none"),isDesktopRes=!1)}else instructions.innerHTML="// Left click to dig square <br> // Right click to flag square",null==isDesktopRes&&(isDesktopRes=!0),""==a.style.display&&(a.style.display="flex"),0==isDesktopRes&&(panelShownPriorWindowResize="flex"==a.style.display?"textContent":"gameSettings",a.style.opacity="1",a.style.display="flex",gameSettings.style.opacity="1",gameSettings.style.display="flex",isDesktopRes=!0);if(s>columnsToFit){let t=[];rows.forEach((e=>{e.lastChild.classList.contains("revealed")&&""!=e.lastChild.textContent&&t.push(e.lastChild)}));for(let e=0;e<o;e++)rows.forEach(((e,t)=>{generateSquare(e,t,matrix[t].length),e.lastChild.addEventListener("click",(e=>{userLeftClick(e)})),e.lastChild.addEventListener("contextmenu",(e=>{userRightClick(e)})),e.style.gridTemplateColumns=`repeat(${s}, minmax(24px, 1fr))`}));t.forEach((e=>{updateOldSiblingSquaresNearNewlyAddedSquares(e)})),columnsToFit=s,boardWidth=e,squares=document.querySelectorAll(".square"),tellUserBombsPlaced.textContent=`// ${bombsPlaced}`}if(r>rowsToFit){for(let e=0;e<i;e++){let e=matrix.length-1;matrix.push([]),container.insertAdjacentHTML("beforeEnd",'<div class="row"></div>');for(let t=0;t<columnsToFit;t++)generateSquare(container.lastChild,e,t),container.lastChild.lastChild.addEventListener("click",(e=>{userLeftClick(e)})),container.lastChild.lastChild.addEventListener("contextmenu",(e=>{userRightClick(e)}));container.lastChild.style.gridTemplateColumns=`repeat(${columnsToFit}, minmax(24px, 1fr))`}container.lastChild.previousSibling.childNodes.forEach((e=>{e.classList.contains("revealed")&&""!=e.textContent&&updateOldSiblingSquaresNearNewlyAddedSquares(e)})),container.style.gridTemplateRows=`repeat(${r}, minmax(24px, 1fr))`,rowsToFit=r,boardHeight=t,rows=document.querySelectorAll(".row"),tellUserBombsPlaced.textContent=`// ${bombsPlaced}`}}));