import { container } from 'tsyringe';
import { ICategoriesRepository } from '../../modules/cars/repositories/interfaces/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/interfaces/ISpecificationsRepository';
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationsRepository';

// Injeção de dependência de categorias - ICategoriesRepository
container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository);

// Injeção de dependência de especificações - ICategoriesRepository
container.registerSingleton<ISpecificationsRepository>('SpecificationsRepository', SpecificationsRepository);
