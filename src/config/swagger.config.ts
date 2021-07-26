import { ConfigService } from '@nestjs/config';

import { description, license, licenseUrl, version } from '../../package.json';

const config = new ConfigService();

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
      url: `http://localhost:${config.get('PORT')}`,
    },
  ],
};
