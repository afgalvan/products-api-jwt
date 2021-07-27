import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import assert from 'assert';
import request from 'supertest';

import { AppModule } from '../../../src/app.module';
import {
  rootMongooseTestModule,
  stopInMemoryMongo,
} from '../../__mocks__/mongo/MongooseTestModule';
import { UserService } from './../../../src/users/user.service';

let _request: request.Test;
let _response: request.Response;
let _token: string | null;
let app: INestApplication;

Given('the following user already exists:', async (user: string) => {
  const userJson = JSON.parse(user);
  const userService = await app.resolve(UserService);
  userService.saveUser(userJson);
});

Given('I send a GET request to {string}', (route: string) => {
  _request = request(app.getHttpServer())
    .get(route)
    .set('Authorization', 'Bearer ' + _token);
  _token = null;
});

Given(
  'I send a POST request to {string} with body:',
  async (route: string, body: string) => {
    _request = request(app.getHttpServer()).post(route).send(JSON.parse(body));
    _token = (await _request).body.token;
  },
);

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be:', async (response: string) => {
  const expectedResponse = JSON.parse(response);
  _response = await _request;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...actualResponse } = _response.body;
  assert.deepStrictEqual(actualResponse, expectedResponse);
});

BeforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      rootMongooseTestModule({ useNewUrlParser: true, useCreateIndex: true }),
      AppModule,
    ],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

AfterAll(async () => {
  await app.close();
  await stopInMemoryMongo();
});
