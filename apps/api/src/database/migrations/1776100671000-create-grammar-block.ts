import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGrammarBlock1776100671000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "GrammarBlock" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
        "GrammarTopicId" UUID NOT NULL REFERENCES "GrammarTopic" ("id") ON DELETE CASCADE,
        "blockType" VARCHAR(16) NOT NULL,
        "order" INT NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        CONSTRAINT "chk_grammarblock_blockType" CHECK ("blockType" IN ('text', 'pattern'))
      );
      CREATE INDEX "idx_grammarblock_topic_order" ON "GrammarBlock" ("GrammarTopicId", "order");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "GrammarBlock"`);
  }
}
