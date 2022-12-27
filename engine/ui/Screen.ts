import Game from "../game/Game";
import ContainerType from "./ContainerType";
import ContainerUIComponent from "./components/ContainerUIComponent";
import UIComponent from "./components/UIComponent";

export class StaticScreen extends ContainerUIComponent {

    private readonly clearAnswer:boolean;

    constructor(clearAnswer:boolean ,...components:Array<UIComponent>) {
        super('div','screen',components,ContainerType.CENTERED_ROWS);

        this.clearAnswer = clearAnswer
    }

    getSendable() {
        return {
            clearAnswer: this.clearAnswer,
            html: this.toString()
        }
    }

}

export type RefreshableScreen = (game:Game) => StaticScreen;

type Screen = StaticScreen | RefreshableScreen;
export default Screen;