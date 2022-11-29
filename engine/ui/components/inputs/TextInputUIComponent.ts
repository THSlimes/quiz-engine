import TextUIComponent from "../TextUIComponent";
import InputUIComponent from "./InputUIComponent";

export default class TextInputUIComponent implements TextUIComponent, InputUIComponent {

    private static readonly CLASS_NAME = 'ui-text-input';

    public readonly fieldName: string;

    public readonly html:string;

    constructor(fieldName:string, placeholder='', initialValue='') {
        this.fieldName = fieldName;

        this.html =  `<input
                        class="ui-component ui-input ${TextInputUIComponent.CLASS_NAME}"
                        type="text"
                        name="${fieldName}"
                        placeholder="${placeholder}"
                        value="${initialValue}"
                    >`;
    }
    
}