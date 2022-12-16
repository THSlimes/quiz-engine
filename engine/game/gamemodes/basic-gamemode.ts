import DivUIComponent from "../../ui/components/DivUIComponent";
import ErrorMessageUIComponent from "../../ui/components/ErrorMessageUIComponent";
import HeaderUIComponent from "../../ui/components/HeaderUIComponent";
import MultiSelectUIComponent from "../../ui/components/inputs/MultiSelectUIComponent";
import NextScreenButtonUIComponent from "../../ui/components/inputs/NextScreenButtonUIComponent";
import SelectUIComponent from "../../ui/components/inputs/SelectUIComponent";
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

    standardEvents: {
        onGameStart(game) {
            
        },

        onNextQuestion(question) {
            if (question === undefined) console.log('No next Question');
            else {
            }
        },
    },

    canStart(game) {
        return game.players.every(player => player.isSetUp);
    },

    questionFinished(game) {
        return game.players.every(player => player.answer !== undefined);
    },

    generateQuestions(game) {
        return [
            {
                hubScreen: new Screen('question 1', [
                    new HeaderUIComponent('What is the correct answer?'),
                ]),
                playerScreen: new Screen('question 1', [
                    new HeaderUIComponent('Choose the correct answer.'),
                    new MultiSelectUIComponent('answer', ['correct', 'incorrect'], ContainerType.CENTERED_ROWS, 1, 1),
                    new NextScreenButtonUIComponent('next screen', 'Confirm', true, true)
                ]),
                eval(answer) {
                    if (answer.answer === 'correct') return 100;
                    else return -100;
                }
            }
        ];
    }
    
};

export default BASIC_GAMEMODE;