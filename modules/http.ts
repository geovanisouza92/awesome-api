import { AwilixContainer } from 'awilix';
import { Request } from 'express';

export type ContainedRequest = Request & { container: AwilixContainer };
