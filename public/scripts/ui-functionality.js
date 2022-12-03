import { renderScreen, currentScreen } from './draw-screen.js';

window.nextScreen = function() {
    if (currentScreen.next) {
        renderScreen(currentScreen.next);
    }
    else console.log('No next screen to render');
}

$(document).on('DOMContentLoaded', function() {
    // standalone toggle button
    $(document).on('click', '.ui-toggle-button-input', function() {
        this.classList.toggle('ui-prop-selected');
    });

    // multi-select toggle button
    $(document).on('click', '.ui-multi-select-button', function() {
        const jqThis = $(this);

        if (jqThis.hasClass('ui-prop-selected')) {
            jqThis.removeClass('ui-prop-selected'); // always allow deselect
            jqThis.siblings().removeAttr('disabled');
        }
        else { // only allow selection when not at max
            const numSelected = jqThis.siblings().filter('.ui-prop-selected').length;
            const maxSelected = jqThis.parent().attr('max');
            if (numSelected < maxSelected) {
                jqThis.addClass('ui-prop-selected');
                if (numSelected+1 == maxSelected) jqThis.siblings().filter(':not(.ui-prop-selected)').attr('disabled',true);
            }
        }
    });

});