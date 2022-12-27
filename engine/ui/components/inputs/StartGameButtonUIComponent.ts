import { Attributes } from "../../AttributeList";
import TextStyling from "../../TextStyling";
import InputUIComponent from "./InputUIComponent";

export default class StartGameButtonUIComponent extends InputUIComponent {

    constructor(text:string, styling?:TextStyling, classes?:Array<string>, attributes?:Attributes) {
        super(
            'button',
            'ui-start-game-button',
            'start game',
            styling,
            classes,
            {
                ...(attributes??{}),
                value: text,
                onclick: 'startGame();'
            }
        );
    }

}