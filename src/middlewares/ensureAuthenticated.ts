import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const bearer = request.headers.authorization; // Obtendo o token do header da requisição

  if (!bearer) {
    throw new Error('Token missing');
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
      throw new Error('User does not exist!');
    }

    next();
  } catch (error) {
    throw new Error('Invalid token!');
  }
}
