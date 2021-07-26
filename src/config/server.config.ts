import { port } from './defaults.json';

export interface ServerConfig {
  PORT: number | string;
}

export default (): ServerConfig => ({
  PORT: process.env.PORT || port,
});
