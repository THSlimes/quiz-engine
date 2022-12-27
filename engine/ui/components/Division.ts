import { Attributes } from "../AttributeList";
import ContainerType from "../ContainerType";
import ContainerUIComponent from "./ContainerUIComponent";
import UIComponent from "./UIComponent";

export default class Division extends ContainerUIComponent {

    constructor(contents:Array<UIComponent>, containerType=ContainerType.DEFAULT, classes?:Array<string>, attributes?:Attributes) {
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