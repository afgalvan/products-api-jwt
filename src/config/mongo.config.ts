import { mongoUri } from './defaults.json';

interface MongoCredentials {
  URI: string;
  USER: string;
  PASSWORD: string;
}

const mongo: MongoCredentials = {
  URI: process.env.MONGODB_URI || mongoUri,
  USER: process.env.MONGODB_USER || '',
  PASSWORD: process.env.MONGODB_PASSWORD || '',
};

export default mongo;
