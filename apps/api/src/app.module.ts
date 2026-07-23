import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';
import { CourseModule } from './modules/course/course.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { LevelModule } from './modules/level/level.module';
import { LocalizationModule } from './modules/localization/localization.module';
import { SegmentCatalogModule } from './modules/segment-catalog/segment-catalog.module';
import { LessonSegmentModule } from './modules/lesson-segment/lesson-segment.module';
import { VocabularyModule } from './modules/vocabulary/vocabulary.module';
import { GrammarModule } from './modules/grammar/grammar.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    LevelModule,
    CourseModule,
    LessonModule,
    LocalizationModule,
    SegmentCatalogModule,
    LessonSegmentModule,
    VocabularyModule,
    GrammarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
