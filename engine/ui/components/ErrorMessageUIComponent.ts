import TextUIComponent from './TextUIComponent';

/**
 * An ErrorMessageUIComponent is a TextUIComponent where
 * error messages are put.
 */
export default class ErrorMessageUIComponent implements TextUIComponent {

    private static readonly CLASS_NAME = 'ui-error-message';

    public readonly html:string;

    constructor() {
        this.html =  `<p class="ui-component ${ErrorMessageUIComponent.CLASS_NAME}" style="display:none;"></p>`;
    }

}