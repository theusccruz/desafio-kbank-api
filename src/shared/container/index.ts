import { container } from 'tsyringe';

import '../providers/HashProvider';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/postgres/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UserRepository);
