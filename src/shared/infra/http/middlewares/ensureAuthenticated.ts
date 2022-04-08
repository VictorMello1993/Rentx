import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '@config/auth';

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
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    /* Aqui é preciso sobrescrever a tipagem da biblioteca do Express para declarar a propriedade user que não 
    existe no Request da biblioteca do Express original. */
    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
}
