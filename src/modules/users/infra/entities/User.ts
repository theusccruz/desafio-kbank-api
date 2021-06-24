import { Exclude } from 'class-transformer';

export default class User {
  id: string;

  name: string;

  email: string;

  @Exclude()
  password: string;

  active: boolean;

  created_at?: Date;

  updated_at?: Date;
}
