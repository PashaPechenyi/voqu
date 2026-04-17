import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1776100615000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "User" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
        "email" VARCHAR(255) NOT NULL UNIQUE,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "RoleId" UUID NOT NULL REFERENCES "Role" ("id") ON DELETE CASCADE,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      CREATE INDEX "idx_user_email" ON "User" ("email");
      CREATE INDEX "idx_user_roleId" ON "User" ("RoleId");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "User"`);
  }
}
