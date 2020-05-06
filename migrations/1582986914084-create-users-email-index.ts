import { MigrationInterface, QueryRunner } from 'typeorm';

const CREATE_INDEX = 'CREATE INDEX CONCURRENTLY users_email_index ON users (lower(email));';

const DESTROY_INDEX = 'DROP INDEX IF EXISTS users_email_index;';

export class CreateUsersEmailIndex1582986914084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(CREATE_INDEX);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(DESTROY_INDEX);
  }
}
