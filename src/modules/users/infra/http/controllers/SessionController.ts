import { container } from 'tsyringe';
import { Request, Response } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import Validate from '@modules/users/utils/ValidateFields/Validate';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const validate = new Validate();

    validate.required(email, 'email');
    validate.email(email);

    validate.required(password, 'password');
    validate.string({
      fieldName: 'password',
      field: password,
      length: 6,
    });

    const authenticateUser = container.resolve(AuthenticateUserService);
    const { token, user } = await authenticateUser.execute(email, password);

    return response.json({
      user,
      token,
    });
  }

  public async destroy(request: Request, response: Response): Promise<Response> {
    return response.json({
      message: 'Successfully logged out',
    });
  }
}
