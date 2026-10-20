import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoverImageToArticles1792481988098 implements MigrationInterface {
    name = 'AddCoverImageToArticles1792481988098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articles\` ADD \`coverImage\` varchar(1000) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`passwordHash\` \`passwordHash\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`passwordHash\` \`passwordHash\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`coverImage\``);
    }

}
