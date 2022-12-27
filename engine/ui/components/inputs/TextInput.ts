import { Attributes } from "../../AttributeList";
import TextStyling from "../../TextStyling";
import InputUIComponent from "./InputUIComponent";

export default class TextInput extends InputUIComponent {

    constructor(fieldName:string, placeholder='', initial='', styling?:TextStyling, classes?:Array<string>, attributes?:Attributes) {
        super(
            'text',
            'ui-text-input',
            fieldName,
            styling,
            classes,
            {
                ...(attributes??{}),
                placeholder: placeholder,
                value: initial
            }
        );
    }

}