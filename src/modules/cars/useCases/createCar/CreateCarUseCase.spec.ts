import { CarsRepositoryFake } from '@modules/cars/repositories/fakes/CarsRepositoryFake';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryFake: CarsRepositoryFake;

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryFake = new CarsRepositoryFake();
    createCarUseCase = new CreateCarUseCase(carsRepositoryFake);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description car',
      daily_date: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'Car1',
      description: 'Description car',
      daily_date: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    await expect(
      createCarUseCase.execute({
        name: 'Car2',
        description: 'Description car',
        daily_date: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      }),
    ).rejects.toEqual(new AppError('Car already exists'));
  });

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car available',
      description: 'Description car',
      daily_date: 100,
      license_plate: 'ABCD-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    console.log(car);

    expect(car.available).toBe(true);
  });
});
