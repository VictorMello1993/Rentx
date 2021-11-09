import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ImportCategoryUseCase } from './importCategoryUserCase';

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { file } = request;

      // Injetando a dependência na classe ImportCategoryUseCase
      const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

      importCategoryUseCase.execute(file);

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { ImportCategoryController };