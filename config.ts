export const CONFIG:Config = {
    serverConfig: {
        dir: '/public',
        port: 3000
    }
};

interface Config {
    serverConfig:ServerConfig
}

interface ServerConfig {
    dir: string,
    port: number
}