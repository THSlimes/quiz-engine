import { Attributes } from "../../AttributeList";
import TextStyling from "../../styling/TextStyling";
import TextUIComponent from "../TextUIComponent";
import UIComponent from "../UIComponent";

export default abstract class InputUIComponent extends UIComponent {

    protected readonly fieldName:string;

    protected styling:TextStyling;

    constructor(type:string, baseClassName:string, fieldName:string, styling?:TextStyling, classes?:Array<string>, attributes?:Attributes) {
        super(
            'input',
            'ui-input ' + baseClassName.trim(),
            classes,
            {...(attributes ?? {}), name:fieldName, type:type}
        );

        this.styling = styling ?? {};

        this.fieldName = fieldName;
    }

    public toString(): string {
        return `
            <${this.elementName} class="${this.baseClassName} ${this.classList.toString()}" style="${this.styling.toString()}" ${this.attributeList.toString()}>
        `;
    }

}