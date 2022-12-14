import { Attributes } from "../AttributeList";
import ContainerType from "../ContainerType";
import TextStyling from "../styling/TextStyling";
import TextUIComponent from "./TextUIComponent";

export default class ErrorMessageBox extends TextUIComponent {

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