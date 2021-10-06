import { Router } from 'express';
import Category from '../models/Category';

const categoriesRoutes = Router();
const categories = [];

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const category = new Category();

  /* Em vez de atribuir os valores para as propriedade de uma classe linha a linha,
  utiliza-se Object.assign() para passar a instância de uma classe, e os valores que serão atribuídos a ela */
  Object.assign(category, { name, description, created_at: new Date() });

  categories.push(category);

  return response.status(201).json({ category });
});

export default categoriesRoutes;
