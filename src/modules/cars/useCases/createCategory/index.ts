import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { GetCategoriesController } from './GetCategoriesController';
import { GetCategoriesUseCase } from './GetCategoriesUseCase';

const categoriesRepository = new CategoriesRepository();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
const getCategoriesUseCase = new GetCategoriesUseCase(categoriesRepository);

const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
);

const getCategoriesController = new GetCategoriesController(
  getCategoriesUseCase,
);

export { createCategoryController, getCategoriesController };
