import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGrammarTopic1776100670000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "GrammarTopic" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
        "title" VARCHAR(255),
        "tense" VARCHAR(64),
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "GrammarTopic"`);
  }
}
