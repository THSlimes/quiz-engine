import { Attributes } from "../AttributeList";
import ContainerType from "../ContainerType";
import TextStyling from "../TextStyling";
import TextUIComponent from "./TextUIComponent";

export default class ErrorMessageUIComponent extends TextUIComponent {

    constructor(styling?:TextStyling, classes?:Array<string>, attributes?:Attributes) {
        super(
            'p',
            'ui-error-message',
            [],
            ContainerType.CENTERED_ROWS,
            styling,
            classes,
            attributes
        );
    }

}