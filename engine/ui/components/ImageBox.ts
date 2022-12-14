import { Attributes } from "../AttributeList";
import UIComponent from "./UIComponent";

export default class ImageBox extends UIComponent {

    constructor(source:string, alt='', classes?:Array<string>, attributes?:Attributes) {
        super(
            'img',
            'ui-image',
            classes,
            attributes
        );
    }

}