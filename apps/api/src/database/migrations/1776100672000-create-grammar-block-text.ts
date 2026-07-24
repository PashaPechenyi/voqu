import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGrammarBlockText1776100672000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1:1 payload for `text` blocks — the pk IS the FK to GrammarBlock.
    await queryRunner.query(`
      CREATE TABLE "GrammarBlockText" (
        "GrammarBlockId" UUID NOT NULL PRIMARY KEY REFERENCES "GrammarBlock" ("id") ON DELETE CASCADE,
        "textRole" VARCHAR(32) NOT NULL,
        "text" TEXT NOT NULL,
        CONSTRAINT "chk_grammarblocktext_textRole" CHECK ("textRole" IN ('description', 'example'))
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "GrammarBlockText"`);
  }
}
