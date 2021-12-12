import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/interfaces/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository';
import { container } from 'tsyringe';

// Injeção de dependência de categorias - ICategoriesRepository
container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository);

// Injeção de dependência de especificações - ICategoriesRepository
container.registerSingleton<ISpecificationsRepository>('SpecificationsRepository', SpecificationsRepository);

// Injeção de dependência de usuários - IUsersRepository
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

// Injeção de dependência de carros - ICarsRepository
container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
