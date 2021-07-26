import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { port } from './config/defaults.json';
import mongo from './config/mongo.config';
import { HomeModule } from './home/home.module';
import { SwaggerBuilder } from './swagger/swagger.builder';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongo.URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    }),
    SwaggerBuilder,
    HomeModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {
  static readonly port: number | string = process.env.PORT || port;
}
