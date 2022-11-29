import TextUIComponent from './TextUIComponent';
import UIComponent from './UIComponent';

export default class ParagraphUIComponent implements TextUIComponent {

    private static readonly CLASS_NAME = 'ui-paragraph';

    public readonly html:string;

    constructor(text:string) {
        this.html =  `<p class=${ParagraphUIComponent.CLASS_NAME}>${text}</p>`;
    }

}