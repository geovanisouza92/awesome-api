import path from 'path';
import { Connection, ObjectType, Repository } from 'typeorm';
import { Builder, fixturesIterator, Loader, Parser, Resolver } from 'typeorm-fixtures-cli';

export async function setupFixtures(fixturesPath: string, connection: Connection): Promise<() => Promise<void>> {
  const repositoryMap = new Map<string, Repository<{}>>();
  const getRepository = (name: string): Repository<{}> => {
    let repository = repositoryMap.get(name);
    if (!repository) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      repository = connection.getCustomRepository((name as any) as ObjectType<Repository<{}>>);
      repositoryMap.set(name, repository);
    }
    return repository;
  };

  try {
    const loader = new Loader();
    loader.load(path.resolve(fixturesPath));

    const resolver = new Resolver();
    const fixtures = resolver.resolve(loader.fixtureConfigs);
    const builder = new Builder(connection, new Parser());

    for (const fixture of fixturesIterator(fixtures)) {
      const entity = await (builder.build(fixture) as Promise<{}>);
      const repository = getRepository(entity.constructor.name);
      repository.save(entity);
    }
  } finally {
    if (connection) {
      await connection.close();
    }
  }

  return async (): Promise<void> => {
    return Array.from(repositoryMap.values()).reduce(async (prevPromise: Promise<void>, repository: Repository<{}>) => {
      await prevPromise;
      return repository.clear();
    }, Promise.resolve());
  };
}
