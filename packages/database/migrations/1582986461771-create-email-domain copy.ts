import { MigrationInterface, QueryRunner } from 'typeorm';

const CREATE_DOMAIN = `
CREATE EXTENSION citext;
CREATE DOMAIN email AS citext
  CHECK ( value ~ '/^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/');
`;

const DESTROY_DOMAIN = `DROP DOMAIN IF EXISTS email;`;

export class CreateEmailDomain1582986461771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(CREATE_DOMAIN);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(DESTROY_DOMAIN);
  }
}
