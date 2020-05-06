import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1582986863040 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersTable = new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isGenerated: true,
          isPrimary: true,
        },
        {
          name: 'name',
          type: 'string',
          length: '100',
          isNullable: false,
          default: '',
        },
        {
          name: 'email',
          type: 'email',
          length: '100',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'password',
          type: 'string',
          length: '64',
          isNullable: false,
        },
        {
          name: 'password_salt',
          type: 'string',
          length: '30',
          isNullable: false,
        },
      ],
    });

    await queryRunner.createTable(usersTable, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true);
  }
}
