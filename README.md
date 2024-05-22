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

<br>

**0.5.2:**
- Made the game create new squares if the user resizes the window
- Added a more intelligent way to determine if a game is finished, without the user cheating by resizing the window into a smaller resolution
- Rename the files to the correct game, from "Tetris" to "Minesweeper"
- Optimized the game to not request the server the "flag.svg" file whenever there is a flag placed on the board

<br>

**0.5.3:**
- Half completed the mobile and tablet version of the page
- Optimized the code for more readability and speed
- Changed the UI of the information panel to make it more readable


**0.5.4:** Greatly made progress towards the mobile version of the home page

**0.5.5:** Finished the main page

**0.5.6:** Made the gap between the squares bigger for the phone version, as they were stuck together

**0.5.7:** Fixed the problem where on mobile browsers the footer would not be within the viewer's viewport due to the browser's ui hiding it

**0.5.8:** Testing the "minimal-ui" meta tag to remove safari's UI when on mobile version, making it a better user experience

**0.5.9:** Changed the styling for the mobile version and made everything mode compact

**0.5.10:** Made the opened navigation bar on mobile version have a background filter in Safari

**0.5.11:** Removed the -webkit-backdrop-filter

**0.5.12:** Increased the square size of mobile devices to make it easier for the user to play the game without any frustration and mistaps

<br>

**0.5.13:**
- Fixed an issue where the board height's was going out of the intended bounds.
- Fixed the footer's call and email buttons not working on mobile
- Fixed the footer's styling cropping over the board
- Debloated the css for the minesweeper game
- Slight optimization on the minesweeper.js for more readability and minimal perfomance gains

<br>

**0.5.14:**
- Moved the resizing board's height logic from minesweeper.js to set-board-height.js
- Fixed the issue with the Giannis clipping into the board
- Fixed the issue where the flag/shovel icons and the socials icons were being hidden
- Removed the \<head\> tag from the layout.js

<br>

**0.5.15:**
- Finished the entire UI of the home page
- Made the shovel/flag icon at the bottom middle of the footer make itself visible only if the device is touch-enabled, this way even laptops with touch enabled screens will be able to play the game with tapping
- Fixed a bug with the win game condition. Before, when all the blocks were interracted with, the game didn't finish

<br>

**0.5.16:**
- Minor change in the mobile navigation bar
- minified the js scripts, and added a "debug" folder which contains their unminified versions
- Added a fancy typing effect to the my title on page load

<br>

**0.5.17:** Fixed a bug where laptops with touchscreens weren't being detected as touch screen enabled devices

**0.6.0:**
- Added the about me page
- Added multiple footers and navigation bars, one to be used on the homepage and one to be used on every other page
- Split the icons of of the footer into their own components for future re-usage
- Moved the color-scheme profiles from "global.scss" into its own "color-scheme.scss"

<br>

**0.6.1:**
- Removed the unnecessary javascript that sets the board height and instead used css for it
- Fixed a bug with the footer-homepage where it doesn't overflows the viewport of mobile devices causing the icons of it to not be visible

<br>

**0.6.2:** Changed the unit of the minesweeper-container inside of "minesweeper.scss" from vh to vb

**0.6.3:** Undid the changes due to vh/vb not accounting for the mobile browser's UI into its calculation

**0.6.4:** Adjusted the height styling properties of the < main > element as that seems to be the culprit for the bug where the footer overflows both from tablet devices and mobile phones

**0.6.5:** Added more sections in the about me page, and also removed some leftover console.logs from the Header components

**0.6.6:** Added partytown

**0.6.7:** 
- Added a new color-scheme profile
- Added a new unfinished section to the about me page
- Made the Minesweeper section's text on the About me page hyphenate
- Added a library that forces hyphenation if the user's browser agent doesn't support it
- Made the title of the page from a max of 96px to 64px
- Made the speed of the autoplay on the about me page from 1.5 seconds intervals to 1.1 seconds

<br>

**0.6.8:** Added an unfinished skills section on the about me page

**0.6.9:** Changed the filetype of all components and pages from .js to .jsx to start getting into a better habit, and added 4/8 3D icons on the about me skills section. Only works for desktops for now

**0.6.10:** Made progress in making the icons on the skills section mobile compatible

**0.6.11:** Trying adding -webkit-transition in the animation of the icons from the skills section placed in the about me page to fix a delay with the animation for the sides of the icons in safari<br><br>

