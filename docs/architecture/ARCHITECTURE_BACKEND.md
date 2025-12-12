# Backend Architecture

> **Purpose:** Architecture guidelines, folder structure, and coding conventions for the NestJS + TypeORM + PostgreSQL backend application.
>
> **Related documents:**
> - [Shared Packages Architecture](./ARCHITECTURE_SHARED.md) - Types, constants, and utilities shared with frontend
> - [Frontend Architecture](./ARCHITECTURE_FRONTEND.md)
> - [Implementation Rules](./phases/IMPLEMENTATION_RULES.md) - Detailed implementation plan rules

---

## Table of Contents

- [1. Tech Stack Overview](#1-tech-stack-overview)
- [2. Folder Structure](#2-folder-structure)
- [3. File Naming Conventions](#3-file-naming-conventions)
- [4. Import Path Aliases](#4-import-path-aliases)
- [5. Module Architecture](#5-module-architecture)
- [6. Controller Pattern](#6-controller-pattern)
- [7. Service Pattern](#7-service-pattern)
- [8. Database & Entities](#8-database--entities)
- [9. DTOs & Validation](#9-dtos--validation)
- [10. Authentication & Authorization](#10-authentication--authorization)
- [11. Error Handling](#11-error-handling)
- [12. Pagination & Filtering](#12-pagination--filtering)
- [13. Database Migrations](#13-database-migrations)
- [14. Configuration Management](#14-configuration-management)
- [15. Testing](#15-testing)
- [16. API Documentation](#16-api-documentation)
- [17. Code Quality Checklist](#17-code-quality-checklist)

---

## 1. Tech Stack Overview

| Technology | Version | Purpose |
|------------|---------|---------|
| NestJS | 10.x | Backend framework |
| TypeScript | 5.x | Type safety |
| TypeORM | 0.3.x | ORM for PostgreSQL |
| PostgreSQL | 15.x | Primary database |
| Auth0 | - | Authentication provider |
| class-validator | 0.14.x | Request validation |
| class-transformer | 0.5.x | Object transformation |
| Passport | 0.7.x | Auth strategies |

### Why This Stack?

- **NestJS** - Modular architecture, native TypeScript, built-in DI
- **TypeORM** - Decorator-based entities, migrations, excellent TypeScript support
- **PostgreSQL** - Robust relational database, great for structured data
- **Auth0** - Enterprise-grade auth without building from scratch

---

## 2. Folder Structure

```
apps/api/
├── src/
│   ├── main.ts                         # Application entry point
│   ├── app.module.ts                   # Root module
│   │
│   ├── modules/                        # Feature modules
│   │   ├── auth/                       # Authentication module
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   │   └── jwt.strategy.ts
│   │   │   └── dto/
│   │   │       └── auth-response.dto.ts
│   │   │
│   │   ├── users/                      # Users module
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── dto/
│   │   │       ├── create-user.dto.ts
│   │   │       ├── update-user.dto.ts
│   │   │       └── user-response.dto.ts
│   │   │
│   │   ├── levels/                     # Levels module
│   │   │   ├── levels.module.ts
│   │   │   ├── levels.controller.ts
│   │   │   ├── levels.service.ts
│   │   │   └── dto/
│   │   │       ├── create-level.dto.ts
│   │   │       ├── update-level.dto.ts
│   │   │       ├── level-query.dto.ts
│   │   │       └── level-response.dto.ts
│   │   │
│   │   ├── lessons/                    # Lessons module
│   │   │   ├── lessons.module.ts
│   │   │   ├── lessons.controller.ts
│   │   │   ├── lessons.service.ts
│   │   │   └── dto/
│   │   │
│   │   ├── templates/                  # Templates module
│   │   │   ├── templates.module.ts
│   │   │   ├── templates.controller.ts
│   │   │   ├── templates.service.ts
│   │   │   └── dto/
│   │   │
│   │   └── progress/                   # Progress tracking module
│   │       ├── progress.module.ts
│   │       ├── progress.controller.ts
│   │       ├── progress.service.ts
│   │       └── dto/
│   │
│   ├── database/                       # Database configuration
│   │   ├── data-source.ts              # TypeORM data source
│   │   ├── entities/                   # Entity definitions
│   │   │   ├── index.ts
│   │   │   ├── user.entity.ts
│   │   │   ├── level.entity.ts
│   │   │   ├── lesson.entity.ts
│   │   │   ├── template.entity.ts
│   │   │   └── progress.entity.ts
│   │   └── migrations/                 # Database migrations
│   │       ├── 1704067200000-create-users.ts
│   │       └── 1704067300000-create-levels.ts
│   │
│   ├── common/                         # Shared utilities
│   │   ├── guards/                     # Auth guards
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── admin.guard.ts
│   │   │   └── owner.guard.ts
│   │   ├── decorators/                 # Custom decorators
│   │   │   ├── current-user.decorator.ts
│   │   │   ├── roles.decorator.ts
│   │   │   └── public.decorator.ts
│   │   ├── filters/                    # Exception filters
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors/               # Request interceptors
│   │   │   ├── transform.interceptor.ts
│   │   │   └── logging.interceptor.ts
│   │   ├── pipes/                      # Validation pipes
│   │   │   └── validation.pipe.ts
│   │   ├── dto/                        # Shared DTOs
│   │   │   └── pagination-query.dto.ts
│   │   └── exceptions/                 # Custom exceptions
│   │       └── entity-not-found.exception.ts
│   │
│   └── config/                         # Configuration
│       ├── index.ts
│       ├── database.config.ts
│       ├── auth.config.ts
│       └── app.config.ts
│
├── test/                               # E2E tests
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── nest-cli.json                       # NestJS CLI config
├── tsconfig.json                       # TypeScript config
├── tsconfig.build.json                 # Build-specific config
└── package.json
```

---

## 3. File Naming Conventions

### Module Files

| Type | Pattern | Example |
|------|---------|---------|
| Module | `{feature}.module.ts` | `levels.module.ts` |
| Controller | `{feature}.controller.ts` | `levels.controller.ts` |
| Service | `{feature}.service.ts` | `levels.service.ts` |
| Entity | `{entity}.entity.ts` | `level.entity.ts` |

### DTO Files

| Type | Pattern | Example |
|------|---------|---------|
| Create DTO | `create-{entity}.dto.ts` | `create-level.dto.ts` |
| Update DTO | `update-{entity}.dto.ts` | `update-level.dto.ts` |
| Query DTO | `{entity}-query.dto.ts` | `level-query.dto.ts` |
| Response DTO | `{entity}-response.dto.ts` | `level-response.dto.ts` |

### Common Files

| Type | Pattern | Example |
|------|---------|---------|
| Guard | `{name}.guard.ts` | `admin.guard.ts` |
| Decorator | `{name}.decorator.ts` | `current-user.decorator.ts` |
| Filter | `{name}.filter.ts` | `http-exception.filter.ts` |
| Interceptor | `{name}.interceptor.ts` | `transform.interceptor.ts` |
| Pipe | `{name}.pipe.ts` | `validation.pipe.ts` |
| Strategy | `{name}.strategy.ts` | `jwt.strategy.ts` |

### Naming Rules

- **All kebab-case** for filenames: `level-query.dto.ts`
- **Singular nouns** for entities: `level.entity.ts` not `levels.entity.ts`
- **Plural nouns** for modules: `levels.module.ts`
- **Descriptive prefixes** for DTOs: `create-`, `update-`, `-query`, `-response`

---

## 4. Import Path Aliases

### Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@voqu/shared": ["../../packages/shared/src"],
      "@voqu/shared/*": ["../../packages/shared/src/*"]
    }
  }
}
```

### Import Order

```typescript
// 1. NestJS core imports
import { Module, Controller, Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 2. External libraries
import { Repository } from 'typeorm';

// 3. Shared package imports
import { UserRole, LevelStatus, VALIDATION } from '@voqu/shared';
import type { CreateLevelRequest } from '@voqu/shared';

// 4. Internal absolute imports (@/)
import { Level } from '@/database/entities';
import { JwtAuthGuard } from '@/common/guards';
import { CurrentUser } from '@/common/decorators';

// 5. Relative imports (same module)
import { LevelsService } from './levels.service';
import { CreateLevelDto } from './dto/create-level.dto';
```

### Import Examples

```typescript
// Entities
import { User, Level, Lesson } from '@/database/entities';

// Guards
import { JwtAuthGuard, AdminGuard, OwnerGuard } from '@/common/guards';

// Decorators
import { CurrentUser, Roles, Public } from '@/common/decorators';

// DTOs
import { PaginationQueryDto } from '@/common/dto';

// Exceptions
import { EntityNotFoundException } from '@/common/exceptions';

// Config
import { DatabaseConfig, AuthConfig } from '@/config';

// Shared types
import type { User as UserType, Level as LevelType } from '@voqu/shared';
import { UserRole, LevelStatus } from '@voqu/shared';
```

---

## 5. Module Architecture

### Module Structure

Every feature module follows this pattern:

```
modules/{feature}/
├── {feature}.module.ts         # Module definition
├── {feature}.controller.ts     # HTTP endpoints
├── {feature}.service.ts        # Business logic
└── dto/                        # Data transfer objects
    ├── create-{feature}.dto.ts
    ├── update-{feature}.dto.ts
    ├── {feature}-query.dto.ts
    └── {feature}-response.dto.ts
```

### Module Definition Pattern

```typescript
// modules/levels/levels.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from '@/database/entities';
import { LevelsController } from './levels.controller';
import { LevelsService } from './levels.service';

@Module({
  imports: [TypeOrmModule.forFeature([Level])],
  controllers: [LevelsController],
  providers: [LevelsService],
  exports: [LevelsService], // Export if other modules need it
})
export class LevelsModule {}
```

### Module Registration

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@/database/data-source';

// Feature modules
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';
import { LevelsModule } from '@/modules/levels/levels.module';
import { LessonsModule } from '@/modules/lessons/lessons.module';
import { TemplatesModule } from '@/modules/templates/templates.module';
import { ProgressModule } from '@/modules/progress/progress.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),

    // Feature modules
    AuthModule,
    UsersModule,
    LevelsModule,
    LessonsModule,
    TemplatesModule,
    ProgressModule,
  ],
})
export class AppModule {}
```

### Module Dependencies

| Module | Depends On | Exports |
|--------|------------|---------|
| AuthModule | UsersModule | AuthService, JwtStrategy |
| UsersModule | - | UsersService |
| LevelsModule | - | LevelsService |
| LessonsModule | LevelsModule | LessonsService |
| TemplatesModule | LessonsModule | TemplatesService |
| ProgressModule | UsersModule, LessonsModule | ProgressService |

---

## 6. Controller Pattern

### Controller Template

```typescript
// modules/levels/levels.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard, AdminGuard } from '@/common/guards';
import { CurrentUser, Public } from '@/common/decorators';
import { User } from '@/database/entities';
import { LevelsService } from './levels.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { LevelQueryDto } from './dto/level-query.dto';

@Controller('v1/levels')
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  /**
   * Get all levels with pagination and filtering
   * GET /api/v1/levels
   */
  @Get()
  @Public()
  findAll(@Query() query: LevelQueryDto) {
    return this.levelsService.findAll(query);
  }

  /**
   * Get level by ID
   * GET /api/v1/levels/:id
   */
  @Get(':id')
  @Public()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.levelsService.findOne(id);
  }

  /**
   * Get level by slug
   * GET /api/v1/levels/slug/:slug
   */
  @Get('slug/:slug')
  @Public()
  findBySlug(@Param('slug') slug: string) {
    return this.levelsService.findBySlug(slug);
  }

  /**
   * Create new level (Admin only)
   * POST /api/v1/levels
   */
  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateLevelDto, @CurrentUser() user: User) {
    return this.levelsService.create(createDto, user);
  }

  /**
   * Update level (Admin only)
   * PATCH /api/v1/levels/:id
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateLevelDto,
  ) {
    return this.levelsService.update(id, updateDto);
  }

  /**
   * Delete level (Admin only)
   * DELETE /api/v1/levels/:id
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.levelsService.remove(id);
  }
}
```

### Controller Rules

1. **No business logic** - Only request/response handling
2. **Use guards for auth** - `@UseGuards(JwtAuthGuard)`
3. **Use pipes for validation** - `ParseUUIDPipe`, `ValidationPipe`
4. **Use decorators for metadata** - `@CurrentUser()`, `@Roles()`
5. **Document endpoints** - JSDoc comments for each method
6. **Return service result** - Let interceptors handle transformation

### HTTP Methods & Status Codes

| Method | Success Code | Use Case |
|--------|--------------|----------|
| GET | 200 OK | Read operations |
| POST | 201 Created | Create operations |
| PATCH | 200 OK | Partial updates |
| PUT | 200 OK | Full updates |
| DELETE | 204 No Content | Delete operations |

---

## 7. Service Pattern

### Service Template

```typescript
// modules/levels/levels.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Level, User } from '@/database/entities';
import { generateSlug } from '@voqu/shared';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { LevelQueryDto } from './dto/level-query.dto';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {}

  /**
   * Find all levels with pagination and filtering
   */
  async findAll(query: LevelQueryDto) {
    const { page = 1, limit = 20, status, cefrLevel, search, sortBy, sortOrder } = query;

    const where: FindOptionsWhere<Level> = {};

    if (status) {
      where.status = status;
    }

    if (cefrLevel) {
      where.cefrLevel = cefrLevel;
    }

    if (search) {
      where.name = ILike(`%${search}%`);
    }

    const [data, total] = await this.levelRepository.findAndCount({
      where,
      order: { [sortBy || 'order']: sortOrder || 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Find level by ID
   * @throws NotFoundException if level not found
   */
  async findOne(id: string): Promise<Level> {
    const level = await this.levelRepository.findOne({
      where: { id },
      relations: ['lessons'],
    });

    if (!level) {
      throw new NotFoundException(`Level with ID "${id}" not found`);
    }

    return level;
  }

  /**
   * Find level by slug
   * @throws NotFoundException if level not found
   */
  async findBySlug(slug: string): Promise<Level> {
    const level = await this.levelRepository.findOne({
      where: { slug },
      relations: ['lessons'],
    });

    if (!level) {
      throw new NotFoundException(`Level with slug "${slug}" not found`);
    }

    return level;
  }

  /**
   * Create new level
   * @throws ConflictException if slug already exists
   */
  async create(dto: CreateLevelDto, createdBy: User): Promise<Level> {
    const slug = dto.slug || generateSlug(dto.name);

    // Check for duplicate slug
    const existing = await this.levelRepository.findOne({ where: { slug } });
    if (existing) {
      throw new ConflictException(`Level with slug "${slug}" already exists`);
    }

    const level = this.levelRepository.create({
      ...dto,
      slug,
      createdBy,
    });

    return this.levelRepository.save(level);
  }

  /**
   * Update level
   * @throws NotFoundException if level not found
   * @throws ConflictException if slug already exists
   */
  async update(id: string, dto: UpdateLevelDto): Promise<Level> {
    const level = await this.findOne(id);

    // Check slug uniqueness if changing
    if (dto.slug && dto.slug !== level.slug) {
      const existing = await this.levelRepository.findOne({
        where: { slug: dto.slug },
      });
      if (existing) {
        throw new ConflictException(`Level with slug "${dto.slug}" already exists`);
      }
    }

    Object.assign(level, dto);
    return this.levelRepository.save(level);
  }

  /**
   * Delete level
   * @throws NotFoundException if level not found
   */
  async remove(id: string): Promise<void> {
    const level = await this.findOne(id);
    await this.levelRepository.remove(level);
  }
}
```

### Service Rules

1. **All business logic here** - Validation, transformations, database operations
2. **Use repository pattern** - `@InjectRepository(Entity)`
3. **Throw HTTP exceptions** - `NotFoundException`, `ConflictException`, etc.
4. **Document methods** - JSDoc with `@throws` annotations
5. **Handle transactions** - Use `QueryRunner` for multi-table operations
6. **Return entities or DTOs** - Let controller/interceptor handle response

### Transaction Pattern

```typescript
async createWithRelations(dto: CreateComplexDto): Promise<Entity> {
  const queryRunner = this.dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const entity = queryRunner.manager.create(Entity, dto);
    await queryRunner.manager.save(entity);

    const related = queryRunner.manager.create(Related, { entityId: entity.id });
    await queryRunner.manager.save(related);

    await queryRunner.commitTransaction();
    return entity;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}
```

---

## 8. Database & Entities

### Entity Template

```typescript
// database/entities/level.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';
import { LevelStatus, CEFRLevel } from '@voqu/shared';
import { User } from './user.entity';
import { Lesson } from './lesson.entity';

@Entity('levels')
export class Level {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Index('idx_levels_slug', { unique: true })
  @Column({ length: 255, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Index('idx_levels_cefr')
  @Column({
    type: 'enum',
    enum: CEFRLevel,
  })
  cefrLevel: CEFRLevel;

  @Index('idx_levels_status')
  @Column({
    type: 'enum',
    enum: LevelStatus,
    default: LevelStatus.DRAFT,
  })
  status: LevelStatus;

  @Column({ default: 0 })
  order: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @OneToMany(() => Lesson, (lesson) => lesson.level)
  lessons: Lesson[];

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User | null;

  @Column({ name: 'created_by_id', nullable: true })
  createdById: string | null;
}
```

### Entity Rules

1. **Use decorators** - `@Entity`, `@Column`, `@Index`
2. **UUID primary keys** - `@PrimaryGeneratedColumn('uuid')`
3. **Snake_case columns** - `{ name: 'created_at' }`
4. **Explicit nullable** - `nullable: true` or `| null` type
5. **Index frequently queried** - `@Index()` on filter/sort columns
6. **Define both sides** - Foreign key column + relation

### Column Type Reference

| TypeScript | PostgreSQL | Decorator |
|------------|------------|-----------|
| string | VARCHAR | `@Column({ length: 255 })` |
| string | TEXT | `@Column({ type: 'text' })` |
| number | INTEGER | `@Column()` or `@Column({ type: 'int' })` |
| number | DECIMAL | `@Column({ type: 'decimal', precision: 10, scale: 2 })` |
| boolean | BOOLEAN | `@Column({ default: false })` |
| Date | TIMESTAMP | `@Column({ type: 'timestamp' })` |
| enum | ENUM | `@Column({ type: 'enum', enum: MyEnum })` |
| object | JSONB | `@Column({ type: 'jsonb' })` |

### Relation Types

```typescript
// One-to-Many
@OneToMany(() => Lesson, (lesson) => lesson.level)
lessons: Lesson[];

// Many-to-One
@ManyToOne(() => Level, (level) => level.lessons)
@JoinColumn({ name: 'level_id' })
level: Level;

@Column({ name: 'level_id' })
levelId: string;

// Many-to-Many
@ManyToMany(() => Tag)
@JoinTable({
  name: 'lesson_tags',
  joinColumn: { name: 'lesson_id' },
  inverseJoinColumn: { name: 'tag_id' },
})
tags: Tag[];
```

### Barrel Export

```typescript
// database/entities/index.ts
export { User } from './user.entity';
export { Level } from './level.entity';
export { Lesson } from './lesson.entity';
export { Template } from './template.entity';
export { Progress } from './progress.entity';
```

---

## 9. DTOs & Validation

### Create DTO Pattern

```typescript
// modules/levels/dto/create-level.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  Max,
  MaxLength,
  Matches,
} from 'class-validator';
import { CEFRLevel, LevelStatus, VALIDATION } from '@voqu/shared';

export class CreateLevelDto {
  @IsString()
  @IsNotEmpty({ message: 'Назва обов\'язкова' })
  @MaxLength(VALIDATION.NAME.MAX)
  name: string;

  @IsOptional()
  @IsString()
  @Matches(VALIDATION.SLUG.PATTERN, {
    message: 'Slug може містити лише малі літери, цифри та дефіси',
  })
  @MaxLength(VALIDATION.SLUG.MAX)
  slug?: string;

  @IsOptional()
  @IsString()
  @MaxLength(VALIDATION.DESCRIPTION.MAX)
  description?: string;

  @IsEnum(CEFRLevel, { message: 'Невірний рівень CEFR' })
  cefrLevel: CEFRLevel;

  @IsOptional()
  @IsEnum(LevelStatus)
  status?: LevelStatus;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
```

### Update DTO Pattern

```typescript
// modules/levels/dto/update-level.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateLevelDto } from './create-level.dto';

export class UpdateLevelDto extends PartialType(CreateLevelDto) {}
```

### Query DTO Pattern

```typescript
// modules/levels/dto/level-query.dto.ts
import {
  IsOptional,
  IsEnum,
  IsString,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CEFRLevel, LevelStatus, VALIDATION } from '@voqu/shared';

export class LevelQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page?: number = VALIDATION.PAGINATION.DEFAULT_PAGE;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(VALIDATION.PAGINATION.MAX_LIMIT)
  limit?: number = VALIDATION.PAGINATION.DEFAULT_LIMIT;

  @IsOptional()
  @IsEnum(LevelStatus)
  status?: LevelStatus;

  @IsOptional()
  @IsEnum(CEFRLevel)
  cefrLevel?: CEFRLevel;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(['name', 'order', 'createdAt'])
  sortBy?: 'name' | 'order' | 'createdAt';

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}
```

### Common Validators

| Decorator | Purpose | Example |
|-----------|---------|---------|
| `@IsString()` | Must be string | Text fields |
| `@IsNotEmpty()` | Cannot be empty | Required fields |
| `@IsOptional()` | Can be undefined | Optional fields |
| `@IsEmail()` | Valid email format | Email fields |
| `@IsUUID()` | Valid UUID | ID parameters |
| `@IsEnum(E)` | Must be enum value | Status, type fields |
| `@IsInt()` | Must be integer | Count, order fields |
| `@Min(n)` / `@Max(n)` | Numeric range | Pagination, order |
| `@MinLength(n)` / `@MaxLength(n)` | String length | Name, description |
| `@Matches(regex)` | Pattern match | Slug, phone |
| `@IsArray()` | Must be array | List inputs |
| `@ValidateNested()` | Validate nested object | Complex DTOs |

---

## 10. Authentication & Authorization

### Auth Module Setup

```typescript
// modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '@/modules/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

### JWT Strategy

```typescript
// modules/auth/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@/modules/users/users.service';

interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
```

### Guards

```typescript
// common/guards/jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@/common/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
```

```typescript
// common/guards/admin.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UserRole } from '@voqu/shared';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Admin access required');
    }

    return true;
  }
}
```

### Decorators

```typescript
// common/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@/database/entities';

export const CurrentUser = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as User;

    return data ? user?.[data] : user;
  },
);
```

```typescript
// common/decorators/public.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

```typescript
// common/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@voqu/shared';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
```

### Usage in Controllers

```typescript
@Controller('v1/levels')
export class LevelsController {
  // Public endpoint - no auth required
  @Get()
  @Public()
  findAll() {}

  // Authenticated user required
  @Get('my-progress')
  @UseGuards(JwtAuthGuard)
  getProgress(@CurrentUser() user: User) {}

  // Admin only
  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() dto: CreateLevelDto) {}

  // Role-based
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {}
}
```

---

## 11. Error Handling

### Global Exception Filter

```typescript
// common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string;
  details?: unknown[];
  timestamp: string;
  path: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';
    let details: unknown[] | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const res = exceptionResponse as Record<string, unknown>;
        message = (res.message as string) || message;
        error = (res.error as string) || error;
        details = res.details as unknown[];
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(exception.message, exception.stack);
    }

    const errorResponse: ErrorResponse = {
      statusCode: status,
      error,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (details) {
      errorResponse.details = details;
    }

    response.status(status).json(errorResponse);
  }
}
```

### Custom Exceptions

```typescript
// common/exceptions/entity-not-found.exception.ts
import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
  constructor(entityName: string, identifier: string | number) {
    super(`${entityName} with identifier "${identifier}" not found`);
  }
}
```

```typescript
// common/exceptions/duplicate-entity.exception.ts
import { ConflictException } from '@nestjs/common';

export class DuplicateEntityException extends ConflictException {
  constructor(entityName: string, field: string, value: string) {
    super(`${entityName} with ${field} "${value}" already exists`);
  }
}
```

### Error Codes Reference

| Status | Exception | Use Case |
|--------|-----------|----------|
| 400 | `BadRequestException` | Invalid request data |
| 401 | `UnauthorizedException` | Missing/invalid auth token |
| 403 | `ForbiddenException` | Insufficient permissions |
| 404 | `NotFoundException` | Resource not found |
| 409 | `ConflictException` | Duplicate resource |
| 422 | `UnprocessableEntityException` | Business logic error |
| 500 | `InternalServerErrorException` | Unexpected error |

---

## 12. Pagination & Filtering

### Shared Pagination DTO

```typescript
// common/dto/pagination-query.dto.ts
import { IsOptional, IsInt, Min, Max, IsEnum, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { VALIDATION } from '@voqu/shared';

export class PaginationQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page?: number = VALIDATION.PAGINATION.DEFAULT_PAGE;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @Max(VALIDATION.PAGINATION.MAX_LIMIT)
  limit?: number = VALIDATION.PAGINATION.DEFAULT_LIMIT;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'ASC';
}
```

### Paginated Response Helper

```typescript
// common/helpers/pagination.helper.ts
import { PaginationMeta } from '@voqu/shared';

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export function paginate<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): PaginatedResult<T> {
  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
```

### Service Implementation

```typescript
async findAll(query: LevelQueryDto): Promise<PaginatedResult<Level>> {
  const { page, limit, status, search, sortBy, sortOrder } = query;

  const queryBuilder = this.levelRepository.createQueryBuilder('level');

  // Filtering
  if (status) {
    queryBuilder.andWhere('level.status = :status', { status });
  }

  if (search) {
    queryBuilder.andWhere('level.name ILIKE :search', { search: `%${search}%` });
  }

  // Sorting
  queryBuilder.orderBy(`level.${sortBy || 'order'}`, sortOrder || 'ASC');

  // Pagination
  const [data, total] = await queryBuilder
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  return paginate(data, total, page, limit);
}
```

---

## 13. Database Migrations

### Migration Configuration

```typescript
// database/data-source.ts
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/database/entities/**/*.entity.js'],
  migrations: ['dist/database/migrations/**/*.js'],
  synchronize: false, // Never true in production
};

export const dataSource = new DataSource(dataSourceOptions);
```

### Migration Commands

```bash
# Generate migration from entity changes
npm run migration:generate -- src/database/migrations/CreateLevels

# Create empty migration
npm run migration:create -- src/database/migrations/SeedInitialData

# Run pending migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Show migration status
npm run migration:show
```

### Migration Template

**Important:** Always use raw SQL queries with `queryRunner.query()` for migrations. This ensures full control over the SQL being executed and makes migrations more predictable and portable.

```typescript
// database/migrations/1704067200000-create-levels.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLevels1704067200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Level" (
        "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "slug" VARCHAR(255) NOT NULL UNIQUE,
        "description" TEXT,
        "cefrLevel" VARCHAR(2) NOT NULL,
        "status" VARCHAR(20) NOT NULL DEFAULT 'draft',
        "order" INT NOT NULL DEFAULT 0,
        "createdById" BIGINT REFERENCES "User"("id") ON DELETE SET NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      CREATE INDEX ON "Level" ("slug");
      CREATE INDEX ON "Level" ("status");
      CREATE INDEX ON "Level" ("cefrLevel");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "Level"`);
  }
}
```

### Migration Rules

1. **Use raw SQL** - Always use `queryRunner.query()` with raw SQL instead of TypeORM's Table/TableIndex builders
2. **Use BIGINT for IDs** - Primary keys should use `BIGINT GENERATED ALWAYS AS IDENTITY`
3. **Use TIMESTAMP WITH TIME ZONE** - All timestamp columns should include timezone
4. **Use camelCase column names** - Wrap column names in double quotes to preserve casing
5. **Use PascalCase table names** - Table names should be PascalCase and wrapped in double quotes
6. **Create indexes inline** - Add `CREATE INDEX` statements in the same query block
7. **Always implement down()** - Ensure migrations can be reverted with `DROP TABLE IF EXISTS`

### Foreign Key Pattern

```typescript
await queryRunner.query(`
  CREATE TABLE "LessonProgress" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "userId" BIGINT REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
    "lessonId" BIGINT REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
    "completedAt" TIMESTAMP WITH TIME ZONE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  );
  CREATE INDEX ON "LessonProgress" ("userId");
  CREATE INDEX ON "LessonProgress" ("lessonId");
`);
```

### Migration Naming Convention

```
{timestamp}-{action}-{entity}.ts
```

Examples:
- `1704067200000-create-levels.ts`
- `1704067300000-add-status-to-lessons.ts`
- `1704067400000-create-level-lesson-relation.ts`
- `1704067500000-seed-initial-data.ts`

---

## 14. Configuration Management

### Environment Variables

```bash
# .env.example
# Application
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=voqu_dev

# Auth
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_AUDIENCE=your-audience

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Configuration Service

```typescript
// config/app.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
}));
```

```typescript
// config/database.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}));
```

### Using Configuration

```typescript
// In services/modules
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SomeService {
  constructor(private configService: ConfigService) {}

  someMethod() {
    const port = this.configService.get<number>('app.port');
    const dbHost = this.configService.get<string>('database.host');
  }
}
```

---

## 15. Testing

### Test File Structure

```
modules/levels/
├── levels.controller.ts
├── levels.service.ts
├── __tests__/
│   ├── levels.controller.spec.ts   # Unit tests
│   ├── levels.service.spec.ts      # Unit tests
│   └── levels.e2e-spec.ts          # E2E tests
```

### Unit Test Pattern

```typescript
// modules/levels/__tests__/levels.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { LevelsService } from '../levels.service';
import { Level } from '@/database/entities';
import { LevelStatus, CEFRLevel } from '@voqu/shared';

describe('LevelsService', () => {
  let service: LevelsService;
  let repository: Repository<Level>;

  const mockRepository = {
    findOne: jest.fn(),
    findAndCount: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LevelsService,
        {
          provide: getRepositoryToken(Level),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LevelsService>(LevelsService);
    repository = module.get<Repository<Level>>(getRepositoryToken(Level));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return a level when found', async () => {
      const level = { id: '1', name: 'Test Level' };
      mockRepository.findOne.mockResolvedValue(level);

      const result = await service.findOne('1');

      expect(result).toEqual(level);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['lessons'],
      });
    });

    it('should throw NotFoundException when level not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new level', async () => {
      const dto = { name: 'New Level', cefrLevel: CEFRLevel.A1 };
      const user = { id: 'user-1' };
      const level = { id: '1', ...dto, slug: 'new-level' };

      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(level);
      mockRepository.save.mockResolvedValue(level);

      const result = await service.create(dto as any, user as any);

      expect(result).toEqual(level);
    });

    it('should throw ConflictException when slug exists', async () => {
      const dto = { name: 'Test', slug: 'existing-slug', cefrLevel: CEFRLevel.A1 };
      mockRepository.findOne.mockResolvedValue({ id: 'existing' });

      await expect(service.create(dto as any, {} as any)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
```

### E2E Test Pattern

```typescript
// test/levels.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Levels (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    // Get auth token for protected routes
    // authToken = await getTestToken();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/v1/levels', () => {
    it('should return paginated levels', () => {
      return request(app.getHttpServer())
        .get('/api/v1/levels')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('meta');
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    it('should filter by status', () => {
      return request(app.getHttpServer())
        .get('/api/v1/levels?status=published')
        .expect(200)
        .expect((res) => {
          res.body.data.forEach((level: any) => {
            expect(level.status).toBe('published');
          });
        });
    });
  });

  describe('POST /api/v1/levels', () => {
    it('should require authentication', () => {
      return request(app.getHttpServer())
        .post('/api/v1/levels')
        .send({ name: 'Test' })
        .expect(401);
    });

    it('should create level with valid data', () => {
      return request(app.getHttpServer())
        .post('/api/v1/levels')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Level',
          cefrLevel: 'A1',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe('Test Level');
        });
    });

    it('should validate required fields', () => {
      return request(app.getHttpServer())
        .post('/api/v1/levels')
        .set('Authorization', `Bearer ${authToken}`)
        .send({})
        .expect(400);
    });
  });
});
```

---

## 16. API Documentation

### Swagger Setup

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Voqu API')
    .setDescription('English Learning Platform API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('levels', 'Learning levels management')
    .addTag('lessons', 'Lessons management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
```

### DTO Documentation

```typescript
// modules/levels/dto/create-level.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CEFRLevel, LevelStatus } from '@voqu/shared';

export class CreateLevelDto {
  @ApiProperty({
    description: 'Level display name',
    example: 'Beginner Basics',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'URL-friendly identifier',
    example: 'beginner-basics',
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    description: 'CEFR proficiency level',
    enum: CEFRLevel,
    example: CEFRLevel.A1,
  })
  @IsEnum(CEFRLevel)
  cefrLevel: CEFRLevel;
}
```

### Controller Documentation

```typescript
@ApiTags('levels')
@Controller('v1/levels')
export class LevelsController {
  @ApiOperation({ summary: 'Get all levels' })
  @ApiOkResponse({
    description: 'Paginated list of levels',
    type: LevelListResponseDto,
  })
  @Get()
  findAll(@Query() query: LevelQueryDto) {}

  @ApiOperation({ summary: 'Create new level' })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Level created successfully',
    type: LevelResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Admin access required' })
  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() dto: CreateLevelDto) {}
}
```

---

## 17. Code Quality Checklist

### Before Creating a PR

- [ ] No TypeScript errors (`npm run build`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] Unit tests pass (`npm run test`)
- [ ] E2E tests pass (`npm run test:e2e`)
- [ ] No console.log statements (use Logger instead)

### Module Checklist

- [ ] Module properly registered in AppModule
- [ ] All dependencies injected correctly
- [ ] Exports defined if needed by other modules

### Controller Checklist

- [ ] All endpoints documented with JSDoc
- [ ] Proper guards applied (auth, roles)
- [ ] DTOs used for request/response
- [ ] UUID params use `ParseUUIDPipe`
- [ ] Correct HTTP status codes

### Service Checklist

- [ ] All methods documented with JSDoc and `@throws`
- [ ] Proper exceptions thrown (NotFoundException, etc.)
- [ ] Transactions used for multi-table operations
- [ ] No N+1 queries (use relations or QueryBuilder)

### Entity Checklist

- [ ] All columns have proper types and constraints
- [ ] Indexes defined for frequently queried columns
- [ ] Relations have both sides defined
- [ ] Enums imported from `@voqu/shared`

### DTO Checklist

- [ ] All fields have validation decorators
- [ ] Optional fields use `@IsOptional()`
- [ ] Custom error messages for user-facing errors
- [ ] Query DTOs have `@Transform` for type conversion

---

*Document Version: 1.0*
*Last Updated: December 2024*
