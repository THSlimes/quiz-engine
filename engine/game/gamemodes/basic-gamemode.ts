import ErrorMessageUIComponent from "../../ui/components/ErrorMessageUIComponent";
import HeaderUIComponent from "../../ui/components/HeaderUIComponent";
import NextScreenButtonUIComponent from "../../ui/components/inputs/NextScreenButtonUIComponent";
import TextInputUIComponent from "../../ui/components/inputs/TextInputUIComponent";
import Screen from "../../ui/Screen";
import Gamemode from "./GameMode";

const BASIC_GAMEMODE:Gamemode = {

    standardErrorMessages: {
        'setup/duplicate-name-chosen': 'Iemand heeft die naam al gekozen.'
    },

    namePickScreen: new Screen(
        'choose name',
        [
            new HeaderUIComponent('Kies een naam.', 1),
            new TextInputUIComponent('name','Naam...'),
            new ErrorMessageUIComponent(),
            new NextScreenButtonUIComponent('choose name', "Ja dat is'm.", true, true)
        ]
    )
    
};

export default BASIC_GAMEMODE;