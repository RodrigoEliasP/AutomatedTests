import request from 'supertest';
import { setupApp, app } from '../app';
import { shutupConsole } from './helpers';

beforeAll(async () => {
  shutupConsole();
  await setupApp();
});

describe('Testing the root path', () => {
  test('It should welcome the user', async () => {
     
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Welcome newcomer, nice to meet you');
  })
})