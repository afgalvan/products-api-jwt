/* eslint-disable prettier/prettier */
import { DynamicModule } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

export const rootMongooseTestModule = (
  options: MongooseModuleOptions,
): DynamicModule => {
  return MongooseModule.forRootAsync({
    useFactory: async () => {
      mongod = await MongoMemoryServer.create();

      return {
        uri: mongod.getUri(),
        ...options,
      };
    },
  });
};

export const stopInMemoryMongoDB = async (): Promise<void> => {
  if (mongod) {
    await mongod.stop(true);
  }
};

export const mongodb = (): MongoMemoryServer => mongod;
