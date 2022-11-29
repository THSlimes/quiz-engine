import ContainerType from "../../ContainerType";
import TextUIComponent from "../TextUIComponent";
import InputUIComponent from "./InputUIComponent";

export default class MultiSelectUIComponent implements TextUIComponent, InputUIComponent {

    private static readonly CLASS_NAME = 'ui-multi-select-input';
    private static readonly CHILD_CLASS_NAME = 'ui-multi-select-button';

    public readonly fieldName: string;

    public readonly html: string;

    constructor(fieldName:string, options:Array<string>, containerType:ContainerType=ContainerType.CENTERED_ROWS, minSelected=0, maxSelected=options.length) {
        this.fieldName = fieldName;

        let newHtml = `<div
                            class="ui-component ui-input ${containerType} ${MultiSelectUIComponent.CLASS_NAME}"
                            name="${fieldName}"
                            min=${minSelected}
                            max="${maxSelected}"
                        >`;

        for (let i = 0; i < options.length; i ++) { // add options
            newHtml += `<input class="ui-component ${MultiSelectUIComponent.CHILD_CLASS_NAME}" type="button" value="${options[i]}">`;
        }

        newHtml += '</div>';

        this.html = newHtml;
    }

}