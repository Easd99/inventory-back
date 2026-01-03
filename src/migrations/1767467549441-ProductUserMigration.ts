import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductUserMigration1767467549441 implements MigrationInterface {
    name = 'ProductUserMigration1767467549441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "createdById" integer`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_de1043dff8f68e83a20480b00f7" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_de1043dff8f68e83a20480b00f7"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "createdById"`);
    }

}
