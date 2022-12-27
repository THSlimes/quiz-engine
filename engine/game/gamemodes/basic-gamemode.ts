import Division from "../../ui/components/Division";
import ErrorMessageBox from "../../ui/components/ErrorMessageBox";
import Header from "../../ui/components/Header";
import MultiSelectInput from "../../ui/components/inputs/MultiSelectInput";
import NextScreenButton from "../../ui/components/inputs/NextScreenButton";
import StartGameButton from "../../ui/components/inputs/StartGameButton";
import TextInput from "../../ui/components/inputs/TextInput";
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
                new Header('Choose a name.', 1),
                new TextInput('name','Name...'),
                new ErrorMessageBox(),
                new NextScreenButton("Confirm", true, true)
            ]
        ),

        waitingScreen: new StaticScreen(
            [
                new Header('Waiting...')
            ]
        ),

        lobbyScreen(game) {
            return new StaticScreen(
                [
                    new Header('Waiting for Players...', 1),
                    new Division(
                        game.players.filter(p=>p.username!==undefined).map(p => new Header(p.username as string),1),
                        ContainerType.CENTERED_COLUMNS
                    ),
                    new ErrorMessageBox(),
                    new StartGameButton('start game', 'Start Game')
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
                    new Header('What is the correct answer?'),
                ]),
                playerScreen: new StaticScreen([
                    new Header('Choose the correct answer.'),
                    new MultiSelectInput('answer', ['correct', 'incorrect'], 1, 1),
                    new NextScreenButton('Confirm', true, true)
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