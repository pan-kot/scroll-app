/* tslint:disable no-implicit-dependencies */

import request from 'supertest';
import express from 'express';

import advisors from '../advisors';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/advisors', advisors);

describe('advisors route', () => {
  test('index endpoint works when no query provided', (done) => {
    request(app)
      .get('/advisors')
      .expect('Content-Type', /json/)
      .field('total', 100)
      .expect(200, done);
  });

  test('index endpoint works when a valid sort query provided', (done) => {
    request(app)
      .get('/advisors?sort=feedback.reviews,asc')
      .expect('Content-Type', /json/)
      .field('total', 100)
      .expect(200, done);
  });

  test('index endpoint fails when trying to provide multiple sorts', (done) => {
    request(app)
      .get('/advisors?sort=feedback.reviews,asc&sort=feedback.reviews,desc')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  test('index endpoint fails when trying to sort for an unsupported field', (done) => {
    request(app)
      .get('/advisors?sort=name,asc')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  test('index endpoint works when a valid language filter query provided', (done) => {
    request(app)
      .get('/advisors?language=DE')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  test('index endpoint fails when trying to use multiple language filters', (done) => {
    request(app)
      .get('/advisors?language=DE&language=EN')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  test('index endpoint works when a valid is-online filter query provided', (done) => {
    request(app)
      .get('/advisors?isOnline')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