**0.6.12:** Trying more webkit changes to optimize the animation effect for Safari
- - 0.6.12.1: Moved the "scale" property from its own standalone css property to a "transform" and "-webkit-transform" one
  - 0.6.12.2: Added a 0s transition-delay to all the animations
  - 0.6.12.3: Did some changes to see the end result in webkit browsers and debug from there
  - 0.6.12.4: Added a small delay in the picture to test a theory
  - 0.6.12.5: Added -webkit-clip-path
  - 0.6.12.6: Changed the transition time from 0.2s to 1s for the img to test a theory
  - 0.6.12.7: Changed the transition time back to 0.2s and also changed the format from "all ease-in-out 0.2s" to "all 0.2s ease-in-out"
  - 0.6.12.8: Added the translate3d(100) property to force gpu processing of the transition animations
  - 0.6.12.9: Reverted the translate3d since it broke the look of the icons on safari browsers by removing the tilt of the icons. Instead added the will-change property
  - 0.6.12.10: Added custom ident in the will-change property: transform, -webkit-transform, clip-path, -webkit-clip-path
  - 0.6.12.11: Added the width and height in the will-change property
  - 0.6.12.12: Added the translateZ(0) property
  - 0.6.12.13: Changed the width and height properties from percentages to px
  - 0.6.12.14: Changed the width of the top surface from 98px to 95px
  - 0.6.12.15: Changed the width and height of the image from 100% & 100% to 98px and 128px respectively
  - 0.6.12.16: Changed the position property of the img from relative to absolute
  - 0.6.12.17: Changed the animation time function from ease-in-out to ease-in
  - 0.6.12.18: Reverted the animation time function and changed all of the split translateX() and translateY() into a shortened translate(xd, yd). This had a minor effect of position, so it looks like there is some difference between the shortened and split translate transition properties
  - 0.6.12.19: Changed the width of the hovered :before pseudo from 100% to 95%
  - 0.6.12.20: Changed the width from 95% to 90% and the height from 70% to 65% for the hovered :after and :before pseudo elements respectively
  - 0.6.12.21: Switched the shortened translate to translate3d(tx, ty, tz)
  - 0.6.12.22: Changed the width and height of the hovered :after and :before pseudo elements to px values instead of %
  - 0.6.12.23: Changed the px values to the correct ones
  - 0.6.12.24: Added the -webkit-clip-path on :after
  - 0.6.12.25: Added a 33ms delay in the img
  - 0.6.12.26: Changed the delay from 33ms to 20ms
  - 0.6.12.27: Changed the delay from 20ms to 10ms
  - 0.6.12.28: Changed the delay from 10ms to 15ms
  - 0.6.12.29: Changed the delay from 15ms to a final 17ms. From this experience I deduce that the way Safari handles animations in one of two ways. One, it prioritizes the element highest on the z-index, and on the next rendered frame, starts to animate the elements on the lower z-index, or Two, it prioritizes the main element over the pseudo :after and :before element's animations
  - 0.6.12.30: Changed all the icons from 2D flat surfaces that fake a 3D space into proper 3D icons in 3-dimensional space
  - 0.6.12.31: Added the -webkit prefix on the javascript icon to check how it compares with the scss icon in Safari
  - 0.6.12.32: Added a rotateX and rotateY in ".cub-1 .ft"  to test a theory
  - 0.6.12.33: Reverted the previous changes and removed the backface-visibility property
  - 0.6.12.34: Changed the orientation of the javascript icon so that instead of the JS facing the user when rotateZ(0), its instead facing the user when rotateX(180deg)
  - 0.6.12.35: Did the same thing with the scss icon
  - 0.6.12.36: Flipped the orientation of the circle so the backside is visible to the user, eliminating the Z axis from playing an effect
  - 0.6.12.37: Changed the orientation of the circle again
  - 0.6.12.38: Will stop writing changes due to the overwhelming amount of them for this 1 issue
  - 0.6.12.39: Finally found the issue. The issue is that Safari tries to optimize browser perfomance by not drawing flat planes/elements. During all the previous attempts at the icons being drawn in three dimensions, javascript and scss had their planes completely flat to the user when hovered. The issue of the previous versions can be seen on https://codepen.io/Giannis-Nikolaou/pen/RwOWLLP

**0.6.13:**
- Changed the html icon's positioning to absolute
- Made all of the icons render in bigger resolutions but scale down to make it easier to resize them later on when making the page responsive

**0.7.0:**
- Optimized the minesweeper scripts to prevent lag spikes when autoplay is turned on
- Added the portfolio page
- Added an npm package to load markdown files
- Added @babel/core and @babel/preset-react npm packages
- Added DecapCMS
- Added npm-run-all npm package

