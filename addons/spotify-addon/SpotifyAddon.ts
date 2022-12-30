import Addon from "../../engine/addons/Addon";
import Class from "../../engine/addons/Class";
import DataStore, { DataStoreSupporter } from "../../engine/addons/DataStore";
import Player from "../../engine/game/client-types/Player";
import SpotifyAddonPlayerData from "./SpotifyAddonPlayerData";

export default class SpotifyAddon implements Addon {
    
    readonly name = 'Spotify add-on';
    
    getDefaultStore<T extends DataStoreSupporter>(T: Class<T>): DataStore<T> | undefined {
        if (T === Player) {
            return new SpotifyAddonPlayerData();
        }

        return undefined;
    }

    setup(): boolean {
        return true;
    }

}