import Addon from "./Addon";
import Class from "./Class";
import DataStore, { DataStoreSupporter } from "./DataStore";

export default class DataStores<T extends DataStoreSupporter> {

    private readonly stores:Array<DataStore<T>>;

    constructor(...stores:Array<DataStore<T>>) {
        this.stores = stores;
    }

    public getByAddon<A extends Addon>(A:Class<A>):DataStore<T>|undefined {
        for (const store of this.stores) { // search for DataStore<T> from correct Addon
            if (store.type === A) return store;
        }

        return undefined;
    }

    public getByType<DS extends DataStore<T>>(DS:Class<DS>):DS|undefined {
        for (const store of this.stores) { // search for DataStore<T> of correct type
            if (store instanceof DS) return store;
        }

        return undefined;
    }

    public allSetup():boolean {
        return this.stores.every(s => s.setup);
    }

}