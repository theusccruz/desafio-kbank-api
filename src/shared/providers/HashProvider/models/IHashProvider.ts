export default interface IHashProvider {
  generate(text: string, salt: number): Promise<string>;
  compare(text: string, hashed: string): Promise<boolean>;
}
