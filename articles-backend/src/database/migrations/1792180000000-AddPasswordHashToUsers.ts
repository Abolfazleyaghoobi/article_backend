
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPasswordHashToUsers1792180000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "passwordHash",
        type: "varchar",
        length: "255",
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "passwordHash");
  }
}
