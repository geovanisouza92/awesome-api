import { asClass, AwilixContainer } from "awilix";
import { AuthenticationService } from "./services";
import { VerifyTokenUseCase } from "./use-cases";

export function mountAuthenticateComponent(container: AwilixContainer): void {
  container.register({
    authenticationService: asClass(AuthenticationService),
    verifyTokenUseCase: asClass(VerifyTokenUseCase),
  });
}
