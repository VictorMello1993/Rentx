import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/interfaces/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import { resolve } from 'path';

@injectable()
class ForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs');

    if (!user) {
      throw new AppError('User does not exist');
    }

    const token = uuidv4();

    // Link será expirado em 3 horas
    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(email, 'Recuperação de senha', variables, templatePath);
  }
}

export { ForgotPasswordMailUseCase };
