import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import ApiError from '@shared/errors/ApiError';
import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';
import authConfig from '@config/auth';
import User from '../infra/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IResponseUserToken {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(email: string, password: string): Promise<IResponseUserToken> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new ApiError('Incorrect email/password combination');
    }

    const comparePassword = await this.hashProvider.compare(password, user.password);
    if (!comparePassword) {
      throw new ApiError('Incorrect email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
