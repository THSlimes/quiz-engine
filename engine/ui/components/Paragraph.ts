import { Attributes } from "../AttributeList";
import ContainerType from "../ContainerType";
import TextStyling from "../styling/TextStyling";
import TextUIComponent from "./TextUIComponent";
import UIComponent from "./UIComponent";

export default class Paragraph extends TextUIComponent {

    constructor(contents:Array<UIComponent|string>|string, styling?:TextStyling, classes?:Array<string>, attributes?:Attributes) {
        super(
            'p',
            'ui-paragraph',
            contents,
            ContainerType.DEFAULT,
            styling,
            classes,
            attributes
        );
    }

}