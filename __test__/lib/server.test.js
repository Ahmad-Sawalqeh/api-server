/* eslint-disable strict */
'use strict';

const { server } = require('../../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('web server', () => {
  it('route /testerror with respons status(500)', () => {
    return mockRequest
      .get('/testerror')
      .then(results =>{
        expect(results.status).toBe(500);
      });
    // .catch(console.error);
  });

  it('get request to /api/v1/products', () => {
    return mockRequest
      .get('/api/v1/products')
      .then(results => {
        // expect(typeof results.body.results).toBe('object');
        expect(results.status).toBe(200);
      });
    // .catch(console.error);
  });

  it('not found route with respons status(404)', () => {
    return mockRequest
      .get('/no-such-route')
      .then(results =>{
        expect(results.status).toBe(404);
      });
    // .catch(console.error);
  });

  it('post request to /api/v1/products', () => {
    return mockRequest
      .post('/api/v1/products')
      .send({ name: 'test name' })
      .then(results => {
        expect(results.body.name).toEqual('test name');
        expect(results.status).toBe(201);
        expect(results.body).toBeDefined();
      });
    // .catch(console.error);
  });

  it('get request to /api/v1/categories', () => {
    return mockRequest
      .get('/api/v1/categories')
      .then(results => {
        // expect(typeof results.body.results).toBe('object');
        expect(results.status).toBe(200);
      });
    // .catch(console.error);
  });

  it('post request to /api/v1/categories', () => {
    return mockRequest
      .post('/api/v1/categories')
      .send({ name: 'test name', description: 'engineer' })
      .then(results => {
        expect(results.body.name).toEqual('test name');
        expect(results.status).toBe(201);
        expect(results.body).toBeDefined();
      });
    // .catch(console.error);
  });

  it('put request to /api/v1/categories/1', () => {
    return mockRequest
      .put('/api/v1/categories/1')
      .send({ name: 'test put route' })
      .then(results => {
        expect(results.status).toBe(200 || 201);
        // expect(results.body.name).toBe('test put route');
      });
    // .catch(console.error);
  });

  it('delete request to /api/v1/categories/1', () => {
    return mockRequest
      .delete('/api/v1/categories/1')
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.msg).toBe('catogery deleted');
      });
    // .catch(console.error);
  });

});
