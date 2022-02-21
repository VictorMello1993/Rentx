import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IUserResponseDTO } from '../../DTOs/IUserResponseDTO';
import { User } from '../../infra/typeorm/entities/User';
import { UserMap } from '../../mappers/UserMap';
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository';

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const userDTO = UserMap.toDTO(user);

    return userDTO;
  }
}

export { ProfileUserUseCase };
