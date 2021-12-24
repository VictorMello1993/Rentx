import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository';
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICarsImagesRepository } from '@modules/cars/repositories/interfaces/ICarsImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/interfaces/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/interfaces/IRentalsRepository';
import { container } from 'tsyringe';
import '@shared/container/providers';

// Injeção de dependência de categorias - ICategoriesRepository
container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository);

// Injeção de dependência de especificações - ICategoriesRepository
container.registerSingleton<ISpecificationsRepository>('SpecificationsRepository', SpecificationsRepository);

// Injeção de dependência de usuários - IUsersRepository
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

// Injeção de dependência de carros - ICarsRepository
container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

// Injeção de dependência de upload de imagens de carros - ICarsImagesRepository
container.registerSingleton<ICarsImagesRepository>('CarsImagesRepository', CarsImagesRepository);

// Injeção de dependência de alugueis - IRentalsRepository
container.registerSingleton<IRentalsRepository>('RentalsRepository', RentalsRepository);
