// // Exemplo de teste
// describe('Criar categoria', () => {
//   it('Espero que 2 + 2 seja 4', () => {
//     const soma = 2 + 2;
//     const resultado = 4;

import { AppError } from '@shared/errors/AppError';
import { CategoriesRepositoryFake } from '@modules/cars/repositories/fakes/CategoriesRepositoryFake';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

//     expect(soma).toBe(resultado);
//   });

//   it('Espero que 2 + 2 não seja 5', () => {
//     const soma = 2 + 2 + 5;
//     const resultado = 5;

//     expect(soma).not.toBe(resultado);
//   });
// });

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryFake: CategoriesRepositoryFake;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryFake = new CategoriesRepositoryFake();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryFake);
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description test',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryFake.findByName(category.name);

    console.log(categoryCreated);

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category with the same name', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description test',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    await expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      }),
    ).rejects.toEqual(new AppError('Category already exists'));
  });
});
