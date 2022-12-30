import Class from "./Class";
import DataStore, { DataStoreSupporter } from "./DataStore";

/**
 * An Addon is something that provided extra functionality
 * which is not normally provided by the quiz-engine.
 * (e.g. connecting to a music player)
 */
export default interface Addon {

    /**
     * Name of the Addon.
     */
    readonly name:string;

    /**
     * A function that gives DataStores based on where they will be used.
     * @param T Class that will use the DataStore
     */
    getDefaultStore<T extends DataStoreSupporter>(T:Class<T>):DataStore<T> | undefined;

    /**
     * A function that handles the setup process of this Addon.
     * @returns true if setup was successful, false otherwise
     */
    setup?():boolean;

}