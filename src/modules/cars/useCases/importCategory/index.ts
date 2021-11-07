import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCategoryController } from './importCategoryController';
import { ImportCategoryUseCase } from './importCategoryUserCase';

export default (): ImportCategoryController => {
  const categoriesRepository = new CategoriesRepository();
  const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
  const importCategoryController = new ImportCategoryController(importCategoryUseCase);

  return importCategoryController;
};
