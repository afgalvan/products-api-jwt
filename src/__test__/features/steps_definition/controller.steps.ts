import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import assert from 'assert';
import request from 'supertest';
import { container } from 'tsyringe';

import { App } from '../../../app';
import { setupDependencies } from '../../../services/dependencyInjection';

let _request: request.Test;
let _response: request.Response;
let app: App;

Given('I send a GET request to {string}', (route: string) => {
  _request = request(app.httpServer).get(route);
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be:', async (response: string) => {
  const expectedResponse = JSON.parse(response);
  _response = await _request;
  assert.deepStrictEqual(_response.body, expectedResponse);
});

BeforeAll(() => {
  setupDependencies();
  app = container.resolve(App);
  app.start();
});

AfterAll(() => app.close());
