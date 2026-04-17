import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedLevels1776100630000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "Level" ("name", "description", "cefrLevel", "order")
      VALUES
        ('Beginner', 'Basic phrases and everyday expressions for complete beginners.', 'A1', 0),
        ('Elementary', 'Simple sentences about familiar topics and routine tasks.', 'A2', 1),
        ('Pre-Intermediate', 'Familiar matters in simple connected text, describing experiences and events.', 'A2', 2),
        ('Intermediate', 'Main points on familiar matters, travel, and personal interests.', 'B1', 3),
        ('Upper-Intermediate', 'Complex texts, fluent interaction with native speakers.', 'B2', 4),
        ('Advanced', 'Demanding texts, fluent and spontaneous expression for academic and professional use.', 'C1', 5),
        ('Proficiency', 'Near-native fluency, understanding of virtually everything heard or read.', 'C2', 6);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "Level" WHERE "name" IN ('Beginner', 'Elementary', 'Pre-Intermediate', 'Intermediate', 'Upper-Intermediate', 'Advanced', 'Proficiency')`,
    );
  }
}
