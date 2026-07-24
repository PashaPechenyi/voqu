import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedLanguages1776100642000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Seed the learning language (English) and the first UI language (Ukrainian).
    // Adding more languages later is a data-only INSERT — no schema change.
    await queryRunner.query(`
      INSERT INTO "Language" ("code", "name", "nativeName", "isActive")
      VALUES
        ('en', 'English', 'English', TRUE),
        ('uk', 'Ukrainian', 'Українська', TRUE)
      ON CONFLICT ("code") DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "Language" WHERE "code" IN ('en', 'uk')`);
  }
}
