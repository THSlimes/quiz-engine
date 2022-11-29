import './lib/jquery.js';

const answerGetters = { // functions that define how to get the answer of a certain input class
    'ui-text-input': elem => elem.val(),
    'ui-number-input': elem => Number.parseFloat(elem.val()),
    'ui-toggle-button-input': elem => elem.hasClass('ui-prop-selected'),
    'ui-select-input': elem => elem.val(),
    'ui-multi-select-input': elem => {
        const out = [];
        elem.children().filter('.ui-prop-selected').each(function() {
            out.push($(this).val());
        });
        return out.length >= elem.attr('min') ? out : [];
    }
};

/**
 * The currently given answers
 */
export var answer = {};

/**
 * Determines whether all given questions are answered.
 * @returns true if all inputs filled
 */
export function allAnswered() {
    let out = true;

    const keys = Object.keys(answer);
    for (let i = 0; i < keys.length && out; i ++) {
        const val = answer[keys[i]];
        out &&= val === true ||
                val === false ||
                (typeof val === 'string' && val.trim().length > 0) ||
                typeof val === 'number' ||
                (Array.isArray(val) && val.length !== 0)
    }

    return out;
}
window.test = () => {console.log(answer)}; // REMOVE LATER

/**
 * Put the answer of an input in the 'answer' object.
 * @param {HTMLElement} elem 
 */
function putAnswer(elem) {
    const jqElem = $(elem);
    const name = jqElem.attr('name');

    for (const className in answerGetters) {
        if (jqElem.hasClass(className)) {
            answer[name] = answerGetters[className](jqElem);
        }
    }

    // enabling next screen buttons
    if (allAnswered()) $('.ui-next-screen-button').removeAttr('disabled');
    else $('.ui-next-screen-button').attr('disabled',true);
}

// Actually getting answers
$(document).on('DOMContentLoaded',function() {
    // getting initial input values
    $(document).on('DOMNodeInserted', '.ui-input', function() {
        putAnswer(this);
    });

    // getting input values when they're changes
    $(document).on('change click keydown', '.ui-input', function() {
        putAnswer(this);
    });
});
