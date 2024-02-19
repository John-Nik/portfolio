# Portfolio of Giannis Nikolaou

**0.1.0:** Installed Next.js, checked the files to get a better understanding + created a GitHub Repo

**0.2.0:** Started development, experimented with Next.js and React

**0.3.0:** Created the navigation bar for all pages

**0.3.1:** Changed the horizontal padding of the navigation bar's container from 32px to 24px

**0.3.2:** Changed the burger icon lines' thickness from 1px to 2px

**0.3.3:** Adjusted the height of the mobile navigation bar from 68px to 80px

**0.4.0:** Added the footer

**0.4.1:** Made the icons of the footer from 40px to 30px

**0.4.2:** In the footer, fixed the github icon's redirect from the mailto to the correct github link

**0.4.3:** Added the Minesweeper background game using react's capabilities. It's interactive, but not playable

**0.4.4:** Fixed up the Minesweeper game to show the bombs around each dug up block

**0.5.0:** Finished the Minesweeper game. Although fun to challenging and fun to develop in react, the framework's limitations make the game feel slow to respond, and make the codebase too difficult to nagivate and understand. The game is only playable in desktops for now

**0.5.1:** Fixed the bug where the splash text of how many bombs are placed suddenly appearing in the middle of the screen instead of fading in when attempting to replay after a win 

**0.5.2:** <ul>
    <li>Made the game create new squares if the user resizes the window</li>
    <li>Added a more intelligent way to determine if a game is finished, without the user cheating by resizing the window into a smaller resolution</li>
    <li>Rename the files to the correct game, from "Tetris" to "Minesweeper"</li>
    <li>Optimized the game to not request the server the "flag.svg" file whenever there is a flag placed on the board</li>
</ul><br>

**0.5.3:** <ul>
    <li>Half completed the mobile and tablet version of the page</li>
    <li>Optimized the code for more readability and speed</li>
    <li>Changed the UI of the information panel to make it more readable</li>
</ul>

**0.5.4:** Greatly made progress towards the mobile version of the home page

**0.5.5:** Finished the main page

**0.5.6:** Made the gap between the squares bigger for the phone version, as they were stuck together

**0.5.7:** Fixed the problem where on mobile browsers the footer would not be within the viewer's viewport due to the browser's ui hiding it

**0.5.8:** Testing the "minimal-ui" meta tag to remove safari's UI when on mobile version, making it a better user experience

**0.5.9:** Changed the styling for the mobile version and made everything mode compact

**0.5.10:** Made the opened navigation bar on mobile version have a background filter in Safari

**0.5.11:** Removed the -webkit-backdrop-filter

**0.5.12:** Increased the square size of mobile devices to make it easier for the user to play the game without any frustration and mistaps

**0.5.13:** <ul>
<li>Fixed an issue where the board height's was going out of the intended bounds.</li>
<li>Fixed the footer's call and email buttons not working on mobile</li>
<li>Fixed the footer's styling cropping over the board</li>
<li>Debloated the css for the minesweeper game</li>
<li>Slight optimization on the minesweeper.js for more readability and minimal perfomance gains</li>
</ul><br>

**0.5.14:** <ul>
<li>Moved the resizing board's height logic from minesweeper.js to set-board-height.js</li>
<li>Fixed the issue with the Giannis clipping into the board</li>
<li>Fixed the issue where the flag/shovel icons and the socials icons were being hidden</li>
<li>Removed the < head > tag from the layout.js</li>
</ul><br>

**0.5.15:** <ul>
<li>Finished the entire UI of the home page</li>
<li>Made the shovel/flag icon at the bottom middle of the footer make itself visible only if the device is touch-enabled, this way even laptops with touch enabled screens will be able to play the game with tapping</li>
<li>Fixed a bug with the win game condition. Before, when all the blocks were interracted with, the game didn't finish</li>
</ul><br>

**0.5.16:** <ul>
<li>Minor change in the mobile navigation bar</li>
<li>minified the js scripts, and added a "debug" folder which contains their unminified versions</li>
<li>Added a fancy typing effect to the my title on page load</li>
</ul>