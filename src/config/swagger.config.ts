import { description, license, licenseUrl, version } from '../../package.json';
import serverConfig from './server.config';

export const swagger = {
  openapi: '3.0.0',
  basePath: '/docs',
  info: {
    title: 'Template API',
    version: version,
    description: description,
    license: license,
    licenseUrl: licenseUrl,
  },
  servers: [
    {
      url: `http://localhost:${serverConfig.PORT}`,
    },
  ],
};
