// Thanks to CSS tricks for this Safari Mobile hack
// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/

const vh = window.parent.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

const buttonStyles = `
font-family: Avenir, Helvetica, Arial, sans-serif;
font-weight: 600;
color: #2d3748;
border-radius: 5px;
min-width: 220px;
min-height: 65px;
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
cursor: pointer;
`;

const iframeStyles = `
 position: absolute;
 top: 0;
 left: 0;
 width: 100vw;
 height: 100vh;
 border: none;
`;

export { buttonStyles, iframeStyles };
