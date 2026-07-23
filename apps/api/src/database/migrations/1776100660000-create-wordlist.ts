import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWordlist1776100660000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Wordlist" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "OwnerUserId" UUID REFERENCES "User" ("id") ON DELETE CASCADE,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      CREATE INDEX "idx_wordlist_OwnerUserId" ON "Wordlist" ("OwnerUserId");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "Wordlist"`);
  }
}
