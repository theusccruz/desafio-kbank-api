import { inject, injectable } from 'tsyringe';

import ServerError from '@shared/errors/ServerError';
import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';
import User from '../infra/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestAddUser {
  name: string;
  email: string;
  active: boolean;
  password: string;
}

@injectable()
export default class UsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async save({ email, name, active, password }: IRequestAddUser): Promise<User> {
    const findUserInSameEmail = await this.usersRepository.findByEmail(email);
    if (findUserInSameEmail) {
      throw new ServerError('This email is used by another user');
    }

    const hashedPassword = await this.hashProvider.generate(password, 9);

    const user = await this.usersRepository.add({
      name,
      email,
      password: hashedPassword,
      active,
    });

    return user;
  }
}
