import TextUIComponent from "../TextUIComponent";
import InputUIComponent from "./InputUIComponent";

export default class NumberInputUIComponent implements TextUIComponent, InputUIComponent {

    private static readonly CLASS_NAME = 'ui-number-input';

    public readonly fieldName: string;

    public readonly html:string;

    constructor(fieldName:string, min=0, max?:number, step=1, initialValue=min) {
        this.fieldName = fieldName;

        if (max === undefined) {
            this.html = `<input
                            class="ui-component ui-input ${NumberInputUIComponent.CLASS_NAME}"
                            type="number"
                            name="${fieldName}"
                            min="${min}"
                            step="${step}"
                            value="${initialValue}"
                        >`;
        }
        else this.html = `<input
                            class="ui-component ui-input ${NumberInputUIComponent.CLASS_NAME}"
                            type="number"
                            name="${fieldName}"
                            min="${min}"
                            max="${max}"
                            step="${step}"
                            value="${initialValue}"
                        >`;

    }
    
}