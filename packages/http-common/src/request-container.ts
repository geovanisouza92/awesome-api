/* eslint-disable @typescript-eslint/no-explicit-any */

import { asClass, AwilixContainer, Constructor } from 'awilix';
import { NextFunction, Request, Response } from 'express';

export type ContainedRequest = Request & { container: AwilixContainer };

export function useScopedContainerPerRequest(container: AwilixContainer) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    (req as ContainedRequest).container = container.createScope();
    next();
  };
}

function asyncWrapper(handler: (...args: any[]) => any): (...args: any[]) => any {
  return (req, res, next): any => {
    const result = handler(req, res, next);

    if (result && result.catch && typeof result.catch === 'function') {
      return (result as Promise<any>).catch((err) => next(err));
    }

    // TODO Review with sync handlers
    return result;
  };
}

type Handler = (req: Request, res: Response, next?: NextFunction) => void;
type ActionHandlerFactory<K> = (actionName: K) => Handler;

export function createController<T, K extends keyof T>(ctor: Constructor<T>): ActionHandlerFactory<K> {
  const klass = asClass(ctor);
  return function useAction(actionName: K) {
    return function handler(req: Request, ...rest: any[]): void {
      const { container } = req as ContainedRequest;
      const controller = container.build(klass);
      const action = (controller[actionName] as unknown) as Function;
      return asyncWrapper(action.bind(controller))(req, ...rest);
    };
  };
}
