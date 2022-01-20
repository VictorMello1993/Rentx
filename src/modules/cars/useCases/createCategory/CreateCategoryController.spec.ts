import { app } from '@shared/infra/http/app';
import request from 'supertest';
import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

let connection: Connection;

describe('Create Category Controller', () => {
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

  it('Should be able to create a new category', async () => {
    // Logando como usuário admin
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    console.log(responseToken.body);

    const { refresh_token } = responseToken.body;

    // Cadastrando categoria
    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category Supertest desc',
      })
      .set({ Authorization: `Bearer ${refresh_token}` });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create a new category with the name exists', async () => {
    // Logando como usuário admin
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    console.log(responseToken.body);

    const { refresh_token } = responseToken.body;

    // Cadastrando categoria
    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Category Supertest desc',
      })
      .set({ Authorization: `Bearer ${refresh_token}` });

    expect(response.status).toBe(400);
  });
});
