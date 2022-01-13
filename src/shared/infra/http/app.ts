import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swagger from 'swagger-ui-express';
import createConnection from '@shared/infra/typeorm';
import '@shared/container';
import { AppError } from '@shared/errors/AppError';
import { router } from './routes';
import swaggerFile from '../../../swagger.json';

createConnection('database_rentx');

const app = express();

app.use(express.json());
app.use(router);

// Documentação do Swagger
app.use('/api-docs', swagger.serve, swagger.setup(swaggerFile));

// Middleware de erro
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({ status: 'error', message: `Interval server error - ${error.message}` });
});

export { app };
