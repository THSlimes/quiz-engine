import { renderScreen, currentScreen } from './render-screen.js';

/**
 * Toggles whether the given element has the 'ui-prop-selected' class.
 * @param {HTMLElement} elem element to give/take class (from).
 */
window.toggleSelected = function(elem) {
    elem.classList.toggle('ui-prop-selected');
}

window.nextScreen = function() {
    if (currentScreen.next) {
        renderScreen(currentScreen.next);
    }
    else console.log('No next screen to render');
}