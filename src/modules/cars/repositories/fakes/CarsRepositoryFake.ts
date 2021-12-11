import { ICreateCarDTO } from '@modules/cars/DTOs/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '../interfaces/ICarsRepository';

class CarsRepositoryFake implements ICarsRepository {
  cars: Car[] = [];
  async create({
    name,
    description,
    daily_date,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_date,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }
}

export { CarsRepositoryFake };
