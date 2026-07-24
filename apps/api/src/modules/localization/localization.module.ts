import { Module } from '@nestjs/common';
import { TranslationController } from './http/controllers/translation.controller';
import { TranslationRepository } from './repositories/translation.repository';
import { TranslationService } from './services/translation.service';

@Module({
  controllers: [TranslationController],
  providers: [TranslationRepository, TranslationService],
  exports: [TranslationService],
})
export class LocalizationModule {}
