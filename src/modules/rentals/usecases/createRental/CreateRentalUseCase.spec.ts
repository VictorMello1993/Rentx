import dayjs from 'dayjs';
import { RentalsRepositoryFake } from '@modules/rentals/repositories/fakes/RentalsRepositoryFake';
import { AppError } from '@shared/errors/AppError';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CarsRepositoryFake } from '@modules/cars/repositories/fakes/CarsRepositoryFake';
import { CreateCarUseCase } from '@modules/cars/useCases/createCar/CreateCarUseCase';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryFake: RentalsRepositoryFake;
let dayJsProvider: DayjsDateProvider;
let carsRepositoryFake: CarsRepositoryFake;
let createCarUseCase: CreateCarUseCase;

describe('Create rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryFake = new RentalsRepositoryFake();
    carsRepositoryFake = new CarsRepositoryFake();
    dayJsProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryFake, dayJsProvider, carsRepositoryFake);
    createCarUseCase = new CreateCarUseCase(carsRepositoryFake);
  });

  it('Should be able to create a new rental', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car1',
      description: 'Car test',
      daily_date: 350,
      license_plate: 'AAA-756',
      fine_amount: 200,
      brand: 'Brand',
      category_id: 'blabla',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it("It should not be able to create a new rental if there's another open to the same user", async () => {
    expect(async () => {
      const car = await createCarUseCase.execute({
        name: 'Car1',
        description: 'Car test',
        daily_date: 350,
        license_plate: 'AAA-756',
        fine_amount: 200,
        brand: 'Brand',
        category_id: 'blabla',
      });

      await createRentalUseCase.execute({
        user_id: '123',
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '123',
        car_id: 'aaaaa',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("It should not be able to create a new rental if there's another open to the same car", async () => {
    expect(async () => {
      const car = await createCarUseCase.execute({
        name: 'Car1',
        description: 'Car test',
        daily_date: 350,
        license_plate: 'AAA-756',
        fine_amount: 200,
        brand: 'Brand',
        category_id: 'blabla',
      });

      await createRentalUseCase.execute({
        user_id: '123',
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: '321',
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('It should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      const car = await createCarUseCase.execute({
        name: 'Car1',
        description: 'Car test',
        daily_date: 350,
        license_plate: 'AAA-756',
        fine_amount: 200,
        brand: 'Brand',
        category_id: 'blabla',
      });

      await createRentalUseCase.execute({
        user_id: '123',
        car_id: car.id,
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
