import { Inject, Injectable } from '../../../../lib/container';
import { UseCase } from '../../../../lib/use-case';
import { UserRepository } from '../../authentication/infrastructure/user-repository';
import { StatusReport } from '../domain/status-report';

@Injectable
export class CheckLivenessUseCase implements UseCase<void, StatusReport> {
  @Inject
  private userRepository!: UserRepository;

  async execute(): Promise<StatusReport> {
    // TODO Wrong
    const howManyUsers = await this.userRepository.count();

    return { status: 'ok', howManyUsers: String(howManyUsers) };
  }
}
