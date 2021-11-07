import { Request, Response } from 'express';
import { ImportCategoryUseCase } from './importCategoryUserCase';

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { file } = request;

      await this.importCategoryUseCase.execute(file);

      return response.send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { ImportCategoryController };
