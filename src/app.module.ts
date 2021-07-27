import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import jwtConfig from './config/jwt.config';
import mongoConfig from './config/mongo.config';
import serverConfig from './config/server.config';
import { HomeModule } from './home/home.module';
import { SwaggerBuilder } from './swagger/swagger.builder';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [serverConfig, mongoConfig, jwtConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    SwaggerBuilder,
    HomeModule,
    UsersModule,
    AuthModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
