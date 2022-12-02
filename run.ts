import { CONFIG } from './config';
import Game from './engine/game/Game';
import GameServer from './engine/GameServer';

const server = new GameServer(CONFIG.serverConfig);
server.start();

server.openGame(new Game({}));