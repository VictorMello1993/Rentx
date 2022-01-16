import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/interfaces/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { verify, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(refresh_token: string): Promise<string> {
    // Decodificando o refresh token
    const { email, sub } = verify(refresh_token, auth.secret_refresh_token) as IPayload;

    const user_id = sub;

    const userRefreshToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, refresh_token);

    if (!userRefreshToken) {
      throw new AppError('Refresh token does not exist!');
    }

    /* Excluindo refresh token para evitar que fiquem com muitos registros no banco de dados,
       pois após as validações serão gerados novos refresh tokens baseados na informação do 
       subject (id) do usuário existente */
    await this.usersTokensRepository.deleteById(userRefreshToken.id);

    const new_refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(auth.expires_in_refresh_token_days);

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token: new_refresh_token,
      user_id,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
