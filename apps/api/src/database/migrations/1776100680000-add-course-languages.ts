import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Adds language columns to Course:
 *  - `sourceLanguageCode`      — the language the course teaches (the "main"
 *    language). Source text on entity columns belongs to this language.
 *    Backfilled to 'en' for existing rows.
 *  - `translationLanguageCodes` — the set of languages the course may be
 *    translated into; the details endpoint's `?lang=` must be one of these.
 *    Backfilled to '{uk}' for existing rows.
 *
 * Runs after Language (1776100640000) so the FK target exists.
 */
export class AddCourseLanguages1776100680000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Add columns nullable so existing rows don't violate NOT NULL.
    await queryRunner.query(`
      ALTER TABLE "Course"
        ADD COLUMN "sourceLanguageCode" VARCHAR(10),
        ADD COLUMN "translationLanguageCodes" VARCHAR(10)[];
    `);

    // 2. Backfill existing rows: English source, Ukrainian translation.
    await queryRunner.query(`
      UPDATE "Course"
      SET "sourceLanguageCode" = 'en',
          "translationLanguageCodes" = '{uk}'
      WHERE "sourceLanguageCode" IS NULL;
    `);

    // 3. Lock the columns down: defaults, NOT NULL, and FK on the source.
    await queryRunner.query(`
      ALTER TABLE "Course"
        ALTER COLUMN "sourceLanguageCode" SET DEFAULT 'en',
        ALTER COLUMN "sourceLanguageCode" SET NOT NULL,
        ALTER COLUMN "translationLanguageCodes" SET DEFAULT '{}',
        ALTER COLUMN "translationLanguageCodes" SET NOT NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE "Course"
        ADD CONSTRAINT "fk_course_sourceLanguageCode"
        FOREIGN KEY ("sourceLanguageCode") REFERENCES "Language" ("code");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "Course" DROP CONSTRAINT IF EXISTS "fk_course_sourceLanguageCode";
    `);
    await queryRunner.query(`
      ALTER TABLE "Course"
        DROP COLUMN IF EXISTS "translationLanguageCodes",
        DROP COLUMN IF EXISTS "sourceLanguageCode";
    `);
  }
}
