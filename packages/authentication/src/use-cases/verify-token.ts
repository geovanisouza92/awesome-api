import { UseCase } from '@awesome/ddd-common';
import { Inject, Injectable } from '@awesome/inject';
import { User } from '../domain/user';
import { AuthenticationService } from '../services/authentication';

@Injectable
export class VerifyTokenUseCase implements UseCase<string, User> {
  @Inject
  private authenticationService!: AuthenticationService;

  async execute(token: string): Promise<User> {
    return this.authenticationService.verifyToken(token);
  }
}
