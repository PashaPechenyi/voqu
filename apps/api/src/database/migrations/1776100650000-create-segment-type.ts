import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSegmentType1776100650000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "SegmentType" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
        "key" VARCHAR(32) NOT NULL UNIQUE,
        "name" VARCHAR(64) NOT NULL,
        "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "SegmentType"`);
  }
}
