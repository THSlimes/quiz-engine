import Hub from "./client-types/Hub";
import Player from "./client-types/Player";
import GameMode from "./gamemodes/GameMode";

export default class Game {

    public readonly gamemode:GameMode;
    
    private static readonly OLD_PLAYERS_MEM = 10;
    public readonly oldPlayers:Array<Player> = []; // FIFO queue of Players that left (newest -> oldest)
    public readonly players:Array<Player> = []; // current Players
    public readonly hub:Hub|undefined; // Hub showing "projector" screen

    constructor(gamemode:GameMode) {
        this.gamemode = gamemode;
    }

    /**
     * Adds a new Player to this Game.
     * @param player Player that joins
     */
    public connect(player:Player) {
        this.players.push(player);
        console.log(`PLayer ${player.id} joined the Game.`);

        player.currentScreen = this.gamemode.namePickScreen;
        
    }

    /**
     * Removes a Player from this Game.
     * @param player Player that leaves
     * @returns true if a Player was removed, false otherwise
     */
    public disconnect(player:Player) {
        for (let i = 0; i < this.players.length; i ++) {
            if (this.players[i] === player) {
                this.oldPlayers.unshift(this.players.splice(i,1)[0]);
                while (this.oldPlayers.length > Game.OLD_PLAYERS_MEM) this.oldPlayers.pop();

                console.log(`Player ${player.id} left the Game.`);
                return true;
            }
        }

        console.log(`Warning: Player ${player.id} is not in this Game.`);
        return false;
        
    }

    /**
     * Checks whether a name has not been chosen by another Player.
     * @param name suggested name
     * @returns true if not yet picked, false otherwise
     */
    public usenameAvailable(username:string) {
        return !this.players.some(player => player.username === username);
    }

    /**
     * Gets an old Player who left, and removes them from the list.
     * @param username username of a Player who left.
     * @returns Player who left with given name (undefined if no such name)
     */
    public getOldPlayer(username:string) {
        for (let i = this.oldPlayers.length-1; i >= 0; i --) {
            if (this.oldPlayers[i].username === username) return this.oldPlayers.splice(i,1)[0];
        }

        return undefined;
    }

}