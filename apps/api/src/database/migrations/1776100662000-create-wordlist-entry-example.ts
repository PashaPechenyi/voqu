import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWordlistEntryExample1776100662000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "WordlistEntryExample" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
        "WordlistEntryId" UUID NOT NULL REFERENCES "WordlistEntry" ("id") ON DELETE CASCADE,
        "text" TEXT NOT NULL,
        "order" INT NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      CREATE INDEX "idx_wordlistentryexample_entry_order" ON "WordlistEntryExample" ("WordlistEntryId", "order");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "WordlistEntryExample"`);
  }
}
