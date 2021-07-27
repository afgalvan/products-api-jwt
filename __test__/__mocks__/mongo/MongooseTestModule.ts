/* eslint-disable prettier/prettier */
import { DynamicModule } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { exit } from 'process';

let mongod: MongoMemoryServer;

export const rootMongooseTestModule = (
  options: MongooseModuleOptions,
): DynamicModule => {
  return MongooseModule.forRootAsync({
    useFactory: async () => {
      const mongod = await MongoMemoryServer.create();

      return {
        uri: mongod.getUri(),
        ...options,
      };
    },
  });
};

export const stopInMemoryMongo = async (): Promise<void> => {
  if (mongod) {
    mongod.stop(true);
  }
  setTimeout(() => exit(0), 300);
};

export const mongodb = (): MongoMemoryServer => mongod;
