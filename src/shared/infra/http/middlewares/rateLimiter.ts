import * as redis from 'redis';
import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { AppError } from '../../../errors/AppError';

const redisClient = redis.createClient({
  legacyMode: true,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 10, // 10 requisições
  duration: 5, // Em 5 segundos
});

export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    await redisClient.connect();
    await limiter.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppError('Too many requests', 429);
  } finally {
    await redisClient.disconnect();
  }
}
