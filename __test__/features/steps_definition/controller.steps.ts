import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import assert from 'assert';
import request from 'supertest';

import { AppModule } from '../../../src/app.module';

let _request: request.Test;
let _response: request.Response;
let app: INestApplication;

Given('the following user already exists:', (user: string) => {
  console.log(JSON.parse(user));
  return 'pending';
});

Given('I send a GET request to {string}', (route: string) => {
  _request = request(app.getHttpServer()).get(route);
});

Given(
  'I send a POST request to {string} with body:',
  (route: string, body: string) => {
    _request = request(app.getHttpServer()).post(route).send(JSON.parse(body));
  },
);

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be:', async (response: string) => {
  const expectedResponse = JSON.parse(response);
  _response = await _request;
  assert.deepStrictEqual(_response.body, expectedResponse);
});

BeforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

AfterAll(async () => await app.close());
