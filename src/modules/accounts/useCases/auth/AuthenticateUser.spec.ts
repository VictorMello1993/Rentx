import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/DTOs/ICreateUserDTO';
import { UsersRepositoryFake } from '@modules/accounts/repositories/fakes/UsersRepositoryFake';
import { UsersTokensRepositoryFake } from '@modules/accounts/repositories/fakes/UsersTokensRepositoryFake';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryFake: UsersRepositoryFake;
let userTokensRepositoryFake: UsersTokensRepositoryFake;
let dateProvider: DayjsDateProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryFake = new UsersRepositoryFake();
    userTokensRepositoryFake = new UsersTokensRepositoryFake();
    dateProvider = new DayjsDateProvider();
    createUserUseCase = new CreateUserUseCase(usersRepositoryFake);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryFake, userTokensRepositoryFake, dateProvider);
  });

  it('It should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'user@test.com',
      password: '1234',
      name: 'User Test',
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');

    console.log(result);
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '999',
      email: 'user@user.com',
      password: '1234',
      name: 'User Test Error',
    };
    await createUserUseCase.execute(user);

    await expect(authenticateUserUseCase.execute({ email: user.email, password: 'IncorrectPassword' })).rejects.toEqual(
      new AppError('Email or password incorrect'),
    );
  });
});
