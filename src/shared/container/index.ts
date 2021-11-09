import { container } from 'tsyringe';
import { ICategoriesRepository } from '../../modules/cars/repositories/interfaces/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/interfaces/ISpecificationsRepository';
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationsRepository';
import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/interfaces/IUsersRepository';

// Injeção de dependência de categorias - ICategoriesRepository
container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository);

// Injeção de dependência de especificações - ICategoriesRepository
container.registerSingleton<ISpecificationsRepository>('SpecificationsRepository', SpecificationsRepository);

// Injeção de dependência de usuários - IUsersRepository
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
