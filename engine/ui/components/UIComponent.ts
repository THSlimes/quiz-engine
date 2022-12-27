import AttributeList, { Attributes } from "../AttributeList";
import ClassList from "../ClassList";

export default abstract class UIComponent {

    protected static readonly voidElements:Array<string> = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

    protected readonly elementName:string;

    protected readonly baseClassName:string;
    public readonly classList:ClassList;

    public readonly attributeList:AttributeList;

    /**
     * Initializes a UIComponent object.
     * @param elemName name of the HTML element used to create this UIComponent
     * @param baseClassName class this type of UIComponent is identified by
     * @param classes list of class-names
     * @param attributes key-value pairs of attributes
     */
    constructor(elemName:string, baseClassName:string, classes:Array<string>=[], attributes:Attributes={}) {
        this.elementName = elemName.trim();

        this.baseClassName = 'ui-component ' + baseClassName.trim();

        this.classList = new ClassList(...classes);
        this.attributeList = new AttributeList(attributes);

    }

    /**
     * Gives this UIComponent as a string. (formatted as HTML code)
     * @readonly UIComponent formatted as HTML
     */
    public toString():string {
        const out = `
            <${this.elementName} class="${this.baseClassName} ${this.classList.toString()}" ${this.attributeList.toString()}>
        `;

        return out + (UIComponent.voidElements.includes(this.elementName) ? '' : `</${this.elementName}>`); // only close non-void-elements
    }

}