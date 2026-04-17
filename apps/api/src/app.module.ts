import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';
import { CourseModule } from './modules/course/course.module';
import { LevelModule } from './modules/level/level.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    LevelModule,
    CourseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
