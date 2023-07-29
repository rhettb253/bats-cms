'use strict';
require('dotenv').config();
const { server } = require('../src/server');
const supertest = require('supertest');
const mockReq = supertest(server);
const { db, users } = require('../src/models/index.js');

//before & after all
beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop({});
});

describe('account creation and sign in works appropriately', () => {

  test('signup creates new user and sends an object with the user & token back', async () => {
    let res = await mockReq.post('/signup').send({username: "rhett", password: "1234"});
    expect(res.status).toBe(201);
    expect(res._body.user.token).toBeTruthy();
  });

  test('signin w basic auth headers logs in a user & sends a resObj back', async () => {
    let res = await mockReq.post('/signin').auth("rhett", "1234");
    // console.log(res);
    expect(res.status).toBe(200);
    expect(res._body.user.token).toBeTruthy();
    expect(res._body.user.username).toBe('rhett');
  });

});
