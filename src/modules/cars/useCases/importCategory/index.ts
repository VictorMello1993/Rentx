import { ImportCategoryController } from './importCategoryController';
import { ImportCategoryUseCase } from './importCategoryUserCase';

const importCategoryUseCase = new ImportCategoryUseCase();
const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export { importCategoryController };
