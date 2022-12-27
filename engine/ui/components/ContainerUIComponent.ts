import { Attributes } from "../AttributeList";
import ContainerType from "../ContainerType";
import UIComponent from "./UIComponent";

export default abstract class ContainerUIComponent extends UIComponent {

    public readonly contents:Array<UIComponent|string> = [];
    public containerType:ContainerType;

    /**
     * Initializes a UIComponent object.
     * @param elemName name of the HTML element used to create this UIComponent
     * @param baseClassName class this type of UIComponent is identified by
     * @param contents list of nested UIComponents (or text)
     * @param classes list of class-names
     * @param attributes key-value pairs of attributes
     */
    constructor(elemName:string, baseClassName:string, contents:Array<UIComponent|string>, containerType:ContainerType=ContainerType.DEFAULT, classes?:Array<string>, attributes?:Attributes) {
        if (UIComponent.voidElements.includes(elemName)) throw new TypeError(`element ${elemName} can never have contents.`);
        super(elemName,baseClassName,classes,attributes);

        contents.forEach(c => this.contents.push(c));
        this.containerType = containerType;
    }

    /**
     * Gives this UIComponent as a string. (formatted as HTML code)
     * @readonly UIComponent formatted as HTML
     */
    public toString():string {
        let out = `
            <${this.elementName} class="ui-component ${this.baseClassName} ${this.containerType} ${this.classList.toString()}" ${this.attributeList.toString()}>
        `;

        this.contents.forEach(c => out += c instanceof UIComponent ? c.toString() : c);

        out += `</${this.elementName}>`;

        return out;
    }

}