import UIComponent from "./components/UIComponent";

export default class Screen {

    private static readonly CLASS_NAME = 'screen';

    public readonly name:string;
    public readonly components:Array<UIComponent>;
    public next:Screen|undefined;

    constructor(name:string, components:Array<UIComponent>, next?:Screen) {
        this.name = name;
        this.components = components;
        this.next = next;
    }

    public addComponent(component:UIComponent) {
        this.components.push(component);
    }

}