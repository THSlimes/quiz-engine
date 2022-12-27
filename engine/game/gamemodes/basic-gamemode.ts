import DivUIComponent from "../../ui/components/DivUIComponent";
import ErrorMessageUIComponent from "../../ui/components/ErrorMessageUIComponent";
import HeaderUIComponent from "../../ui/components/HeaderUIComponent";
import MultiSelectUIComponent from "../../ui/components/inputs/MultiSelectUIComponent";
import NextScreenButtonUIComponent from "../../ui/components/inputs/NextScreenButtonUIComponent";
import StartGameButtonUIComponent from "../../ui/components/inputs/StartGameButtonUIComponent";
import TextInputUIComponent from "../../ui/components/inputs/TextInputUIComponent";
import ContainerType from "../../ui/ContainerType";
import { StaticScreen } from "../../ui/Screen";
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

        namePickScreen: new StaticScreen(
            [
                new HeaderUIComponent('Choose a name.', 1),
                new TextInputUIComponent('name','Name...'),
                new ErrorMessageUIComponent(),
                new NextScreenButtonUIComponent("Confirm", true, true)
            ]
        ),

        waitingScreen: new StaticScreen(
            [
                new HeaderUIComponent('Waiting...')
            ]
        ),

        lobbyScreen(game) {
            return new StaticScreen(
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
        },

        onQuestionFinish(game) {
            game.onNextQuestion();
        },

        onGameFinish(game) {
            
        }
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
                hubScreen: new StaticScreen([
                    new HeaderUIComponent('What is the correct answer?'),
                ]),
                playerScreen: new StaticScreen([
                    new HeaderUIComponent('Choose the correct answer.'),
                    new MultiSelectUIComponent('answer', ['correct', 'incorrect'], 1, 1),
                    new NextScreenButtonUIComponent('Confirm', true, true)
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