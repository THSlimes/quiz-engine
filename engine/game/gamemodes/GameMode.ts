import Screen from "../../ui/Screen";
import Game from "../Game";
import Question from "../questions/Questions";

export default interface Gamemode {

    readonly name:string,
    
    readonly standardErrorMessages:StandardErrorMessages;

    settings: {
        minPlayers: number,
        maxPlayers: number,
        allowDuplicateNames: boolean,
        ignoreNameCapitalization: boolean
    }

    standardScreens: {
        /**
         * Screen where a Player can choose their name.
         */
        readonly namePickScreen:Screen;
        
        /**
         * The Screen that is displayed when a Player is awaiting some other Screen.
         */
        readonly waitingScreen:Screen;

        /**
         * The Screen that is shown on the Hub before the Game starts.
         */
        readonly lobbyScreen:RefreshableScreen;

    }

    /**
     * Determines whether the Game can start being played.
     * @param game the Game
     * @returns true if Game can start, false otherwise
     */
    canStart:(game:Game) => boolean;

    // /**
    //  * Determines wheter the Game can continue on to the next question.
    //  * @param game the Game
    //  * @returns true if Hame can continue, false otherwise
    //  */
    // canContinue:(game:Game) => boolean,

    // /**
    //  * Generates Questions for a Game.
    //  * @param game the Game
    //  * @returns list of Questions for the Game
    //  */
    // generateQuestions:(game:Game) => Array<Question>,

    // /**
    //  * Determines what should be done when the next Question is prompted.
    //  * @param question Question being prompted
    //  */
    // onNextQuestion:(question:Question) => void
}

/**
 * A RefreshableScreen is a Screen as a function of the current Game state.
 * This means that when the Game state is updated, the output screen should
 * change as well.
 */
export type RefreshableScreen = (game:Game) => Screen;

/**
 * The StandardErrorMessages interface specified the error messages
 * that are used by default.
 */
interface StandardErrorMessages {
    'setup/duplicate-name-chosen':string,
    'setup/hub-already-present':string,
    'setup/cannot-start-game':string
}