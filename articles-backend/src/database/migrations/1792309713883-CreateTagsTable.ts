
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTagsTable1792309713883
  implements MigrationInterface
{
  name = "CreateTagsTable1792309713883";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`tags\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`name\` varchar(100) NOT NULL,
        \`slug\` varchar(120) NOT NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
          ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE INDEX \`IDX_d90243459a697eadb8ad56e909\` (\`name\`),
        UNIQUE INDEX \`IDX_b3aa10c29ea4e61a830362bd25\` (\`slug\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE \`article_tags\` (
        \`articlesId\` int NOT NULL,
        \`tagsId\` int NOT NULL,
        INDEX \`IDX_b75655619539f2c19724045441\` (\`articlesId\`),
        INDEX \`IDX_ab2929ab48ecedb624e30b2649\` (\`tagsId\`),
        PRIMARY KEY (\`articlesId\`, \`tagsId\`)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      ALTER TABLE \`article_tags\`
      ADD CONSTRAINT \`FK_b75655619539f2c19724045441d\`
      FOREIGN KEY (\`articlesId\`)
      REFERENCES \`articles\`(\`id\`)
      ON DELETE CASCADE ON UPDATE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE \`article_tags\`
      ADD CONSTRAINT \`FK_ab2929ab48ecedb624e30b26490\`
      FOREIGN KEY (\`tagsId\`)
      REFERENCES \`tags\`(\`id\`)
      ON DELETE CASCADE ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`article_tags\`
      DROP FOREIGN KEY \`FK_ab2929ab48ecedb624e30b26490\`
    `);

    await queryRunner.query(`
      ALTER TABLE \`article_tags\`
      DROP FOREIGN KEY \`FK_b75655619539f2c19724045441d\`
    `);

    await queryRunner.query(`
      DROP INDEX \`IDX_ab2929ab48ecedb624e30b2649\`
      ON \`article_tags\`
    `);

    await queryRunner.query(`
      DROP INDEX \`IDX_b75655619539f2c19724045441\`
      ON \`article_tags\`
    `);

    await queryRunner.query(`DROP TABLE \`article_tags\``);

    await queryRunner.query(`
      DROP INDEX \`IDX_b3aa10c29ea4e61a830362bd25\`
      ON \`tags\`
    `);

    await queryRunner.query(`
      DROP INDEX \`IDX_d90243459a697eadb8ad56e909\`
      ON \`tags\`
    `);

    await queryRunner.query(`DROP TABLE \`tags\``);
  }
}
