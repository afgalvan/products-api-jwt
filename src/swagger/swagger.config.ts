import { description, license, licenseUrl, version } from '../../package.json';
import { Port } from './swagger.builder';

export interface SwaggerModel {
  openapi: string | number;
  basePath: string;
  title: string;
  version: string;
  description: string;
  license: string;
  licenseUrl: string;
  servers: Record<string, string>[];
}

export const swagger = (port?: Port): SwaggerModel => ({
  openapi: '3.0.0',
  basePath: '/docs',
  title: 'Template API',
  version: version,
  description: description,
  license: license,
  licenseUrl: licenseUrl,
  servers: [
    {
      url: `http://localhost:${port}`,
    },
  ],
});
