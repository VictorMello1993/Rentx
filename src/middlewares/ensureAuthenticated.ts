import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction): Promise<void> {
  const bearer = request.headers.authorization; // Obtendo o token do header da requisição

  if (!bearer) {
    throw new AppError('Token missing', 401);
  }

  //----------------------------------------------------------------------------------------------------------------
  // Ex: Bearer uuhiashuisaduhisadshuiadshuai
  //----------------------------------------------------------------------------------------------------------------
  const [, token] = bearer.split(' ');

  try {
    const { sub: user_id } = verify(token, '5f90046bbb4f2f7e9f2333d15fd0389b') as IPayload;
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist!', 401);
    }

    next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
}
