export class NotFoundError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(type: string, ...context: any[]) {
    super(`Object of type ${type} not found given context (${context})`);
  }
}
