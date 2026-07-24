import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTranslation1776100641000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Translation" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
        "entityType" VARCHAR(64) NOT NULL,
        "EntityId" UUID NOT NULL,
        "field" VARCHAR(64) NOT NULL,
        "languageCode" VARCHAR(10) NOT NULL REFERENCES "Language" ("code") ON DELETE CASCADE,
        "value" TEXT NOT NULL,
        "version" INT NOT NULL DEFAULT 1,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        CONSTRAINT "uq_translation_slot" UNIQUE ("entityType", "EntityId", "field", "languageCode")
      );
      CREATE INDEX "idx_translation_entity" ON "Translation" ("entityType", "EntityId");
      CREATE INDEX "idx_translation_languageCode" ON "Translation" ("languageCode");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "Translation"`);
  }
}
