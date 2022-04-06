import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ForgotPasswordMailUseCase } from './ForgotPasswordMailUseCase';

class ForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordMailUseCase = container.resolve(ForgotPasswordMailUseCase);

    await sendForgotPasswordMailUseCase.execute(email);

    return response.send();
  }
}

export { ForgotPasswordMailController };
