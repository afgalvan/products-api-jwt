import { port } from './defaults.json';

export interface ServerConfig {
  PORT: number | string;
}

const serverConfig: ServerConfig = {
  PORT: process.env.PORT || port,
};

export default serverConfig;
