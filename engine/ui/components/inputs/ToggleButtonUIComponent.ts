import TextUIComponent from "../TextUIComponent";
import InputUIComponent from "./InputUIComponent";

export default class ToggleButtonUIComponent implements TextUIComponent, InputUIComponent {

    private static readonly CLASS_NAME = 'ui-toggle-button-input';

    public readonly fieldName: string;

    public readonly html:string;

    constructor(fieldName:string, text:string, selected=false) {
        this.fieldName = fieldName;

        this.html =  `<input class="ui-component ${ToggleButtonUIComponent.CLASS_NAME} ${selected?'selected':''}" type="button" name="${fieldName}" value="${text}" onclick="toggleSelected(this);">`;
    }
    
}