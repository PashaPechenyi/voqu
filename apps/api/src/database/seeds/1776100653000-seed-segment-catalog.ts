import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Seeds the segment catalog (SegmentType + SegmentKind) from the code-side
 * registry. Upserts by `code` so rows are stable across deploys. The admin UI
 * populates its dropdowns from these rows — the DB is the source of truth for
 * what segment types/templates exist.
 *
 * Adding a new template later appends one SegmentKind row here (co-located
 * with the handler's `register()` call in the module).
 */
export class SeedSegmentCatalog1776100653000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "SegmentType" ("key", "name")
      VALUES
        ('vocabulary', 'Vocabulary'),
        ('grammar', 'Grammar')
      ON CONFLICT ("key") DO NOTHING;
    `);

    await queryRunner.query(`
      INSERT INTO "SegmentKind" ("SegmentTypeId", "key", "name", "tableName")
      VALUES
        (
          (SELECT "id" FROM "SegmentType" WHERE "key" = 'vocabulary'),
          'wordlist', 'Wordlist', 'Wordlist'
        ),
        (
          (SELECT "id" FROM "SegmentType" WHERE "key" = 'grammar'),
          'topic', 'Grammar Topic', 'GrammarTopic'
        )
      ON CONFLICT ("key") DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "SegmentKind" WHERE "key" IN ('wordlist', 'topic')`);
    await queryRunner.query(`DELETE FROM "SegmentType" WHERE "key" IN ('vocabulary', 'grammar')`);
  }
}
