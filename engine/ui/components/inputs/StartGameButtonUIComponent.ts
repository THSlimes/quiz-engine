import TextUIComponent from "../TextUIComponent";
import InputUIComponent from "./InputUIComponent";

export default class StartGameButtonUIComponent implements TextUIComponent, InputUIComponent {

    private static readonly CLASS_NAME = 'ui-start-game-button';

    public readonly fieldName: string;

    public readonly html:string;

    /**
     * A button that attempts to start the Game.
     * @param fieldName name of the button
     * @param text text displayed in the button
     */
    constructor(fieldName:string, text:string) {
        this.fieldName = fieldName;

        this.html = `<input
                        class="ui-component ${StartGameButtonUIComponent.CLASS_NAME}"
                        type="button"
                        name="${fieldName}"
                        value="${text}"
                        onclick="startGame();"
                    >`;
    }
    
}