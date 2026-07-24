import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLessonSegment1776100652000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "LessonSegment" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
        "LessonId" UUID NOT NULL REFERENCES "Lesson" ("id") ON DELETE CASCADE,
        "SegmentKindId" UUID NOT NULL REFERENCES "SegmentKind" ("id") ON DELETE RESTRICT,
        "SegmentContentRowId" UUID NOT NULL,
        "title" VARCHAR(255),
        "description" TEXT,
        "order" INT NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      CREATE INDEX "idx_lessonsegment_LessonId_order" ON "LessonSegment" ("LessonId", "order");
      CREATE INDEX "idx_lessonsegment_content" ON "LessonSegment" ("SegmentKindId", "SegmentContentRowId");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "LessonSegment"`);
  }
}
