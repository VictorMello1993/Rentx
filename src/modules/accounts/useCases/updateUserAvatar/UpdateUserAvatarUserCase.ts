import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository';

interface IRequest {
  user_id: string;
  avatar: string;
}

@injectable()
class UpdateUserAvatarUserCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, avatar }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    user.avatar = avatar;

    console.log(user.avatar);

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUserCase };
