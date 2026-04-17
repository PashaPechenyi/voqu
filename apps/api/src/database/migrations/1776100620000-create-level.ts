import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLevel1776100620000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Level" (
        "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "cefrLevel" VARCHAR(2) NOT NULL,
        "order" INT NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      CREATE INDEX "idx_level_cefrLevel" ON "Level" ("cefrLevel");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "Level"`);
  }
}
