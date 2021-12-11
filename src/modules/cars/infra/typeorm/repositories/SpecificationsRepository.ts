import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository';
import { getRepository, Repository } from 'typeorm';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }

  async findByName(name: string): Promise<Specification> {
    // SELECT * FROM specifications WHERE name = :name
    const specification = await this.repository.findOne({ name });

    return specification;
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ description, name });
    await this.repository.save(specification);
  }
}

export { SpecificationsRepository };
