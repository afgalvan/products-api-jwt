import { mongoUri } from '../config/defaults.json';

const env: string = process.env.NODE_ENV || 'development';

interface MongoConfig {
  uri: string;
}

const mongo: Record<string, MongoConfig> = {
  development: {
    uri: mongoUri,
  },
  production: {
    uri: '', // Mongo Atlas URI
  },
  docker: {
    uri: 'mongodb://mongo/products_api',
  },
};

export default mongo[env.toLowerCase()];
