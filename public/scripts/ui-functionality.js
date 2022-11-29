/**
 * Toggles whether the given element has the 'ui-prop-selected' class.
 * @param {HTMLElement} elem element to give/take class (from).
 */
window.toggleSelected = function(elem) {
    elem.classList.toggle('ui-prop-selected');
}