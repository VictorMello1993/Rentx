import { Request, Response } from 'express';
import { GetCategoriesUseCase } from './GetCategoriesUseCase';

class GetCategoriesController {
  constructor(private getCategoriesUseCase: GetCategoriesUseCase) {}

  handle(request: Request, response: Response): Response {
    const categories = this.getCategoriesUseCase.execute();

    return response.status(200).send(categories);
  }
}

export { GetCategoriesController };
