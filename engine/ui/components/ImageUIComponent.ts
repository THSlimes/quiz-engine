import UIComponent from "./UIComponent";

export default class ImageUIComponent implements UIComponent {   

    private static readonly CLASS_NAME = 'ui-image';

    public readonly html:string;

    constructor(source:string, alt='') {
        this.html =  `<img class="${ImageUIComponent.CLASS_NAME}" src="${source}" alt="${alt}">`;
    }
    
}