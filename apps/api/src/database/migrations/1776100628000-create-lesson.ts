import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLesson1776100628000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Lesson" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL,
        "subtitle" VARCHAR(255),
        "description" TEXT,
        "CourseId" UUID NOT NULL REFERENCES "Course" ("id") ON DELETE CASCADE,
        "order" INT NOT NULL DEFAULT 0,
        "status" VARCHAR(20) NOT NULL DEFAULT 'draft',
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      CREATE INDEX "idx_lesson_CourseId" ON "Lesson" ("CourseId");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "Lesson"`);
  }
}
