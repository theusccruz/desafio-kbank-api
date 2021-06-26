import { hash, compare } from 'bcryptjs';

import IHashProvider from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async generate(text: string, salt: number): Promise<string> {
    const hashed = await hash(text, salt);

    return hashed;
  }

  public async compare(text: string, hashed: string): Promise<boolean> {
    const verifyHash = await compare(text, hashed);

    return verifyHash;
  }
}
