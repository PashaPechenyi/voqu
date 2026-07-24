import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWordlistEntry1776100661000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "WordlistEntry" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
        "WordlistId" UUID NOT NULL REFERENCES "Wordlist" ("id") ON DELETE CASCADE,
        "lemma" VARCHAR(255) NOT NULL,
        "entryType" VARCHAR(8) NOT NULL DEFAULT 'word',
        "partOfSpeech" VARCHAR(32),
        "v2" VARCHAR(255),
        "v3" VARCHAR(255),
        "transcription" VARCHAR(255),
        "audioUrl" VARCHAR(512),
        "order" INT NOT NULL DEFAULT 0,
        "note" TEXT,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        CONSTRAINT "chk_wordlistentry_entryType" CHECK ("entryType" IN ('word', 'phrase'))
      );
      CREATE INDEX "idx_wordlistentry_WordlistId_order" ON "WordlistEntry" ("WordlistId", "order");
      CREATE INDEX "idx_wordlistentry_lemma" ON "WordlistEntry" (LOWER("lemma"));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "WordlistEntry"`);
  }
}
