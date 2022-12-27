import { Attributes } from "../../AttributeList";
import ContainerType from "../../ContainerType";
import TextStyling from "../../TextStyling";
import TextUIComponent from "../TextUIComponent";

export default class DropdownInput extends TextUIComponent {

    constructor(fieldName:string, options:Array<string>, defaultOpt?:string, styling?:TextStyling, classes?:Array<string>, attributes?:Attributes) {
        super(
            'select',
            'ui-select-input',
            options.map(opt => `<option ${opt===defaultOpt?'selected':''}>${opt}</option>`),
            ContainerType.DEFAULT,
            styling,
            classes,
            attributes
        );
    }

}