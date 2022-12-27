import { Attributes } from "../AttributeList";
import TextStyling from "../TextStyling";
import TextUIComponent from "./TextUIComponent";
import UIComponent from "./UIComponent";

export default class ParagraphUIComponent extends TextUIComponent {

    constructor(contents:Array<UIComponent|string>|string, styling?:TextStyling, classes?:Array<string>, attributes?:Attributes) {
        super(
            'p',
            'ui-paragraph',
            contents,
            styling,
            classes,
            attributes
        );
    }

}