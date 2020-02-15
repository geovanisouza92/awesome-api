import { asClass, AwilixContainer, Constructor } from 'awilix';
import { NextFunction, Request, Response } from 'express';

export type ContainedRequest = Request & { container: AwilixContainer };

export function scopePerRequest(container: AwilixContainer) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    (req as ContainedRequest).container = container.createScope();
    next();
  };
}

function asyncWrapper(fn: (...args: any[]) => any): (...args: any[]) => any {
  return (req, res, next): any => {
    const result = fn(req, res, next);

    if (result && result.catch && typeof result.catch === 'function') {
      return (result as Promise<any>).catch((err) => next(err));
    }

    return result;
  };
}

type Handler = (req: Request, res: Response, next?: NextFunction) => void;
type Invoker<K> = (methodName: K) => Handler;

export function createController<T, K extends keyof T>(ctor: Constructor<T>): Invoker<K> {
  const klass = asClass(ctor);
  return function handleWith(methodName: K) {
    return function handler(req: Request, ...rest: any[]): void {
      const { container } = req as ContainedRequest;
      const instance = container.build(klass);
      const method = (instance[methodName] as unknown) as Function;
      return asyncWrapper(method.bind(instance))(req, ...rest);
    };
  };
}
