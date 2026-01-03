import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersMigration1767451718283 implements MigrationInterface {
    name = 'UsersMigration1767451718283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_262d8d714a42e664d987714a75" ON "users" ("email") WHERE "deletedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_262d8d714a42e664d987714a75"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
