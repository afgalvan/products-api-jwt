import { mongoUri } from './defaults.json';

interface MongoCredentials {
  MONGODB_URI: string;
  MONGODB_USER: string;
  MONGODB_PASSWORD: string;
}

export default (): MongoCredentials => ({
  MONGODB_URI: process.env.MONGODB_URI || mongoUri,
  MONGODB_USER: process.env.MONGODB_USER || '',
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD || '',
});
