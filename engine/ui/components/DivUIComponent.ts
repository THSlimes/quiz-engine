import ContainerType from "../ContainerType";
import UIComponent from "./UIComponent";

export default class DivUIComponent implements UIComponent {

    private static readonly CLASS_NAME = 'ui-div';

    public html: string = `<div class="${DivUIComponent.CLASS_NAME}">`;

    public children:Array<UIComponent>;
    public containerType:ContainerType;

    constructor(children:Array<UIComponent>, containerType:ContainerType) {
        this.children = children;
        this.containerType = containerType;
        this.reloadHtml();
    }

    private reloadHtml() {
        let newHtml = `<div class="ui-component ${DivUIComponent.CLASS_NAME} ${this.containerType}">`;
        for (let i = 0; i < this.children.length; i ++) {
            newHtml += this.children[i].html;
        }
        newHtml += '</div>';

        this.html = newHtml;
    }

}