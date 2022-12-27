import { Attributes } from "../../AttributeList";
import TextStyling from "../../TextStyling";
import InputUIComponent from "./InputUIComponent";

export default class ToggleButton extends InputUIComponent {

    constructor(fieldName:string, text:string, initial:boolean, styling?:TextStyling, classes?:Array<string>, attributes?:Attributes) {
        super(
            'button',
            'ui-toggle-button-input',
            fieldName,
            styling,
            (classes??[]).concat(initial?['ui-prop-selected']:[]),
            attributes
        );
    }

}