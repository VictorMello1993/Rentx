import { ICreateUserTokenDTO } from '@modules/accounts/DTOs/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/interfaces/IUsersTokensRepository';
import { getRepository, Repository } from 'typeorm';
import { UserTokens } from '../entities/UserTokens';
import { UsersRepository } from './UsersRepository';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({ expires_date, refresh_token, user_id });

    await this.repository.save(userToken);

    return userToken;
  }
}

export { UsersTokensRepository };
