import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvatarUserCase } from './UpdateUserAvatarUserCase';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    // Receber arquivo do avatar aqui
    const avatar = null;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUserCase);

    await updateUserAvatarUseCase.execute({ user_id: id, avatar });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
