import Game from "../game/Game";
import ContainerType from "./ContainerType";
import ContainerUIComponent from "./components/ContainerUIComponent";
import UIComponent from "./components/UIComponent";

export class StaticScreen extends ContainerUIComponent {

    constructor(components:Array<UIComponent>) {
        super('div','screen',components,ContainerType.CENTERED_ROWS);
    }

}

export type RefreshableScreen = (game:Game) => Screen;

type Screen = StaticScreen | RefreshableScreen;
export default Screen;