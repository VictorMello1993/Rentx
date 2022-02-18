import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/container/providers/StorageProvider/IStorageProvider';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUserCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      // excluindo o arquivo na pasta avatar pelo provider
      await this.storageProvider.delete(user.avatar, 'avatar');
    }

    // Salvando um novo arquivo na pasta avatar pelo provider
    await this.storageProvider.save(avatar_file, 'avatar');

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUserCase };
