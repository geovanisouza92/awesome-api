export interface UseCase<Params, Response> {
  execute(params: Params): Promise<Response>;
}
