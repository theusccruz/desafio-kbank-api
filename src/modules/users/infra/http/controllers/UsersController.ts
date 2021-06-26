import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UsersService from '@modules/users/services/UsersService';
import Validate from '@modules/users/utils/ValidateFields/Validate';

export default class UsersController {
  public async save(request: Request, response: Response): Promise<Response> {
    const { name, email, password, active } = request.body;

    const validate = new Validate();

    validate.required(email, 'email');
    validate.email(email);

    validate.required(name, 'name');
    validate.string({
      fieldName: 'name',
      field: name,
      length: 15,
      isOnlyString: true,
    });

    validate.required(password, 'password');
    validate.string({
      fieldName: 'password',
      field: password,
      length: 6,
    });

    validate.required(active, 'active');
    validate.boolean(active, 'active');

    const usersService = container.resolve(UsersService);
    const user = await usersService.save({
      name,
      email,
      password,
      active,
    });

    return response.status(201).json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const usersService = container.resolve(UsersService);
    const user = await usersService.find(id);

    return response.json(user);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const usersService = container.resolve(UsersService);
    const users = await usersService.get();

    return response.json(users);
  }

  public async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const usersService = container.resolve(UsersService);
    await usersService.remove(id);

    return response.status(204).json();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password, password_confirmation, active, old_password } =
      request.body;

    const validate = new Validate();

    validate.required(email, 'email');
    validate.email(email);

    validate.required(name, 'name');
    validate.string({
      fieldName: 'name',
      field: name,
      length: 15,
      isOnlyString: true,
    });

    validate.string({
      fieldName: 'old_password',
      field: old_password,
      length: 6,
    });
    validate.stringRef({
      fieldName: 'password',
      field: password,
      ref: old_password,
      refFieldName: 'old_password',
      length: 6,
    });
    validate.stringRef({
      fieldName: 'password_confirmation',
      field: password_confirmation,
      ref: password,
      refFieldName: 'password',
      same: password,
    });

    validate.required(active, 'active');
    validate.boolean(active, 'active');

    const userService = container.resolve(UsersService);
    const user = await userService.update({
      user_id: id,
      name,
      email,
      password,
      old_password,
      active,
    });

    return response.json(user);
  }
}
