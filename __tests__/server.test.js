'use strict';
require('dotenv').config();
const { server } = require('../src/server');
const supertest = require('supertest');
const mockSend = supertest(server);
const { db } = require('../src/models/index.js');

//before & after all
beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop({});
});

describe('Users with roles can sign up and users can be deleted.', () => {

  test('signup creates new admin user and sends an object with the user & token back', async () => {
    let res = await mockSend.post('/signup').send({username: "batman3000", password: "pass", role: "admin"});
    expect(res.status).toBe(201);
    expect(res.body.user.token).toBeTruthy();
  });

  test('Signup creates new non-admin user', async () => {
    let res = await mockSend.post('/signup').send({username: "batboy3000", password: "ssap", role: "customer"});
    expect(res.status).toBe(201);
    expect(res.body.user.token).toBeTruthy();
  });

  test('Signin with basic auth headers logs in user & sends a resObj back', async () => {
    let res = await mockSend.post('/signin').auth("batman3000", "pass");
    // console.log(res);
    expect(res.status).toBe(200);
    expect(res.body.user.token).toBeTruthy();
    expect(res.body.user.username).toBe('batman3000');
  });

  test('Can delete a user', async () => {
    let res = await mockSend.delete('/users').send({username: "batboy3000"});
    expect(res.status).toBe(202);
  });

});
