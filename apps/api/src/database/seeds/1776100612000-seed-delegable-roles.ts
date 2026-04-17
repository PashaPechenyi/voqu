import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDelegableRoles1776100612000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminRole = await queryRunner.query(`SELECT id FROM "Role" WHERE "slug" = 'admin';`);
    const adminRoleId = adminRole[0].id;

    const teacherRole = await queryRunner.query(`SELECT id FROM "Role" WHERE "slug" = 'teacher';`);
    const teacherRoleId = teacherRole[0].id;

    const studentRole = await queryRunner.query(`SELECT id FROM "Role" WHERE "slug" = 'student';`);
    const studentRoleId = studentRole[0].id;

    await queryRunner.query(
      `UPDATE "Role" SET "delegableRoles" = '["${adminRoleId}", "${teacherRoleId}", "${studentRoleId}"]' WHERE "slug" = 'super-admin';`,
    );

    await queryRunner.query(
      `UPDATE "Role" SET "delegableRoles" = '["${teacherRoleId}", "${studentRoleId}"]' WHERE "slug" = 'admin';`,
    );

    await queryRunner.query(
      `UPDATE "Role" SET "delegableRoles" = '["${studentRoleId}"]' WHERE "slug" = 'teacher';`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "Role" SET "delegableRoles" = '[]' WHERE "slug" IN ('super-admin', 'admin', 'teacher');`,
    );
  }
}
