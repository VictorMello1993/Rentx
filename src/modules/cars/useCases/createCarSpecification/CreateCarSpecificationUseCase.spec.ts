import { CarsRepositoryFake } from '@modules/cars/repositories/fakes/CarsRepositoryFake';
import { SpecificationsRepositoryFake } from '@modules/cars/repositories/fakes/SpecificationsRepositoryFake';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryFake: CarsRepositoryFake;
let specificationsRepositoryFake: SpecificationsRepositoryFake;

describe('Create car specification', () => {
  beforeEach(() => {
    carsRepositoryFake = new CarsRepositoryFake();
    specificationsRepositoryFake = new SpecificationsRepositoryFake();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryFake, specificationsRepositoryFake);
  });

  it('It should be able to create add a new specification to the car', async () => {
    const car = await carsRepositoryFake.create({
      name: 'Name car',
      description: 'Description car',
      daily_date: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const specification = await specificationsRepositoryFake.create({
      description: 'description test',
      name: 'name test',
    });

    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    console.log(specificationsCars);

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBeGreaterThan(0);
  });

  it('It should not be able to create add a new specification to a non-existent car', async () => {
    const car_id = '1234';
    const specifications_id = ['54321'];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      }),
    ).rejects.toEqual(new AppError('Car does not exist!'));
  });
});
