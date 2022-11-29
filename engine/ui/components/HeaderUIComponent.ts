import TextUIComponent from "./TextUIComponent";

export default class HeaderUIComponent implements TextUIComponent {   

    private static readonly CLASS_NAME = 'ui-header';

    public readonly html:string;

    constructor(text:string, size:1|2|3|4|5|6=1) {
        this.html =  `<h${size} class=${HeaderUIComponent.CLASS_NAME}>${text}</h${size}>`;
    }
    
}