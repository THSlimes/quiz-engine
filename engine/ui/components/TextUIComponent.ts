import { Attributes } from "../AttributeList";
import ContainerType from "../ContainerType";
import TextStyling from "../TextStyling";
import ContainerUIComponent from "./ContainerUIComponent";
import UIComponent from "./UIComponent";

export default abstract class TextUIComponent extends ContainerUIComponent {

    public readonly styling:TextStyling;

    constructor(elemName:string, baseClassName:string, contents:Array<UIComponent|string>|string, containerType?:ContainerType, styling?:TextStyling, classes?:Array<string>, attributes?:Attributes) {
        super(elemName, baseClassName, typeof contents === 'string' ? [contents] : contents, containerType, classes, attributes);

        this.styling = styling ?? new TextStyling();
    }

    /**
     * Gives this UIComponent as a string. (formatted as HTML code)
     * @readonly UIComponent formatted as HTML
     */
    public toString():string {
        let out = `
            <${this.elementName} class="${this.baseClassName} ${this.containerType} ${this.classList.toString()}" style="${this.styling.toString()}" ${this.attributeList.toString()}>
        `;

        this.contents.forEach(c => out += c instanceof UIComponent ? c.toString : c);

        out += `</${this.elementName}>`;

        return out;
    }

}