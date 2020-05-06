import { MigrationInterface, QueryRunner } from 'typeorm';

const CREATE_EXTENSION = `CREATE EXTENSION pgcrypto;`;

const DESTROY_EXTENSION = `DROP EXTENSION pgcrypto`;

export class CreateExtensions1582986462000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(CREATE_EXTENSION);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(DESTROY_EXTENSION);
  }
}
