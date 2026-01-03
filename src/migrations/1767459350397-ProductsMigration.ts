import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductsMigration1767459350397 implements MigrationInterface {
    name = 'ProductsMigration1767459350397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(255) NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "categoryId" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0190770b7145c77276fadcbf11" ON "products" ("name") WHERE "deletedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0190770b7145c77276fadcbf11"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
