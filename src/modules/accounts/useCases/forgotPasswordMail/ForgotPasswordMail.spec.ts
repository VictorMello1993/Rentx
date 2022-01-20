import { UsersRepositoryFake } from '@modules/accounts/repositories/fakes/UsersRepositoryFake';
import { UsersTokensRepositoryFake } from '@modules/accounts/repositories/fakes/UsersTokensRepositoryFake';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderFake } from '@shared/container/providers/MailProvider/fakes/MailProviderFake';
import { AppError } from '@shared/errors/AppError';
import { ForgotPasswordUseCase } from './ForgotPasswordMailUseCase';

let forgotPasswordUseCase: ForgotPasswordUseCase;
let usersRepositoryFake: UsersRepositoryFake;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryFake: UsersTokensRepositoryFake;
let mailProviderFake: MailProviderFake;

describe('Send forgot mail', () => {
  beforeEach(() => {
    usersRepositoryFake = new UsersRepositoryFake();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryFake = new UsersTokensRepositoryFake();
    mailProviderFake = new MailProviderFake();

    forgotPasswordUseCase = new ForgotPasswordUseCase(
      usersRepositoryFake,
      usersTokensRepositoryFake,
      dateProvider,
      mailProviderFake,
    );
  });

  it('Should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProviderFake, 'sendMail');

    await usersRepositoryFake.create({
      driver_license: '664168',
      email: 'test@test.com',
      name: 'User name test',
      password: '1234',
    });

    await forgotPasswordUseCase.execute('test@test.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to send a forgot password mail to a non exist user', async () => {
    await expect(forgotPasswordUseCase.execute('blabla@test.com')).rejects.toEqual(new AppError('User does not exist'));
  });

  it('Should be able to create a an user token', async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryFake, 'create');

    await usersRepositoryFake.create({
      driver_license: '777888',
      email: 'user2@test.com',
      name: 'User2 name test',
      password: '1234',
    });

    await forgotPasswordUseCase.execute('user2@test.com');

    expect(generateTokenMail).toBeCalled();
  });
});
