import IAddUserDTO from '../dtos/IAddUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import User from '../infra/entities/User';

export default interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(user_id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  add({ name, email, password, active }: IAddUserDTO): Promise<User>;
  update({ id, name, password, active, email }: IUpdateUserDTO): Promise<User>;
  remove(user_id: string): Promise<void>;
}
