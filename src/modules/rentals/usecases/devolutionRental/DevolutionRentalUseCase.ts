import { ICarsRepository } from '@modules/cars/repositories/interfaces/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/interfaces/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(id);

    const minimum_daily = 1;

    if (!rental) {
      throw new AppError('Rental does not exist!');
    }

    const dateNow = this.dateProvider.dateNow();

    // Cálculo da diária (em dias)
    let daily = this.dateProvider.compareInDays(rental.start_date, this.dateProvider.dateNow());

    if (daily <= 0) {
      daily = minimum_daily;
    }

    // Dias de atraso
    const delay = this.dateProvider.compareInDays(dateNow, rental.expected_return_date);

    let total = 0;

    // Cálculo da multa proporcional ao número de dias de atraso
    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    // Cobrando a diária do carro proporcional aos dias que se passaram
    // Total = diárias + multa
    total += daily * car.daily_date;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
