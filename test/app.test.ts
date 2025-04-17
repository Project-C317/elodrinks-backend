import request from 'supertest';
import { App } from '../src/app';

describe('Rota inicial da API - GET /', () => {
  let appInstance: App;

  beforeAll(() => {
    appInstance = new App(3000);
  });

  it('Teste: deve retornar status 200 e uma mensagem de sucesso', async () => {
    const response = await request(appInstance.app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Servidor está rodando');
    expect(response.body).toHaveProperty('timestamp');
  });
});
