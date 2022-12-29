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
        editable: {
            minPlayers: 1,
            maxPlayers: Infinity,
            allowDuplicateNames: false,
            ignoreNameCapitalization: true,
        },

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

        lobbyScreen: function(game) {
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

        intermediateResultsScreen: {
            hub: function(game) {
                return new StaticScreen(
                    [
                        new Header('Intermediate Results'),
                        new Division(
                            game.players.map((player, ind) => new Header(`${ind+1}. ${player.username}`)),
                            ContainerType.CENTERED_ROWS
                        )
                    ]
                );
            },
            player: new StaticScreen()

        },

        finalResultsScreen: {
            hub: function(game) {
                return new StaticScreen(
                    [
                    new Header('Final Results'),
                        new Division(
                            game.players.map((player, ind) => new Header(`${ind+1}. ${player.username} - ${player.points} pts.`)),
                            ContainerType.CENTERED_ROWS
                        )
                    ]
                );
            },
            player: new StaticScreen()
        },

        postGameScreen: {
            hub: function(game) {
                return new StaticScreen(
                    [
                        new Header('The top players'),
                        new Division(
                            game.players.slice(0,Math.min(3,game.players.length)).map((p,i) => new Header(`${i+1} ${p.username}`,1)),
                            ContainerType.CENTERED_COLUMNS
                        )
                    ]
                );
            },
            player: new StaticScreen()
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
            
        },

        onPostGame(game) {

        }
    },

    generateQuestions(game) {
        return [
            {
                screens: {
                    hub: new StaticScreen(
                        [
                            new Header('What is the correct answer?')
                        ],
                        false
                    ),
                    player: new StaticScreen(
                        [
                            new Header('Choose the correct answer.'),
                            new MultiSelectInput('answer', ['correct', 'incorrect'], 1, 1),
                            new NextScreenButton('Confirm', true, true)
                        ],
                        true
                    )
                },
                eval(answer) {
                    if (answer.answer === 'correct') return 100;
                    else return -100;
                },
                timeout: 10000
            }
        ];
    }
    
};

export default BASIC_GAMEMODE;