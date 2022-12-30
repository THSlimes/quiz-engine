import DataStore from "../../engine/addons/DataStore";
import Player from "../../engine/game/client-types/Player";
import SpotifyAddon from "./SpotifyAddon";

export default class SpotifyAddonPlayerData extends DataStore<Player> {

    constructor() {
        super(SpotifyAddon);

        this.setup = true;
    }

}