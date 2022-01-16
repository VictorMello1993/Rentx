import { injectable, inject } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/interfaces/IUsersTokensRepository';
import auth from '@config/auth';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private UsersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: DayjsDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const passwordMatch = user ? await compare(password, user.password) : null;

    const {
      expires_in_token,
      secret_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_in_refresh_token_days,
    } = auth;

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect');
    }

    // Gerando token JWT do usuário autenticado
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    // Gerando refresh token JWT do usuário autenticado
    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(expires_in_refresh_token_days);

    await this.UsersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
