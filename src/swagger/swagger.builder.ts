import { INestApplication, Injectable } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

import { customOptions, options } from './swagger.options';

export type Port = number | string;

@Injectable()
export class SwaggerBuilder {
  buildSwaggerUI(app: INestApplication, port?: Port): void {
    const custom = customOptions(port);
    const document = SwaggerModule.createDocument(app, options(port), custom);
    SwaggerModule.setup(custom.path, app, document);
  }
}
