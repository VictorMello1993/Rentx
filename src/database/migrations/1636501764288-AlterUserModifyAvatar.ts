import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserModifyAvatar1636501764288 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'avatar',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'avatar',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
