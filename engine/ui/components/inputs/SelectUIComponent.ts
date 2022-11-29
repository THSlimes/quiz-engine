import TextUIComponent from "../TextUIComponent";
import InputUIComponent from "./InputUIComponent";

export default class SelectUIComponent implements TextUIComponent, InputUIComponent {

    private static readonly CLASS_NAME = 'ui-select-input';

    public readonly fieldName: string;

    public readonly html: string;

    constructor(fieldName:string, options:Array<String>, defaultOption?:string) {
        
        this.fieldName = fieldName;

        let newHtml = `<select class="ui-component ui-input ${SelectUIComponent.CLASS_NAME}" name="${fieldName}">`;
        for (let i = 0; i < options.length; i ++) {
            newHtml += `<option ${options[i]===defaultOption?'selected':''}>${options[i]}</options>`
        }
        newHtml += '</select>';

        this.html = newHtml;

    }

}