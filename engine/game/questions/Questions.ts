import Screen, { ScreenPair } from "../../ui/Screen";
import Answer from "./Answer";

/**
 * A Question object represents a question that is prompted
 * to the Players of a Game.
 */
export default interface Question {
    /**
     * The Screens that are displayed to the Players
     * and the Hub while the question is being prompted
     */
    screens:ScreenPair,
    /**
     * A function that evaluates the Answer submitted by a Player
     * @param answer Answer given by a Player
     */
    eval(answer:Answer):number,
    /**
     * The maximum amount of milliseconds the Question can be
     * prompted, automatically ending once the timeout is over.
     * (if undefined, no timeout is used)
     */
    timeout?:number
}