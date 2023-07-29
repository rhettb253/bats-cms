'use strict';
require('dotenv').config();
const { server } = require('../src/server');
const supertest = require('supertest');
const mockReq = supertest(server);
const { db, users } = require('../src/models/index.js');

//define role to test
let testWriter;
let testAdmin;

//before & after all
beforeAll(async () => {
  await db.sync();
  testWriter = await users.create({
    username: 'Writer',
    password: '1234',
    role: 'writer'
  });
  testAdmin = await users.create({
    username: 'Admin',
    password: '2345',
    role: 'admin'
  });
});

afterAll(async () => {
  await db.drop({});
  //   await db.close();
});

describe('ACL Integration', () => {

  test('the user should be able to get a resource', async () => {
    let res = await mockReq
      .get('/secret')
      .set('Authorization', `Bearer ${testWriter.token}`);
    expect(res.status).toBe(200);
    expect(res.text).toEqual('Welcome to the secret area');
  });

  test('the user with writer capabilities should be able to create a model', async () => {
    let res = await mockReq
      .post('/api/v2/food')
      .send({ name: 'banana', calories: 100, type: 'fruit' })
      .set('Authorization', `Bearer ${testWriter.token}`);
    expect(res.status).toBe(201);
    expect(res.body.name).toEqual('banana');
    expect(res.body.id).toEqual(1);
  });

  test('the user with writer capabilities should NOT be able to update a model', async () => {
    let res = await mockReq
      .put('/api/v2/food/2')
      .send({ name: 'coconut', calories: 200, type: 'fruit' })
      .set('Authorization', `Bearer ${testWriter.token}`);
    expect(res.status).toBe(500);
    expect(res.body.message).toEqual('Access Denied');
  });

  test('the user with admin capabilities should be able to update a model', async () => {
    let res = await mockReq
      .put('/api/v2/food/1')
      .send({ name: 'coconut', calories: 200, type: 'fruit' })
      .set('Authorization', `Bearer ${testAdmin.token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toEqual('coconut');
  });

  test('the user with admin capabilities should be able to delete a model', async () => {
    let res = await mockReq
      .delete('/api/v2/food/1')
      .set('Authorization', `Bearer ${testAdmin.token}`);
    expect(res.status).toBe(200);
  });

});
