import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, driver_license, password, avatar } = request.body;

    // Injetando a dependĂȘncia na classe CreateUserUseCase
    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({ name, email, driver_license, password, avatar });

    return response.status(201).send();
  }
}

export { CreateUserController };
