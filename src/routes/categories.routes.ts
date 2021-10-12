import { Router } from 'express';
import {
  createCategoryController,
  getCategoriesController,
} from '../modules/cars/useCases/createCategory';

const categoriesRoutes = Router();

categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
  return getCategoriesController.handle(request, response);
});

export { categoriesRoutes };
