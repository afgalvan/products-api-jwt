import { jwtSecret } from './defaults.json';

interface JwtConfig {
  JWT_SECRET: string;
}

export default (): JwtConfig => ({
  JWT_SECRET: process.env.JWT_SECRET || jwtSecret,
});
