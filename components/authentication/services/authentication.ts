import { sign, SignOptions, verify } from 'jsonwebtoken';
import { Environment } from '../../../config/environment';
import { User } from '../domain/user';

export class AuthenticationService {
  private publicKey!: string;
  private privateKey!: string;
  private signOptions!: SignOptions;

  constructor({ environment }: { environment: typeof Environment }) {
    this.publicKey = environment.auth.publicKey;
    this.privateKey = environment.auth.privateKey;
    this.signOptions = environment.auth.signOptions;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { id, email, name } = payload as any;
    const user = new User(id, email, name);
    return user;
  }
}
