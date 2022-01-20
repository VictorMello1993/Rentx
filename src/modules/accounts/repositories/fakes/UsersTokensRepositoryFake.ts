import { ICreateUserTokenDTO } from '@modules/accounts/DTOs/ICreateUserTokenDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';
import { IUsersTokensRepository } from '../interfaces/IUsersTokensRepository';

class UsersTokensRepositoryFake implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, { expires_date, refresh_token, user_id });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    return this.usersTokens.find(
      userTokens => userTokens.user_id === user_id && userTokens.refresh_token === refresh_token,
    );
  }

  async deleteById(id: string): Promise<void> {
    const index = this.usersTokens.findIndex(userTokens => userTokens.user_id === id);
    this.usersTokens.splice(index);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.usersTokens.find(userTokens => userTokens.refresh_token === refresh_token);
  }
}

export { UsersTokensRepositoryFake };
