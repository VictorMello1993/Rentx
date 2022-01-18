import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ForgotPasswordUseCase } from './ForgotPasswordMailUseCase';

class ForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordMailUseCase = container.resolve(ForgotPasswordUseCase);

    await sendForgotPasswordMailUseCase.execute(email);

    return response.send();
  }
}

export { ForgotPasswordMailController };
