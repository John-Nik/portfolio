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
</ul><br>

**0.5.4:** Greatly made progress towards the mobile version of the home page

**0.5.5:** Finished the main page

**0.5.6:** Made the gap between the squares bigger for the phone version, as they were stuck together

**0.5.7:** Fixed the problem where on mobile browsers the footer would not be within the viewer's viewport due to the browser's ui hiding it

**0.5.8:** Testing the "minimal-ui" meta tag to remove safari's UI when on mobile version, making it a better user experience

**0.5.9:** Changed the styling for the mobile version and made everything mode compact

**0.5.10:** Made the opened navigation bar on mobile version have a background filter in Safari

**0.5.11:** Removed the -webkit-backdrop-filter

**0.5.12:** Increased the square size of mobile devices to make it easier for the user to play the game without any frustration and mistaps
<br><br>
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
</ul><br>

**0.5.17:** Fixed a bug where laptops with touchscreens weren't being detected as touch screen enabled devices<br><br>

**0.6.0:** <ul>
    <li>Added the about me page</li>
    <li>Added multiple footers and navigation bars, one to be used on the homepage and one to be used on every other page</li>
    <li>Split the icons of of the footer into their own components for future re-usage</li>
    <li>Moved the color-scheme profiles from "global.scss" into its own "color-scheme.scss"</li>
</ul><br>

**0.6.1:** <ul>
    <li>Removed the unnecessary javascript that sets the board height and instead used css for it</li>
    <li>Fixed a bug with the footer-homepage where it doesn't overflows the viewport of mobile devices causing the icons of it to not be visible</li>
</ul><br>

**0.6.2:** Changed the unit of the minesweeper-container inside of "minesweeper.scss" from vh to vb

**0.6.3:** Undid the changes due to vh/vb not accounting for the mobile browser's UI into its calculation

**0.6.4:** Adjusted the height styling properties of the < main > element as that seems to be the culprit for the bug where the footer overflows both from tablet devices and mobile phones

**0.6.5:** Added more sections in the about me page, and also removed some leftover console.logs from the Header components

**0.6.6:** Added partytown

**0.6.7:** <ul>
    <li>Added a new color-scheme profile</li>
    <li>Added a new unfinished section to the about me page</li>
    <li>Made the Minesweeper section's text on the About me page hyphenate</li>
    <li>Added a library that forces hyphenation if the user's browser agent doesn't support it</li>
    <li>Made the title of the page from a max of 96px to 64px</li>
    <li>Made the speed of the autoplay on the about me page from 1.5 seconds intervals to 1.1 seconds</li>
</ul><br>

**0.6.8:** Added an unfinished skills section on the about me page

**0.6.9:** Changed the filetype of all components and pages from .js to .jsx to start getting into a better habit, and added 4/8 3D icons on the about me skills section. Only works for desktops for now

**0.6.10:** Made progress in making the icons on the skills section mobile compatible

**0.6.11:** Trying adding -webkit-transition in the animation of the icons from the skills section placed in the about me page to fix a delay with the animation for the sides of the icons in safari<br><br>

**0.6.12:** Trying more webkit changes to optimize the animation effect for apple products<ul>
 <li>--0.6.12.1: Moved the "scale" property from its own standalone css property to a "transform" and "-webkit-transform" one</li>
<br>
 <li>--0.6.12.2: Added a 0s transition-delay to all the animations</li>
<br>
 <li>--0.6.12.3: Did some changes to see the end result in webkit browsers and debug from there</li>
<br>
 <li>--0.6.12.4: Added a small delay in the picture to test a theory</li>
<br>
 <li>--0.6.12.5: Added -webkit-clip-path</li>
<br>
 <li>--0.6.12.6: Changed the transition time from 0.2s to 1s for the img to test a theory</li>
<br>
 <li>--0.6.12.7: Changed the transition time back to 0.2s and also changed the format from "all ease-in-out 0.2s" to "all 0.2s ease-in-out"</li>
<br>
 <li>--0.6.12.8: Added the translate3d(100) property to force gpu processing of the transition animations</li>
<br>
 <li>--0.6.12.9: Reverted the translate3d since it broke the look of the icons on safari browsers by removing the tilt of the icons. Instead added the will-change property</li>
<br>
 <li>--0.6.12.10: Added custom ident in the will-change property: transform, -webkit-transform, clip-path, -webkit-clip-path</li>
<br>
 <li>--0.6.12.11: Added the width and height in the will-change property</li>
<br>
 <li>--0.6.12.12: Added the translateZ(0) property</li>
<br>
<li>--0.6.12.13: Changed the width and height properties from percentages to px</li>
<br>
 <li>--0.6.12.14: Changed the width of the top surface from 98px to 95px</li>
<br>
 <li>--0.6.12.15: Changed the width and height of the image from 100% & 100% to 98px and 128px respectively</li>
<br>
 <li>--0.6.12.16: Changed the position property of the img from relative to absolute</li>
<br>
 <li>--0.6.12.17: Changed the animation time function from ease-in-out to ease-in</li>
<br>
 <li>--0.6.12.18: Reverted the animation time function and changed all of the split translateX() and translateY() into a shortened translate(xd, yd). This had a minor effect of position, so it looks like there is some difference between the shortened and split translate transition properties</li>
<br>
 <li>--0.6.12.19: Changed the width of the hovered :before pseudo from 100% to 95%</li>
<br>
 <li>--0.6.12.20: Changed the width from 95% to 90% and the height from 70% to 65% for the hovered :after and :before pseudo elements respectively</li>
<br>
 <li>--0.6.12.21: Switched the shortened translate to translate3d(tx, ty, tz)</li>
<br>
 <li>--0.6.12.22: Changed the width and height of the hovered :after and :before pseudo elements to px values instead of %</li>
<br>
 <li>--0.6.12.23: Changed the px values to the correct ones</li>
<br>
 <li>--0.6.12.24: Added the -webkit-clip-path on :after</li>
<br>
 <li>--0.6.12.25: Added a 33ms delay in the img</li>
<br>
 <li>--0.6.12.26: Changed the delay from 33ms to 20ms</li>
<br>
 <li>--0.6.12.27: Changed the delay from 20ms to 10ms</li>
<br>
 <li>--0.6.12.28: Changed the delay from 10ms to 15ms</li>
<br>
 <li>--0.6.12.29: Changed the delay from 15ms to a final 17ms. From this experience I deduce that the way Safari handles animations in one of two ways. One, it prioritizes the element highest on the z-index, and on the next rendered frame, starts to animate the elements on the lower z-index, or Two, it prioritizes the main element over the pseudo :after and :before element's animations</li>
<br>
<li>0.6.12.30: Changed the icons from 2D flat surfaces that fake a 3D space into proper 3D icons in 3-dimensional space</li>
</ul>