import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWordlistEntryCollocation1776100663000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "WordlistEntryCollocation" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
        "WordlistEntryId" UUID NOT NULL REFERENCES "WordlistEntry" ("id") ON DELETE CASCADE,
        "expression" VARCHAR(255) NOT NULL,
        "explanation" TEXT,
        "order" INT NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      CREATE INDEX "idx_wordlistentrycollocation_entry_order" ON "WordlistEntryCollocation" ("WordlistEntryId", "order");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "WordlistEntryCollocation"`);
  }
}
