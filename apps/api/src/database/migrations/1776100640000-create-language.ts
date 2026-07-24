import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLanguage1776100640000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Language" (
        "code" VARCHAR(10) NOT NULL PRIMARY KEY,
        "name" VARCHAR(64) NOT NULL,
        "nativeName" VARCHAR(64) NOT NULL,
        "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "Language"`);
  }
}
