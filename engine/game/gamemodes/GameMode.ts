import Screen from "../../ui/Screen";
import Game from "../Game";
import Question from "../questions/Questions";

export default interface Gamemode {

    readonly standardErrorMessages:StandardErrorMessages;

    /**
     * Screen where a Player can choose their name.
     */
    readonly namePickScreen:Screen;

    // /**
    //  * Determines whether the Game can start being played.
    //  * @param game the Game
    //  * @returns true if Game can start, false otherwise
    //  */
    // canStart:(game:Game) => boolean,

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

interface StandardErrorMessages {
    'setup/duplicate-name-chosen':string
}