import { Inject, Injectable } from '../../../helpers/container';
import { UseCase } from '../../use-case';
import { AuthenticationService } from '../services';

@Injectable
export class VerifyTokenUseCase implements UseCase<string, User> {
  @Inject
  private authenticationService!: AuthenticationService;

  async execute(token: string): Promise<User> {
    return this.authenticationService.verifyToken(token);
  }
}
