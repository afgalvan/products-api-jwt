import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { port } from './config/defaults.json';
import { SwaggerBuilder } from './swagger/swagger.builder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerBuilder = await app.resolve(SwaggerBuilder);
  const configService = await app.resolve(ConfigService);

  swaggerBuilder.buildSwaggerUI(app);
  app.enableCors();

  await app.listen(configService.get('PORT') || port);
  console.log(`Application is running on: ${await await app.getUrl()}`);
}

bootstrap();
