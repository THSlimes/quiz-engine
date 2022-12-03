import { CONFIG } from './config';
import Game from './engine/game/Game';
import BASIC_GAMEMODE from './engine/game/gamemodes/basic-gamemode';
import GameServer from './engine/GameServer';

const server = new GameServer(CONFIG.serverConfig);
server.start();

server.openGame(new Game(BASIC_GAMEMODE));