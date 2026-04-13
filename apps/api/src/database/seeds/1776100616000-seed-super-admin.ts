import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedSuperAdmin1776100616000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const superAdminRole = await queryRunner.query(`SELECT id FROM "Role" WHERE "slug" = 'super-admin';`);
    const superAdminRoleId = superAdminRole[0].id;

    await queryRunner.query(`
      INSERT INTO "User" ("email", "firstName", "lastName", "password", "RoleId")
      VALUES
        ('admin@voqu.com', 'Super', 'Admin', 'changeme123', '${superAdminRoleId}');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "User" WHERE "email" = 'admin@voqu.com';`);
  }
}
