import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLessonDuration1776100631000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "Lesson" ADD COLUMN "duration" INT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "Lesson" DROP COLUMN IF EXISTS "duration";
    `);
  }
}
