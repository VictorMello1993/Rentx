import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';
import { ICreateUserDTO } from '../../DTOs/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository';
import { AppError } from '../../../../errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password, driver_license, avatar }: ICreateUserDTO): Promise<void> {
    // Criptografando a senha
    const passwordHashed = await hash(password, 8);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists!');
    }

    await this.usersRepository.create({
      name,
      email,
      password: passwordHashed,
      driver_license,
      avatar,
    });
  }
}

export { CreateUserUseCase };
