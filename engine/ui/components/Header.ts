import { Attributes } from "../AttributeList";
import ContainerType from "../ContainerType";
import TextStyling from "../TextStyling";
import TextUIComponent from "./TextUIComponent";

export default class Header extends TextUIComponent {

    constructor(text:string, size:1|2|3|4|5|6=1, styling?:TextStyling, classes?:Array<string>, attributes?:Attributes) {
        super(
            'h'+size,
            'ui-header',
            [text],
            ContainerType.DEFAULT,
            styling,
            classes,
            attributes
        );
    }

}