export const CONFIG:Config = {
    serverConfig: {
        dir: __dirname + '/public',
        port: 3000
    }
};

export interface Config {
    serverConfig:ServerConfig
}

export interface ServerConfig {
    dir: string,
    port: number
}