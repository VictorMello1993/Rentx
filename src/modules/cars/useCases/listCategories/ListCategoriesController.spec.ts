import { app } from '@shared/infra/http/app';
import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import createConnection from '@shared/infra/typeorm';
import { v4 as uuid } from 'uuid';

let connection: Connection;

describe('List categories', () => {
  // Para que o teste passe, é preciso primeiro criar um usuário administrador
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('admin', 8);

    await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
                          VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'AAAAA')`);
  });

  /* Depois de rodar todos os testes, a base de testes será dropada, pois a base só será utilizada uma vez
     durante os testes */
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should de able to list all categories', async () => {
    // Logando como usuário admin
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    console.log(responseToken.body);

    const { token } = responseToken.body;

    // Cadastrando categoria
    await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category Supertest desc',
      })
      .set({ Authorization: `Bearer ${token}` });

    // Listando categoria
    const response = await request(app).get('/categories');

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].name).toEqual('Category supertest');
  });
});
