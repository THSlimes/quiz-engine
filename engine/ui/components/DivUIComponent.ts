import { Attributes } from "../AttributeList";
import ContainerType from "../ContainerType";
import ContainerUIComponent from "./ContainerUIComponent";
import UIComponent from "./UIComponent";

export default class DivUIComponent extends ContainerUIComponent {

    constructor(contents:Array<UIComponent>, containerType:ContainerType, classes?:Array<string>, attributes?:Attributes) {
        super(
            'div',
            'ui-div',
            contents,
            containerType,
            classes,
            attributes
        );
    }

}