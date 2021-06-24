import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UsersService from '@modules/users/services/UsersService';

export default class UsersController {
  public async save(request: Request, response: Response): Promise<Response> {
    const { name, email, password, active } = request.body;

    const usersService = container.resolve(UsersService);
    const user = await usersService.save({
      name,
      email,
      password,
      active,
    });

    return response.status(201).json(classToClass(user));
  }
}
