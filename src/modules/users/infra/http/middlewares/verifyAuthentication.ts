import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import ApiError from '@shared/errors/ApiError';

interface ITokenDecoded {
  iat: number;
  exp: number;
  sub: string;
}

export default function verifyAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new ApiError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');
  const { secret } = authConfig.jwt;

  try {
    const decoded = verify(token, secret);
    const { sub } = decoded as ITokenDecoded;

    request.user = {
      id: sub,
    };

    next();
  } catch (error) {
    throw new ApiError('Invalid JWT token', 401);
  }
}
