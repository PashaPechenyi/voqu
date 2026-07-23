import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGrammarBlockPattern1776100673000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1:1 payload for `pattern` blocks — the pk IS the FK to GrammarBlock.
    await queryRunner.query(`
      CREATE TABLE "GrammarBlockPattern" (
        "GrammarBlockId" UUID NOT NULL PRIMARY KEY REFERENCES "GrammarBlock" ("id") ON DELETE CASCADE,
        "form" VARCHAR(64) NOT NULL,
        "markup" TEXT NOT NULL,
        "parsedMarkup" JSONB NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "GrammarBlockPattern"`);
  }
}
