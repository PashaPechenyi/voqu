import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDelegableRoles1776100612000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminRole = await queryRunner.query(`SELECT id FROM "Role" WHERE "slug" = 'admin';`);
    const adminRoleId = adminRole[0].id;

    const userRole = await queryRunner.query(`SELECT id FROM "Role" WHERE "slug" = 'user';`);
    const userRoleId = userRole[0].id;

    await queryRunner.query(
      `UPDATE "Role" SET "delegableRoles" = '["${adminRoleId}", "${userRoleId}"]' WHERE "slug" = 'super-admin';`,
    );

    await queryRunner.query(
      `UPDATE "Role" SET "delegableRoles" = '["${userRoleId}"]' WHERE "slug" = 'admin';`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE "Role" SET "delegableRoles" = '[]' WHERE "slug" IN ('super-admin', 'admin');`);
  }
}
