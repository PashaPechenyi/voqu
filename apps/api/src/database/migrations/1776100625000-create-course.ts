import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourse1776100625000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Course" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "status" VARCHAR(20) NOT NULL DEFAULT 'draft',
        "LevelId" BIGINT NOT NULL REFERENCES "Level" ("id") ON DELETE CASCADE,
        "OwnerId" UUID NOT NULL REFERENCES "User" ("id") ON DELETE CASCADE,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      CREATE INDEX "idx_course_LevelId" ON "Course" ("LevelId");
      CREATE INDEX "idx_course_OwnerId" ON "Course" ("OwnerId");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "Course"`);
  }
}