<br>

**0.7.1:** Fixed an issue that prevented the latest version from being build on netlify

<br>

**0.7.2:** 
- Added an absolute path importing the "color-scheme.scss" file in all the styling files, instead of the old relative path 
- Changed all the font size values from pixels to rem to improve accessibility
- Removed the red background the minesweeper game on the home page had
- Added the /portfolio redirect in the navigation bars
- Removed the unused useEffect and next/navigation imports from the navigation bars
- Added the ability to view the full pages of my projects from the portfolio page
- In the process of making the home page and aboutMe page have seemless page transitions instead of the current redirection. Will take time to implement and fix all the bugs that come along with this

<br>

**0.7.3:**
- Removed the "set-board-height.js", "bolts.js" and "front-end-title-animation.js" scripts and instead moved that logic to the "minesweeper/content.jsx" component, and use the "useEffect" hook for them
- Instead of setting "overflow: hidden" on the \<body\> tag, it was instead set on the "homepage-body" class of the \<main\> tag located in the home page. This makes it easy to work with the other pages without breaking them
- Moved the font variables on "/app/layout.jsx" from the \<html\> tag to the \<body\> tag. The reason was to stop the console warning from popping up
- Made the "home" page and "about me" not refresh, but instead offer a seamless transition between all of the pages
- Changed some small styling in the "about me" and "portfolio" page to make them more uniform
- Added some logic in the minesweeper-containing components to make them detect when they're not in the page, thus stopping their execution
- Made the "portfolio" and "contact" navigation links turn off both games
- Enabled react's strict mode in NextJS config settings

<br>

**0.7.4:**
- Minified "handle-about-me-minesweeper-section-text-screen-resize.js"
- Made the github and website link on the portfolio cards enlarge when hovered
- Made the project title invisible on the "FullPortfolioPage.jsx" when hovered
- Made the cards of the portfolio page have a "glowing spotlight" effects when hovered
- Made the full project pages responsive

<br.>

**0.7.5:**
- Made the footer on all the pages stay in a fixed position on the user's screen
- Changed some styling properties on the footer
- Changed some styling options on the "/ProjectCard" component

<br>

**0.7.6:** Fixed an issue with the footer being completely see-through and moved the logic of the footer changing colors from the "/about/sections/SkillsSection" to "/about/sections/IntroductorySection"

<br>

**0.8.0:** 
- Added the theme-color meta tag
- Removed the repositioning javascript of the footer, and instead used CSS to make the footer's position fixed  on the user's screen without being hidden from browser's UI
- Changed some styling properties for the footer
- Made the icons and text of the footer have an opacity from 0.6 to 0.8
- Made the minesweeper-container on the home page resize using the css unit "dvh", making it faster to load and have less layout shift compared to before
- Fixed the footer of the home page not hiding and not showing the icons when clicking on the socials icon on the down left corner
- Fixed an issue with the navigation bar shifting styling properties when switching between the home page and any other page
- Removed the setBoltsPosition function from "/minesweeper/content.jsx" and instead used CSS to adjust them
- Added a small function that makes the footer position style be relative if the user is using Safari
- Made the "Start-Game" button finally blink in the Safari browser
- Added a back arrow on each full page project, which helps the user navigate back to the other projects on the portfolio page
- Added the hovering spotlight effect that the project cards of the portfolio page have into their respective full pages aswell
- Added meta tags
- Added robots.txt
- Added sitemap.xml
- Made the desktop version of the contact page. Will proceed with making it function as visualized in the next update

**0.8.1:** Added and testing google tag
- - **0.8.1.1:** Small change to debug google tag
  - **0.8.1.2:** Removed preserveBehavior as that might be causing issues
  - **0.8.1.3:** The problem was preserveBehavior. Added preserveBehavior back with different syntax
  - **0.8.1.4:** Tweaked the time when the google tag loads to increase pagespeed score
  - **0.8.1.5:** Set the script loading strategy of the g-tag from "afterInteractive" to "lazyOnload" to track pagespeed stats
  - **0.8.1.6:** Completely removed partyscript and g-tag
  - **0.8.1.7:** Added g-tag with afterInteractive loading strategy
  - **0.8.1.8:** Changed g-tag to lazyOnload loading strategy
  - **0.8.1.9:** Instead of directly loading google tag using 'nextjs/script', I'm using '@next/third-parties/google'. There is an issue where half the times google tag wont track
  - **0.8.1.10:** Changed the position of \<GoogleTagManager> from the \<head> to \<body>

