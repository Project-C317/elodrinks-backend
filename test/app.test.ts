import request from 'supertest';
import { App } from '../src/app';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

describe('Rota inicial da API - GET /', () => {
  let appInstance: App;
  let tokenInvalidRole: string;
  let tokenExpired: string;

  beforeAll(() => {
    appInstance = new App(3000);

    tokenInvalidRole = jwt.sign({ id: '3', role: 'guest' }, SECRET_KEY, { expiresIn: '1h' });
    tokenExpired = jwt.sign({ id: '4', role: 'user' }, SECRET_KEY, { expiresIn: '-1h' });
  });

  // Teste da rota inicial
  it('Teste: deve retornar status 200 e uma mensagem de sucesso', async () => {
    const response = await request(appInstance.app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Servidor está rodando');
    expect(response.body).toHaveProperty('timestamp');
  });

  // Teste de rota inexistente
  it('GET /rota-inexistente - Deve retornar 404', async () => {
    const response = await request(appInstance.app).get('/rota-inexistente');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Rota não encontrada',
    });
  });

  // Teste de permissões CORS
  it('CORS - Deve permitir origem permitida', async () => {
    const response = await request(appInstance.app)
      .get('/')
      .set('Origin', 'http://localhost:5173');

    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:5173');
  });

  // Teste da rota de documentação Swagger
  it('Swagger - Deve responder na rota /api-docs', async () => {
    const response = await request(appInstance.app).get('/api-docs');

    expect([301]).toContain(response.status); 
  });

  // Teste de autenticação e autorização na rota /users
  it('GET /users - Sem autenticação deve retornar 401', async () => {
    const response = await request(appInstance.app).get('/users');
    expect(response.status).toBe(401);
  });

  it('GET /users - Com token expirado deve retornar 403', async () => {
    const response = await request(appInstance.app).get('/users')
      .set('Authorization', `Bearer ${tokenExpired}`);
    expect(response.status).toBe(403);
  });
  
  it('GET /users - Com autenticação e role inválida deve retornar 403', async () => {
    const response = await request(appInstance.app).get('/users')
      .set('Authorization', `Bearer ${tokenInvalidRole}`);
    expect(response.status).toBe(403);
  });
  
  // Teste de autenticação e autorização na rota /services
  it('GET /services - Sem autenticação deve retornar 401', async () => {
    const response = await request(appInstance.app).get('/services');
    expect(response.status).toBe(401);
  });

  it('GET /services - Com token expirado deve retornar 403', async () => {
    const response = await request(appInstance.app).get('/services')
      .set('Authorization', `Bearer ${tokenExpired}`);
    expect(response.status).toBe(403);
  });

  it('GET /services - Com autenticação e role inválida deve retornar 403', async () => {
    const response = await request(appInstance.app).get('/services')
      .set('Authorization', `Bearer ${tokenInvalidRole}`);
    expect(response.status).toBe(403);
  });

  // Teste de autenticação e autorização na rota /optional-items
  it('GET /optional-items - Sem autenticação deve retornar 401', async () => {
    const response = await request(appInstance.app).get('/optional-items');
    expect(response.status).toBe(401);
  });

  it('GET /optional-items - Com token expirado deve retornar 403', async () => {
    const response = await request(appInstance.app).get('/optional-items')
      .set('Authorization', `Bearer ${tokenExpired}`);
    expect(response.status).toBe(403);
  });

  it('GET /optional-items - Com autenticação e role inválida deve retornar 403', async () => {
    const response = await request(appInstance.app).get('/optional-items')
      .set('Authorization', `Bearer ${tokenInvalidRole}`);
    expect(response.status).toBe(403);
  });
});