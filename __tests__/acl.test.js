'use strict';
require('dotenv').config();
const { server } = require('../src/server');
const supertest = require('supertest');
const mockReq = supertest(server);
const { db, users } = require('../src/models/index.js');

//define role to test
let membershipCustomer;
let admin;

//before & after all
beforeAll(async () => {
  await db.sync();
  membershipCustomer = await users.create({
    username: 'membershipCustomer',
    password: '1234',
    role: 'membershipCustomer'
  });
  admin = await users.create({
    username: 'admin',
    password: '2345',
    role: 'admin'
  });
});

afterAll(async () => {
  await db.drop({});
  //   await db.close();
});

describe('ACL Integration', () => {

  test('the user with membershipCustomer capabilities should be able to create a model', async () => {
    let res = await mockReq
      .post('/bats')
      .send({ name: 'knockout', material: 'alluminum', style: 'training', stock: 40, price: 70})
      .set('Authorization', `Bearer ${membershipCustomer.token}`);
    expect(res.status).toBe(201);
    expect(res.body.name).toEqual('knockout');
    expect(res.body.id).toEqual(1);
  });

  test('the user should be able to get a resource', async () => {
    let res = await mockReq
      .get('/bats/1')
      .set('Authorization', `Bearer ${membershipCustomer.token}`);
    expect(res.status).toBe(200);
    // expect(res.text).toEqual('Welcome to the secret area');
  });

  // test('the user with membershipCustomer capabilities should NOT be able to update a model', async () => {
  //   let res = await mockReq
  //     .put('/api/v2/food/2')
  //     .send({ name: 'coconut', calories: 200, type: 'fruit' })
  //     .set('Authorization', `Bearer ${membershipCustomer.token}`);
  //   expect(res.status).toBe(500);
  //   expect(res.body.message).toEqual('Access Denied');
  // });

  // test('the user with admin capabilities should be able to update a model', async () => {
  //   let res = await mockReq
  //     .put('/api/v2/food/1')
  //     .send({ name: 'coconut', calories: 200, type: 'fruit' })
  //     .set('Authorization', `Bearer ${admin.token}`);
  //   expect(res.status).toBe(200);
  //   expect(res.body.name).toEqual('coconut');
  // });

  // test('the user with admin capabilities should be able to delete a model', async () => {
  //   let res = await mockReq
  //     .delete('/api/v2/food/1')
  //     .set('Authorization', `Bearer ${admin.token}`);
  //   expect(res.status).toBe(200);
  // });

});
