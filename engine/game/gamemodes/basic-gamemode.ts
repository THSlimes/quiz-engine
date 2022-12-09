import DivUIComponent from "../../ui/components/DivUIComponent";
import ErrorMessageUIComponent from "../../ui/components/ErrorMessageUIComponent";
import HeaderUIComponent from "../../ui/components/HeaderUIComponent";
import NextScreenButtonUIComponent from "../../ui/components/inputs/NextScreenButtonUIComponent";
import StartGameButtonUIComponent from "../../ui/components/inputs/StartGameButtonUIComponent";
import TextInputUIComponent from "../../ui/components/inputs/TextInputUIComponent";
import ContainerType from "../../ui/ContainerType";
import Screen from "../../ui/Screen";
import Gamemode from "./GameMode";

const BASIC_GAMEMODE:Gamemode = {

    name: 'Basic Gamemode',
    
    standardErrorMessages: {
        'setup/duplicate-name-chosen': 'Someone already chose that name.',
        'setup/hub-already-present': 'That Game already has a Projector.',
        'setup/cannot-start-game': "Couldn't start Game."
    },

    settings: {
        minPlayers: 1,
        maxPlayers: Infinity,
        allowDuplicateNames: false,
        ignoreNameCapitalization: true
    },

    standardScreens: {

        namePickScreen: new Screen(
            'choose name',
            [
                new HeaderUIComponent('Choose a name.', 1),
                new TextInputUIComponent('name','Name...'),
                new ErrorMessageUIComponent(),
                new NextScreenButtonUIComponent('choose name', "Confirm", true, true)
            ]
        ),

        waitingScreen: new Screen(
            'waiting screen',
            [
                new HeaderUIComponent('Waiting...')
            ]
        ),

        lobbyScreen(game) {
            return new Screen(
                'lobby screen',
                [
                    new HeaderUIComponent('Waiting for Players...', 1),
                    new DivUIComponent(
                        game.players.filter(p=>p.username!==undefined).map(p => new HeaderUIComponent(p.username as string),1),
                        ContainerType.CENTERED_COLUMNS
                    ),
                    new ErrorMessageUIComponent(),
                    new StartGameButtonUIComponent('start game', 'Start Game')
                ]
            );
        },

    },

    canStart(game) {
        return game.players.every(player => player.isSetUp);
    },
    
};

export default BASIC_GAMEMODE;