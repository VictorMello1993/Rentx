import { Request, Response } from 'express';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private getCategoriesUseCase: ListCategoriesUseCase) {}

  handle(request: Request, response: Response): Response {
    const categories = this.getCategoriesUseCase.execute();

    return response.json(categories);
  }
}

export { ListCategoriesController };
