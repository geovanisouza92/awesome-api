export class User {
  public readonly id!: string;
  public readonly email!: string;
  public readonly name!: string;
  public readonly password?: string;
  public readonly passwordSalt?: string;

  constructor(values: Partial<User>) {
    Object.assign(this, values);
  }
}
