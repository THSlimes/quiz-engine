import TextUIComponent from "../TextUIComponent";
import InputUIComponent from "./InputUIComponent";

export default class NextScreenButtonUIComponent implements TextUIComponent, InputUIComponent {

    private static readonly CLASS_NAME = 'ui-next-screen-button';

    public readonly fieldName: string;

    public readonly html:string;

    /**
     * A button that takes the user to the next screen.
     * @param fieldName name of the button
     * @param requiresAnswers whether the user must fill in all inputs before this button is enabled
     * @param submitAnswer whether this button submits the current inputs
     */
    constructor(fieldName:string, text:string, requiresAnswers=false, submitAnswer=false) {
        this.fieldName = fieldName;

        this.html = `<input
                        class="ui-component ${NextScreenButtonUIComponent.CLASS_NAME}"
                        type="button"
                        name="${fieldName}"
                        value="${text}"
                        ${requiresAnswers?'disabled':''}
                        onclick="nextScreen(); ${submitAnswer?'submitAnswer();':''}"
                    >`;
    }
    
}