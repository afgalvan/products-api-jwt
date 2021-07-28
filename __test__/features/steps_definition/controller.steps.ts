import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import assert from 'assert';
import request from 'supertest';

import { AppModule } from '../../../src/app.module';
import { ProductsService } from '../../../src/products/products.service';
import { UserService } from '../../../src/users/user.service';
import {
  rootMongooseTestModule,
  stopInMemoryMongoDB,
} from '../../__mocks__/mongo/MongooseTestModule';

let _request: request.Test;
let _response: request.Response;
let _token: string | null;
let app: INestApplication;

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
  await stopInMemoryMongoDB();
});

Given('the following user already exists:', async (user: string) => {
  const userJson = JSON.parse(user);
  const userService = await app.resolve(UserService);
  userService.saveUser(userJson);
});

Given('the following product already exists:', async (product: string) => {
  const productService = await app.resolve(ProductsService);

  const storedProduct = await productService.getProducts();
  if (storedProduct.length) {
    return;
  }

  const productJson = JSON.parse(product);
  productService.saveProduct(productJson);
});

Given('I send a GET request to {string}', (route: string) => {
  _request = request(app.getHttpServer())
    .get(route)
    .set('Authorization', 'Bearer ' + _token);
});

Given(
  'I send a POST request to {string} with body:',
  async (route: string, body: string) => {
    _request = request(app.getHttpServer())
      .post(route)
      .set('Authorization', 'Bearer ' + _token)
      .send(JSON.parse(body));
    _token = (await _request).body.token;
  },
);

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be:', async (response: string) => {
  _response = await _request;
  const expectedResponse = JSON.parse(response);
  if (expectedResponse['0']) {
    expectedResponse['0']._id = _response.body['0']._id;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...actualResponse } = _response.body;
  assert.deepStrictEqual(actualResponse, expectedResponse);
});
