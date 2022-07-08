import * as bcrypt from 'bcrypt';

export class PasswordService {
  private saltRounds = 10;

  async encode(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.saltRounds);

    return hash;
  }

  async compare(
    hashedPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
}
