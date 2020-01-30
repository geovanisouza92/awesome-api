import { sign, SignOptions, verify } from 'jsonwebtoken';
import { Environment } from '../../../config/environment';

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

  // TODO Change return to domain object
  verifyToken(token: string): User {
    return verify(token, this.publicKey);
  }
}
