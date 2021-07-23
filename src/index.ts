import { config as configureEnvironment } from 'dotenv';
configureEnvironment();

import './database/connection';
import 'reflect-metadata';

import { container } from 'tsyringe';

import { App } from './app';
// Register dependencies in container
import { setupDependencies } from './services/dependencyInjection';

const init = (): void => {
  setupDependencies();
  const app = container.resolve(App);
  app.start(() => console.log(`Server on port ${app.port}`));
};

init();
