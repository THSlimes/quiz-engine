import Game from "../game/Game";
import Hub from "../game/client-types/Hub";
import Player from "../game/client-types/Player";
import Question from "../game/questions/Questions";
import Addon from "./Addon";
import Class from "./Class";

export type DataStoreSupporter = 
    Game |
    Player |
    Hub |
    Question;

export default abstract class DataStore<T extends DataStoreSupporter> {

    public setup = false;
    public readonly type:Class<Addon>; // manual addition of run-time type

    constructor(type:Class<Addon>) {
        this.type = type;
    }

}