import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository';
import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/interfaces/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository';
import { container } from 'tsyringe';

// Injeção de dependência de categorias - ICategoriesRepository
container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository);

// Injeção de dependência de especificações - ICategoriesRepository
container.registerSingleton<ISpecificationsRepository>('SpecificationsRepository', SpecificationsRepository);

// Injeção de dependência de usuários - IUsersRepository
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
