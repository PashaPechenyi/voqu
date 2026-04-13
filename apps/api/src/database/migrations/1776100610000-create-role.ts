import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRole1776100610000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Role" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
        "name" VARCHAR(50) NOT NULL UNIQUE,
        "slug" VARCHAR(50) NOT NULL UNIQUE,
        "delegableRoles" JSONB NOT NULL DEFAULT '[]',
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "Role"`);
  }
}
