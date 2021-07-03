import { inject, injectable } from 'tsyringe';

import ApiError from '@shared/errors/ApiError';
import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';
import User from '../infra/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestAddUser {
  name: string;
  email: string;
  active: boolean;
  password: string;
}

interface IRequestUpdateUser {
  user_id: string;
  name: string;
  password?: string;
  old_password?: string;
  active: boolean;
  email: string;
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
      throw new ApiError('This email is used by another user');
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

  public async find(user_id: string): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new ApiError('User does not exist', 404);
    }

    return user;
  }

  public async get(): Promise<User[]> {
    const users = await this.usersRepository.findAll();

    return users;
  }

  public async remove(user_id: string): Promise<void> {
    const findUser = await this.usersRepository.findById(user_id);
    if (!findUser) {
      throw new ApiError('None user found with this id', 404);
    }

    await this.usersRepository.remove(user_id);
  }

  public async update({
    user_id,
    name,
    email,
    password,
    old_password,
    active,
  }: IRequestUpdateUser): Promise<User> {
    const findUser = await this.usersRepository.findById(user_id);
    if (!findUser) {
      throw new ApiError('User does not exist', 404);
    }

    const findUserInSameEmail = await this.usersRepository.findByEmailExceptId(
      email,
      user_id,
    );
    if (findUserInSameEmail) {
      throw new ApiError('This email is used by another user');
    }

    findUser.name = name;
    findUser.email = email;
    findUser.active = active;

    if (password && old_password) {
      if (password === old_password) {
        throw new ApiError("The new password can't same as old password");
      }

      const compareOldPassword = await this.hashProvider.compare(
        old_password,
        findUser.password,
      );
      if (!compareOldPassword) {
        throw new ApiError('The old password is not match');
      }

      const hashedNewPassword = await this.hashProvider.generate(password, 9);
      findUser.password = hashedNewPassword;
    }

    const user = await this.usersRepository.update(findUser);

    return user;
  }
}
