import { sign, SignOptions, verify } from 'jsonwebtoken';
import { Config } from '../../../../config';
import { User } from '../domain/user';

export class AuthenticationService {
  private publicKey!: string;
  private privateKey!: string;
  private signOptions!: SignOptions;

  constructor({ config }: { config: Config }) {
    this.publicKey = config.auth.publicKey;
    this.privateKey = config.auth.privateKey;
    this.signOptions = config.auth.signOptions as Partial<SignOptions>;
  }

  createToken(): string {
    const userClaims = {};
    return sign(userClaims, this.privateKey, this.signOptions);
  }

  verifyToken(token: string): User {
    let payload = verify(token, this.publicKey);
    if (typeof payload === 'string') {
      payload = JSON.parse(payload);
    }
    return new User(payload as Partial<User>);
  }
}
