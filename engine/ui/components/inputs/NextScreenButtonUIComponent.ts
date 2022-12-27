import { Attributes } from "../../AttributeList";
import TextStyling from "../../TextStyling";
import InputUIComponent from "./InputUIComponent";

export default class NextScreenButtonUIComponent extends InputUIComponent {

    constructor(text:string, requiresAnswers=false, submitAnswer=false, styling?:TextStyling, classes?:Array<string>, attributes?:Attributes) {
        super(
            'button',
            'ui-next-screen-button',
            'next screen',
            styling,
            classes,
            {
                ...(attributes??{}),
                ...(requiresAnswers?{disabled:'true'}:{}),
                value: text,
                onclick: "nextScreen();" + submitAnswer?'submitAnswer();':''
            }
        );
        
    }

}