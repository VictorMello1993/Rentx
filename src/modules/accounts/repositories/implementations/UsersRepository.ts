import { getRepository, Repository } from 'typeorm';
import { ICreateUserDTO } from '../../DTOs/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../interfaces/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, driver_license, password, avatar }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
