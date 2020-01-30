import { HealthcheckService } from "../services";

export class ReadinessUseCase {
  private healthcheckService: HealthcheckService;

  constructor({ healthcheckService }: { healthcheckService: HealthcheckService }) {
    this.healthcheckService = healthcheckService;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async execute() {
    return this.healthcheckService.readiness();
  }
}