<br>

**0.9.0:** 
- Uninstalled Partytown
- Imported the NextJS Image component and used it for the images
- Made the entire website completely accessible via only keyboard usage
- Made the form in the contact page functional
- Made the contact page responsive

<br>

**0.9.1:** In the form, removed the "netlify="true"" for plain "netlify"

**0.9.2:** Formatted the form tag from \<form netlify> to \<form method="post" data-netlify="true">, and also changed the "for" the label tags had to "htmlFor"

**0.9.3:** Added a hidden input area to help fix the form not being detected in netlify

**0.9.4:** Debugging netlify forms
- - **0.9.4.1:** Moved the code-wrapper from the the page.jsx to its own component, so as to pre-render the page and detect the netlify form
  - **0.9.4.2:** Moved the hidden input to be the first child of the form
  - **0.9.4.3:** Changed the name of the input fields to match the form's name
  - **0.9.4.4:** Handle form submission with AJAX
  - **0.9.4.5:** Fixed a small issue
  - **0.9.4.6:** Added a title and canonical tag on the contact page. Will proceed with fixing the form on the next update
  - **0.9.4.5:** Tried to handle the form using a simple fetch api call
  - **0.9.4.6:** Changed the names of the inputs to have their own unique names
  - **0.9.4.7:** Added a hidden form in the page, as per netlify instructions
  - **0.9.4.8:** Added a "FormWrapper.html" file with the form in there, and also removed the manually added event listeners of the code wrapper and instead are using react features to detect input changes and display them on the code to the right

<br>

**0.10.0:**
- Adjusted the mobile layout of the contact page to not hide the submit button behind the footer
- Added a custom attribute to the footer component to enable me to change its class whenever it's needed
- Added a stylized scrollbar
- Half-done responsive about page

<br>

**0.11.0:**
- Made the 4 icons in the skills section better looking when resizing
- Made the about us minesweeper game drop down when squares are revealed
- Fixed the styling of the contact page

<br>

**0.11.1:** Added the git icon on the skills section

**0.12.0:** Finished the about me page. The minesweeper game drops down and doesn't clip through the text, and all the icons are finished, with the page being responsive to any screen size

**0.12.1:** Changed the vh the squares will drop down to, so it doesn't overflow the page

**0.13.0:**
- Added the favicon
- Made the about me page not overflow on bigger screen heights when the minesweeper blocks fall off screen bounds
- Changed the navigation bar's \<ul> to a more semantic \<menu>
- Changed the home page's footer \<ul> to a more semantic \<menu>
- Changed some minor transition timings of the homepage mobile footer
- Improved SEO for all sites
- Improved accessibility for all sites
- Changed the button of the form from \<button> to \<input>

<br>

**0.13.1:** Changed the button of the form into a fixed 100px width, and changed the form names to see which form netlify is detecting

**0.13.2:** Added netlify CLI to debug in a local environment server along side testing other things

**1.0.0:** 
- Added a formspree form, since it fixes all the issues netlify and nextjs 14.0 have. Each of them tries to handle the form in their own way causing them to conflict and not do anything in the end
- Updated the CV file
- Made the icons in the about me, skills section more accessible

<br>

**1.1.0:** Added feedback to the form to inform the user if the form was received or not

**1.1.1:** Fixed a small bug with the feedback of the form

**1.1.2:** Made the typing indicator blink out instead of staying frozen on the screen

**1.1.3:** Once successfully submitted a form, the user cannot submit another one until he refreshes the page

**1.1.4:** Adjusted the text position indicator's styling in the terminal of the contact page

