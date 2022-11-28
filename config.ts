export const CONFIG:Config = {
    serverConfig: {
        dir: '/public',
        port: 8080
    }
};

interface Config {
    serverConfig:ServerConfig
}

interface ServerConfig {
    dir: string,
    port: number
}