import { createNamespace } from 'cls-hooked';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

const insideRequest = createNamespace('request');

export function defineRequestId(_: Request, res: Response, next: NextFunction): void {
  insideRequest.run(() => {
    const requestId = uuid();
    insideRequest.set('request-id', requestId);
    res.setHeader('X-Request-Id', requestId);
    next();
  });
}

export function currentRequestId(): string {
  return insideRequest.get('request-id');
}
