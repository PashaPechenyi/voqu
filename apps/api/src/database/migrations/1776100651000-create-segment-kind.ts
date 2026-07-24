import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSegmentKind1776100651000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "SegmentKind" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
        "SegmentTypeId" UUID NOT NULL REFERENCES "SegmentType" ("id") ON DELETE CASCADE,
        "key" VARCHAR(64) NOT NULL UNIQUE,
        "name" VARCHAR(64) NOT NULL,
        "tableName" VARCHAR(64) NOT NULL,
        "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      CREATE INDEX "idx_segmentkind_SegmentTypeId" ON "SegmentKind" ("SegmentTypeId");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "SegmentKind"`);
  }
}
