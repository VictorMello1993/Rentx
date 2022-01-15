import dayjs from 'dayjs';
import { RentalsRepositoryFake } from '@modules/rentals/repositories/fakes/RentalsRepositoryFake';
import { AppError } from '@shared/errors/AppError';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CarsRepositoryFake } from '@modules/cars/repositories/fakes/CarsRepositoryFake';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryFake: RentalsRepositoryFake;
let dayJsProvider: DayjsDateProvider;
let carsRepositoryFake: CarsRepositoryFake;

describe('Create rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    carsRepositoryFake = new CarsRepositoryFake();
    rentalsRepositoryFake = new RentalsRepositoryFake();
    dayJsProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryFake, dayJsProvider, carsRepositoryFake);
  });

  it('Should be able to create a new rental', async () => {
    const car = await carsRepositoryFake.create({
      name: 'Test',
      description: 'Car Test',
      daily_date: 100,
      license_plate: 'test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand',
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
    await rentalsRepositoryFake.create({
      car_id: '1111',
      expected_return_date: dayAdd24Hours,
      user_id: '12345',
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '12345',
        car_id: '44444',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  it("It should not be able to create a new rental if there's another open to the same car", async () => {
    await rentalsRepositoryFake.create({
      car_id: '99999',
      expected_return_date: dayAdd24Hours,
      user_id: '12345',
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '54321',
        car_id: '99999',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });

  it('It should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '123',
        car_id: '111144',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(new AppError('Invalid return time'));
  });
});
