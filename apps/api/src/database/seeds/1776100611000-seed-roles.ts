import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRoles1776100611000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "Role" ("name", "slug")
      VALUES
        ('Super Admin', 'super-admin'),
        ('Admin', 'admin'),
        ('User', 'user');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "Role" WHERE "slug" IN ('super-admin', 'admin', 'user')`);
  }
}
