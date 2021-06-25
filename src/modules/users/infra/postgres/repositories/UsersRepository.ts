import { Client } from 'pg';
import { v4 as uuidv4 } from 'uuid';

import IAddUserDTO from '@modules/users/dtos/IAddUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import clientDB from '@shared/infra/database/postgres';
import User from '../../entities/User';

export default class UserRepository implements IUsersRepository {
  private database: Client = clientDB;

  public async add({ active, name, email, password }: IAddUserDTO): Promise<User> {
    const id = uuidv4();
    const query =
      'INSERT INTO users(id, name, email, password, active) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [id, name, email, password, active];
    try {
      const { rows } = await this.database.query(query, values);
      const user = rows[0] as User;

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async findByEmail(email: string): Promise<User> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];

    try {
      const { rows } = await this.database.query(query, values);
      const user = rows[0] as User;

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async findById(user_id: string): Promise<User> {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [user_id];

    try {
      const { rows } = await this.database.query(query, values);
      const user = rows[0] as User;

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async findAll(): Promise<User[]> {
    const query = 'SELECT * FROM users';

    try {
      const { rows } = await this.database.query(query);
      const users = rows as User[];

      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async remove(user_id: string): Promise<void> {
    const query = 'DELETE FROM users WHERE id = $1';
    const values = [user_id];

    try {
      await this.database.query(query, values);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update({
    id,
    email,
    password,
    name,
    active,
  }: IUpdateUserDTO): Promise<User> {
    const query =
      'UPDATE users SET name = $1, email = $2, password = $3, active = $4, updated_at = DEFAULT WHERE id = $5 RETURNING *';
    const values = [name, email, password, active, id];

    try {
      const { rows } = await this.database.query(query, values);
      const user = rows[0] as User;

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
