import Addon from "./Addon";
import Class from "./Class";
import DataStore, { DataStoreSupporter } from "./DataStore";

/**
 * An AddonPack describes a collection of Addons.
 */
export default class AddonPack {

    private readonly addons:Array<Addon>;

    constructor(...addons:Array<Addon>) {
        addons.forEach((addonI, i) => {
            addons.forEach((addonJ, j) => {
                if (addonI.constructor === addonJ.constructor && i !== j) throw new Error('All Addons in an AddonPack must be unique');
            });
        });

        this.addons = addons;
    }

    getDefaultStores<T extends DataStoreSupporter>(T:Class<T>):Array<DataStore<T>> {
        const res:Array<DataStore<T>> = [];

        this.addons.forEach(addon => {
            const ds = addon.getDefaultStore(T);
            if (ds !== undefined) res.push(ds);
        });

        return res;
    } 


}