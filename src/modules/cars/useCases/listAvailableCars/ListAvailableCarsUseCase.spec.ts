import { CarsRepositoryFake } from '@modules/cars/repositories/fakes/CarsRepositoryFake';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryFake: CarsRepositoryFake;

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryFake = new CarsRepositoryFake();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryFake);
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryFake.create({
      name: 'Car1',
      description: 'Car1 desc',
      daily_date: 250,
      license_plate: 'BBB-456',
      fine_amount: 300,
      brand: 'Car1 brand',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({});

    console.log(cars);

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryFake.create({
      name: 'Car2',
      description: 'Car2 desc',
      daily_date: 250,
      license_plate: 'CCC-456',
      fine_amount: 150,
      brand: 'Car2 brand test',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({ brand: 'Car_brand_test' });
    console.log(cars);

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryFake.create({
      name: 'Car3',
      description: 'Car3 desc',
      daily_date: 250,
      license_plate: 'CCC-456',
      fine_amount: 150,
      brand: 'Car3 name test',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({ name: 'Car3' });
    console.log(cars);

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by category', async () => {
    const car = await carsRepositoryFake.create({
      name: 'Car3',
      description: 'Car3 desc',
      daily_date: 250,
      license_plate: 'CCC-456',
      fine_amount: 150,
      brand: 'Car3 name test',
      category_id: '12345',
    });

    const cars = await listCarsUseCase.execute({ category_id: '12345' });
    console.log(cars);

    expect(cars).toEqual([car]);
  });
});
