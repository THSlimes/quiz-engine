import { CONFIG } from './config';
import GameServer from './engine/GameServer';

const server = new GameServer(CONFIG.serverConfig);
server.start();