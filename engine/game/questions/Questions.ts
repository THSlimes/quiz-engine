import DataStores from "../../addons/DataStores";
import Screen, { ScreenPair } from "../../ui/Screen";
import Answer from "./Answer";

/**
 * A Question object represents a question that is prompted
 * to Players of a Game.
 */
export default class Question {

    public readonly dataStores:DataStores<Question>;
    
    /**
     * The Screens that are displayed to the Players
     * and the Hub while the question is being prompted
     */
    public readonly screens:ScreenPair;

    /**
     * A function that evaluates the Answer submitted by a Player
     * @param answer Answer given by a Player
     */
    public readonly evaluate:(answer:Answer)=>number;
    
    /**
     * The maximum amount of milliseconds the Question can be
     * prompted, automatically ending once the timeout is over.
     */
    timeout?:number;

    /**
     * Creates a new Question object.
     * @param screens Screens that are shown to the Hub and the Players while prompting this Question
     * @param evaluate a function that gives a score to a given Answer
     * @param timeout time (ms) before this Question is automatically ended (if undefined, no timeout is used)
     */
    constructor(screens:ScreenPair, evaluate:(answer:Answer)=>number, timeout?:number, dataStores?:DataStores<Question>) {
        this.screens = screens;
        Object.freeze(this.screens);
        this.evaluate = evaluate;
        this.timeout = timeout;

        this.dataStores = dataStores ?? new DataStores<Question>();
    }


}