**1.1.5:** 
- Minor adjustments on the minesweeper scripts for better readability and made the homepage have a small scroll after it loads for android devices (it seems they don't play nicely with dvh unless the page is scrolled, which it then snaps the minesweeper game into its proper position)
- Uploaded a profile picture of vioekseliksi
- Minor changes in some full site project sites
- Slight change in the pdf CV

<br>

**1.1.6:** 
- Added 'alt=""' in the bolts svg of the homepage to improve SEO slightly
- Added yandex site verification

<br>

**1.1.7:** Removed the metatag for yandex site verification

**1.1.8:** Fixed a small bug where the home page doesn't scroll when loading the minesweeper container on some samsung phones

**1.1.9:** Removed the picture placeholder from the about me page

**1.1.10:** Small styling changes on the footer of the homepage

**1.1.11:** Migrated the entire app to typescript and updated the CV

**1.1.12:** Fixed some small issues preventing build

**1.2.0:**
- Fixed a bug on the contact me page where the date wasn't updating correctly
- Added TypeScript and Tailwind to the about me page
- Changed the CV to include new skillset

**1.2.1:** Added "export const runtime = 'edge'" to support cloudflare edge in the attempt of testing and possible migrating to cloudflare

**1.2.2:** Moved the export from "[portfolioId]" to "FullPortfolioPage.tsx"

**1.2.3:** Added "runtime: 'experimental-edge'" in the nextjs config

**1.2.4:** moved the const runtime to the first "page.tsx" file

**1.2.5:** Moved the const runtime to "/portfolio/page.tsx" file

**1.2.6:** Added the const runtime to the top of the "page.tsx" files in routes "/portfolio" and "/portfolio/[portfolioId]"

**1.2.7:** Removed the const runtime and moved it to the layout of the other pages

**1.2.8:** Removed the google tag from nextjs and instead are using Cloudflare's Zaraz. Also migrated the CMS from Netlify ID to OAuth using Github (for cloudflare support)

**1.2.9:** Added hotjar as an inline script using lazyOnload to test the perfomance of the site with the script

**1.2.10:** Removed the blue highlighting appearing on android browsers when tapping on clickable elements

**1.2.11:** Fixing a bug with OAuth

**1.2.12:** Fixed a bug with the API routes

**1.2.13:** Correctly configured OAuth in the backend

**1.2.14:** Enabled hotjar again

**1.2.15:** Minor fix with OAuth to make it work with cloudflare

**1.2.16:** Added npm package "dotenv" and fixed the syntax problem when trying to read injected variables during build

**1.2.17:** Switched the runtime from edge to nodejs

**1.2.18:** Reverted the change and added error console logs

**1.2.19:** Changed the "base_url" from http to https

**1.2.20:** Changed the theme of the CMS to dark theme for my own taste, among some other small styling changes

**1.2.21:**
- Added a 404 page
- Centered the image in the admin page
- Set up middleware to make all links case insensitive

**1.2.22:** Updated the link of the download cv button

**1.2.23:** Updated the pdf

**1.2.24:** Fixed issue with middleware

**1.2.25:** Fixed an issue with the icon in the 404 page not showing up

**1.2.26:** Added page title for the not found page

**1.2.27:** Started to run everything on bun for faster build times

**1.2.28:** Disabled hotjar in the html for testing purposes to see if pagespeed scores will improve. Will instead move them to Zaraz and run tests

**1.2.29:** Re-enabled hotjar in the html

**1.2.30:** Decided to disable hotjar in the html and instead run it using cloudflare's zaraz

**1.2.31:** Fixed a small bug with the game on the home page where the UI broke if it was between 860px and 1023px

**1.2.32:** Updated CV, among other small changes

**1.2.33:** 
- Updated the portfolio page to include new ongoing project
- Adjusted the CMS to allow for custom links to be typed
- Adjusted the size of the project's listed on the portfolio page

**1.3.0:** 
- Added smooth animations on some elements of the pages
- Fixed an issue on the portfolio page
- Split the home page minesweeper container into multiple child elements to simplify the logic
- Used the useRef hook whenever possible
- Made the active difficulty have a bolder font to stand out more
- Testing out the cloudflare edge worker to serve my component files aswell

**1.3.1:** Ran bun install to fix a bug with the cloudflare building process

**1.3.2:** Removed the edge runtime from the contact page and minesweeper content in home page, and added one in the page.tsx file and the about us page aswell

**1.3.3:** Added the edge runtime back to the contact page

**1.3.4:** Removed all the newly added edge runtimes

**1.3.5:** Removed the unnecessary async export function in the /contact/page.tsx file

**1.3.6:** Fixed the minor bug preventing the /contact page from compiling

**1.3.7:** Updated the middleware to make the admin page url from '/admin/index.html' to just '/admin'

**1.3.8:** Added a new field in the CMS panel which enables or disables links of posts

**1.3.9:** 
- Made minor changes to the logic of the cards component
- Reformatted the code to make it more readable
- Changed the styling of the cards to support the new changes
- Made the title more readable when hovering the cards
- Prepared the project cards for the new "In Dev" option, where a card will be shown, but no click functions will be enabled. The card will showcase what I'm currently working on

**1.4.0:** Added a new project

**1.5.0:** Changed the minesweeper game in the about me page from plain HTML elements to a drawn canvas