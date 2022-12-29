import Game from "../game/Game";
import Player from "../game/client-types/Player";
import ContainerType from "./ContainerType";
import ContainerUIComponent from "./components/ContainerUIComponent";
import UIComponent from "./components/UIComponent";
import StyleSheet from "./styling/StyleSheet";

export class StaticScreen extends ContainerUIComponent {

    private readonly clearAnswer:boolean;
    private readonly styleSheet?:StyleSheet;

    constructor(components:Array<UIComponent>=[], clearAnswer=true, styleSheet?:StyleSheet) {
        super('div','screen',components,ContainerType.CENTERED_ROWS);

        this.clearAnswer = clearAnswer;
        this.styleSheet = styleSheet;
    }

    getSendable() {
        return {
            clearAnswer: this.clearAnswer,
            html: this.toString(),
            styleSheet: this.styleSheet?.toString()
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