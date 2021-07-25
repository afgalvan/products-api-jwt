import { jwtSecret } from './defaults.json';

interface JwtConfig {
  SECRET: string;
}

const jwtConfig: JwtConfig = {
  SECRET: process.env.JWT_SECRET || jwtSecret,
};

export default jwtConfig;
