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
        ignoreNameCapitalization: true,

        showIntermediateResults(game) {
            return game.questionNumber % 5 === 0;
        },

        canStart(game) {
            return game.players.every(player => player.isSetUp);
        },

        canEndQuestion(game) {
            return game.players.every(player => player.answer !== undefined);
        }
    },

    standardScreens: {

        namePickScreen: new StaticScreen(
            false,
            
            new Header('Choose a name.', 1),
            new TextInput('name','Name...'),
            new ErrorMessageBox(),
            new NextScreenButton("Confirm", true, true)
        ),

        waitingScreen: new StaticScreen(
            false,
            
            new Header('Waiting...')
        ),

        lobbyScreen(game) {
            return new StaticScreen(
                false,
                
                new Header('Waiting for Players...', 1),
                new Division(
                    game.players.filter(p=>p.username!==undefined).map(p => new Header(p.username as string),1),
                    ContainerType.CENTERED_COLUMNS
                ),
                new ErrorMessageBox(),
                new StartGameButton('start game', 'Start Game')
            );
        },

        intermediateResultsScreen(game) {
            return new StaticScreen(
                false,
                
                new Header('Intermediate Results'),
                new Division(
                    game.players.map((player, ind) => new Header(`${ind+1}. ${player.username}`)),
                    ContainerType.CENTERED_ROWS
                )
            );
        },

        finalResultsScreen(game) {
            return new StaticScreen(
                false,
                
                new Header('Final Results'),
                new Division(
                    game.players.map((player, ind) => new Header(`${ind+1}. ${player.username} - ${player.points} pts.`)),
                    ContainerType.CENTERED_ROWS
                )
            );
        }

    },

    standardEvents: {
        onGameStart(game) {
            
        },

        onNewQuestion(question) {
        },

        onQuestionEnds(game, question) {
        },

        onIntermediateResults(game) {

        },

        onFinalResults(game) {
            
        }
    },

    generateQuestions(game) {
        return [
            {
                hubScreen: new StaticScreen(
                    false,
                    
                    new Header('What is the correct answer?'),
                ),
                playerScreen: new StaticScreen(
                    true,
                    
                    new Header('Choose the correct answer.'),
                    new MultiSelectInput('answer', ['correct', 'incorrect'], 1, 1),
                    new NextScreenButton('Confirm', true, true)
                ),
                eval(answer) {
                    if (answer.answer === 'correct') return 100;
                    else return -100;
                }
            }
        ];
    }
    
};

export default BASIC_GAMEMODE;