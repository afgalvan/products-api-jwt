import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

import { Port } from './swagger.builder';
import { swagger } from './swagger.config';

export interface SwaggerCustomOptions extends SwaggerDocumentOptions {
  explorer?: boolean;
  customCss?: string;
  customCssUrl?: string;
  customJs?: string;
  customfavIcon?: string;
  swaggerUrl?: string;
  customSiteTitle?: string;
  validatorUrl?: string;
  url?: string;
  path: string;
  urls?: Record<'url' | 'name', string>[];
}

export const customOptions = (port?: Port): SwaggerCustomOptions => ({
  customSiteTitle: 'API Docs',
  path: swagger(port).basePath,
});

export const options = (port?: Port): Omit<OpenAPIObject, 'paths'> => {
  const config = swagger(port);
  return new DocumentBuilder()
    .addBearerAuth()
    .setTitle(config.title)
    .setDescription(config.description)
    .setVersion(config.version)
    .setLicense(config.license, config.licenseUrl)
    .addServer(config.servers[0].url)
    .build();
};
