import Game from "../game/Game";
import Player from "../game/client-types/Player";
import ContainerType from "./ContainerType";
import ContainerUIComponent from "./components/ContainerUIComponent";
import UIComponent from "./components/UIComponent";

export class StaticScreen extends ContainerUIComponent {

    private readonly clearAnswer:boolean;

    constructor(components:Array<UIComponent>=[], clearAnswer=true) {
        super('div','screen',components,ContainerType.CENTERED_ROWS);

        this.clearAnswer = clearAnswer;
    }

    getSendable() {
        return {
            clearAnswer: this.clearAnswer,
            html: this.toString()
        }
    }

}

export type RefreshableScreen = (game:Game, player?:Player) => StaticScreen;

type Screen = StaticScreen | RefreshableScreen;
export default Screen;

/**
 * Specifies a Screen that gets shown to the Hub and the Players at the same time.
 */
export interface ScreenPair {
    hub:Screen,
    player:Screen
};