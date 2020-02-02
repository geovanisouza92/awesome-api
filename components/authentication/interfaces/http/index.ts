import { makeInvoker } from "awilix-express";
import { Router } from "express";

export * from "./check-authentication";

export function mountAuthenticationApi(app: Router): void {
  const callMethod = makeInvoker(() => {
    return {
      // TODO
    };
  });

  app.use('/auth/authenticate', callMethod('authenticate'));
}
