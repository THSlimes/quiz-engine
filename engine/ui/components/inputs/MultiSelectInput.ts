import { Attributes } from "../../AttributeList";
import { ContainerType } from "../../ContainerType";
import TextStyling from "../../TextStyling";
import TextUIComponent from "../TextUIComponent";

export default class MultiSelectInput extends TextUIComponent {

    constructor(fieldName:string, options:Array<string>, minSelected=0, maxSelected=options.length, containerType:ContainerType=ContainerType.CENTERED_ROWS, styling?:TextStyling, classes?:Array<string>, attributes?:Attributes) {
        super(
            'div',
            'ui-input ui-multi-select-input',
            options.map(opt => `<input class="ui-component ui-multi-select-button" type="button" value="${opt}" style="${styling?styling.toString():''}">`),
            containerType,
            styling,
            classes,
            {
                ...(attributes??{}),
                name: fieldName,
                min: minSelected.toString(),
                max: maxSelected.toString()
            }
        );
    }

}