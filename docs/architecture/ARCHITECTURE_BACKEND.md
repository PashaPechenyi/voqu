# Backend Architecture

> **Purpose:** Architecture guidelines, folder structure, and coding conventions for the NestJS + TypeORM + PostgreSQL backend application.
>
> **Related documents:**
>
> - [Shared Packages Architecture](./ARCHITECTURE_SHARED.md) - Types, constants, and utilities shared with frontend
> - [Frontend Architecture](./ARCHITECTURE_FRONTEND.md)
> - [Implementation Rules](./phases/IMPLEMENTATION_RULES.md) - Detailed implementation plan rules

---

## Table of Contents

- [1. Tech Stack Overview](#1-tech-stack-overview)
- [2. Folder Structure](#2-folder-structure)
- [3. File Naming Conventions](#3-file-naming-conventions)
- [4. Module Architecture](#4-module-architecture)
- [5. Controller Pattern](#5-controller-pattern)
- [6. Service Pattern](#6-service-pattern)
- [7. Repository Pattern](#7-repository-pattern)
- [8. Database & Entities](#8-database--entities)
- [9. DTOs & Validation](#9-dtos--validation)
- [10. Response DTOs](#10-response-dtos)
- [11. Structs (Interfaces & Enums)](#11-structs-interfaces--enums)
- [12. Error Handling](#12-error-handling)
- [13. Database Migrations](#13-database-migrations)
- [14. Seeds](#14-seeds)
- [15. Configuration Management](#15-configuration-management)
- [16. Bootstrap](#16-bootstrap)
- [17. Code Quality Checklist](#17-code-quality-checklist)

---

## 1. Tech Stack Overview

| Technology        | Version | Purpose                   |
| ----------------- | ------- | ------------------------- |
| NestJS            | 10.x    | Backend framework         |
| TypeScript        | 5.x     | Type safety               |
| TypeORM           | 0.3.x   | ORM for PostgreSQL        |
| PostgreSQL        | 15.x    | Primary database          |
| class-validator   | 0.14.x  | Request validation        |
| class-transformer | 0.5.x   | Object transformation     |
| Passport          | 0.7.x   | Auth strategies (planned) |
| passport-jwt      | 4.x     | JWT strategy (planned)    |
| jwks-rsa          | 3.x     | JWKS support (planned)    |

### Why This Stack?

- **NestJS** - Modular architecture, native TypeScript, built-in DI
- **TypeORM** - Decorator-based entities, migrations, excellent TypeScript support
- **PostgreSQL** - Robust relational database, great for structured data

---

## 2. Folder Structure

```
apps/api/
├── src/
│   ├── main.ts                             # Application entry point
│   ├── app.module.ts                       # Root module
│   │
│   ├── modules/                            # Feature modules
│   │   ├── auth/                           # Authentication (planned)
│   │   ├── user/
│   │   │   ├── user.module.ts
│   │   │   └── repositories/
│   │   │       └── user.repository.ts
│   │   │
│   │   ├── role/
│   │   │   └── structs/
│   │   │       └── role-slug.enum.ts
│   │   │
│   │   ├── level/
│   │   │   ├── level.module.ts
│   │   │   ├── http/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── level.controller.ts
│   │   │   │   └── dto/
│   │   │   │       └── level-list-response.dto.ts
│   │   │   ├── services/
│   │   │   │   └── level.service.ts
│   │   │   └── repositories/
│   │   │       └── level.repository.ts
│   │   │
│   │   ├── course/
│   │   │   ├── course.module.ts
│   │   │   ├── http/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── course.controller.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-course.dto.ts
│   │   │   │       └── create-course-response.dto.ts
│   │   │   ├── services/
│   │   │   │   └── course.service.ts
│   │   │   ├── repositories/
│   │   │   │   └── course.repository.ts
│   │   │   └── structs/
│   │   │       ├── course-status.enum.ts
│   │   │       └── create-course-params.interface.ts
│   │   │
│   │   ├── lesson/                         # (planned)
│   │   ├── progress/                       # (planned)
│   │   └── templates/                      # (planned)
│   │
│   ├── database/
│   │   ├── data-source.ts                  # TypeORM data source
│   │   ├── entities/                       # Entity definitions
│   │   │   ├── base.entity.ts              # BIGINT identity id
│   │   │   ├── base-secured.entity.ts      # UUID id (extends BaseEntity)
│   │   │   ├── role.entity.ts
│   │   │   ├── user.entity.ts
│   │   │   ├── level.entity.ts
│   │   │   ├── course.entity.ts
│   │   │   ├── lesson.entity.ts
│   │   │   └── example.entity.ts
│   │   ├── repositories/
│   │   │   └── base.repository.ts          # Shared repository base class
│   │   ├── migrations/                     # Schema migrations
│   │   │   ├── 1776100610000-create-role.ts
│   │   │   ├── 1776100615000-create-user.ts
│   │   │   ├── 1776100620000-create-level.ts
│   │   │   ├── 1776100625000-create-course.ts
│   │   │   └── 1776100628000-create-lesson.ts
│   │   └── seeds/                          # Data seed migrations
│   │       ├── 1776100611000-seed-roles.ts
│   │       ├── 1776100612000-seed-delegable-roles.ts
│   │       ├── 1776100616000-seed-super-admin.ts
│   │       └── 1776100630000-seed-levels.ts
│   │
│   ├── common/
│   │   ├── decorators/                     # Custom decorators (empty, planned)
│   │   ├── guards/                         # Auth guards (empty, planned)
│   │   ├── filters/                        # Exception filters (empty, planned)
│   │   ├── interceptors/                   # Request interceptors (empty, planned)
│   │   ├── exceptions/
│   │   │   └── entity-not-found.exception.ts
│   │   └── http/
│   │       └── dto/
│   │           └── base-response.dto.ts
│   │
│   └── config/                             # Reserved for ConfigService registrations
│
├── nest-cli.json
├── tsconfig.json
└── package.json
```

### Key layout rules

1. Only `{name}.module.ts` lives at the module root. Everything else is grouped into subfolders: `http/controllers`, `http/dto`, `services`, `repositories`, `structs`.
2. A module may omit any subfolder it does not need (for example, `user/` has only `repositories/`, `role/` has only `structs/`).
3. All TypeORM entities live in `src/database/entities/`, **not** inside a feature module.
4. A shared `BaseRepository<T>` lives in `src/database/repositories/`.

---

## 3. File Naming Conventions

### Module Files

| Type       | Pattern                   | Example                |
| ---------- | ------------------------- | ---------------------- |
| Module     | `{feature}.module.ts`     | `course.module.ts`     |
| Controller | `{feature}.controller.ts` | `course.controller.ts` |
| Service    | `{feature}.service.ts`    | `course.service.ts`    |
| Repository | `{feature}.repository.ts` | `course.repository.ts` |
| Entity     | `{entity}.entity.ts`      | `course.entity.ts`     |

### DTO Files

| Type                   | Pattern                             | Example                         |
| ---------------------- | ----------------------------------- | ------------------------------- |
| Create request DTO     | `create-{entity}.dto.ts`            | `create-course.dto.ts`          |
| Update request DTO     | `update-{entity}.dto.ts`            | `update-course.dto.ts`          |
| Operation response DTO | `{action}-{entity}-response.dto.ts` | `create-course-response.dto.ts` |
| List response DTO      | `{entity}-list-response.dto.ts`     | `level-list-response.dto.ts`    |

### Structs

| Type      | Pattern               | Example                             |
| --------- | --------------------- | ----------------------------------- |
| Enum      | `{name}.enum.ts`      | `course-status.enum.ts`             |
| Interface | `{name}.interface.ts` | `create-course-params.interface.ts` |

### Naming Rules

- **kebab-case** for filenames: `create-course.dto.ts`.
- **Singular nouns** for entity files and feature folders: `course.entity.ts`, `modules/course/`.
- Interface names are **PascalCase with an `I` prefix**: `ICreateCourseParams`.
- Enum values use **PascalCase**: `CourseStatus.Draft`, `RoleSlug.SuperAdmin`.
- Enum **string values** stay kebab-case/lowercase: `'super-admin'`, `'draft'`.

---

## 4. Module Architecture

### Module Structure

Every feature module follows this layout (omit subfolders the module does not need):

```
modules/{feature}/
├── {feature}.module.ts
├── http/
│   ├── controllers/
│   │   └── {feature}.controller.ts
│   └── dto/
│       ├── create-{feature}.dto.ts
│       └── create-{feature}-response.dto.ts
├── services/
│   └── {feature}.service.ts
├── repositories/
│   └── {feature}.repository.ts
└── structs/
    ├── {feature}-status.enum.ts
    └── create-{feature}-params.interface.ts
```

### Module Definition Pattern

```typescript
// modules/course/course.module.ts
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { CourseController } from './http/controllers/course.controller';
import { CourseService } from './services/course.service';
import { CourseRepository } from './repositories/course.repository';

@Module({
  imports: [UserModule],
  controllers: [CourseController],
  providers: [CourseRepository, CourseService],
  exports: [CourseService],
})
export class CourseModule {}
```

### Module Registration

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';
import { CourseModule } from './modules/course/course.module';
import { LevelModule } from './modules/level/level.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot(dataSourceOptions),
    LevelModule,
    CourseModule,
  ],
})
export class AppModule {}
```

### Repository Registration

Repositories are registered as plain Nest providers (they extend `BaseRepository` and inject the `DataSource` directly). Do **not** register them through `TypeOrmModule.forFeature([...])`.

### Module Dependencies

A module that needs another module's repository imports that module and consumes the exported provider. Example: `CourseModule` imports `UserModule` to use `UserRepository`; `UserModule` exports `UserRepository`.

---

## 5. Controller Pattern

### Controller Template

```typescript
// modules/course/http/controllers/course.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { CourseService } from '../../services/course.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { CreateCourseResponseDto } from '../dto/create-course-response.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() body: CreateCourseDto): Promise<CreateCourseResponseDto> {
    const course = await this.courseService.createCourse(body);
    return new CreateCourseResponseDto(course.id!);
  }
}
```

### Controller Rules

1. **No business logic.** Controllers only wire HTTP → service → response DTO.
2. **Route path is the singular feature name** (`@Controller('course')`, `@Controller('level')`). The global prefix `api` is added in `main.ts`, so the resulting URL is `/api/course`.
3. **Request body type is the DTO class**, and the controller passes `body` straight to the service — the service accepts it as the `ICreate{Feature}Params` interface that the DTO implements.
4. **Every response is a response-DTO instance** that extends `BaseResponseDto`. Never return an entity directly.
5. **Use `ValidationPipe` globally** (configured in `main.ts`); no per-route pipes are required for DTO validation.

### HTTP Methods & Status Codes

| Method | Success Code   | Use Case          |
| ------ | -------------- | ----------------- |
| GET    | 200 OK         | Read operations   |
| POST   | 201 Created    | Create operations |
| PATCH  | 200 OK         | Partial updates   |
| PUT    | 200 OK         | Full updates      |
| DELETE | 204 No Content | Delete operations |

---

## 6. Service Pattern

### Service Template

```typescript
// modules/course/services/course.service.ts
import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '../../../common/exceptions/entity-not-found.exception';
import { Course } from '../../../database/entities/course.entity';
import { User } from '../../../database/entities/user.entity';
import { RoleSlug } from '../../role/structs/role-slug.enum';
import { UserRepository } from '../../user/repositories/user.repository';
import { ICreateCourseParams } from '../structs/create-course-params.interface';
import { CourseRepository } from '../repositories/course.repository';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createCourse(params: ICreateCourseParams): Promise<Course> {
    const owner = await this.userRepository.findOneBySlug(RoleSlug.SuperAdmin);
    if (!owner) {
      throw new EntityNotFoundException({ entity: User, ctx: { roleSlug: RoleSlug.SuperAdmin } });
    }

    return this.courseRepository.create({ ...params, OwnerId: owner.id });
  }
}
```

### Service Rules

1. **Business logic lives here** — validation beyond shape checks, cross-entity lookups, transformations, persistence orchestration.
2. **Input type is the struct interface** (`ICreate{Feature}Params`), not the DTO class. This keeps services decoupled from HTTP concerns.
3. **Use feature repositories** (`CourseRepository`, `UserRepository`). Never inject the raw TypeORM `Repository<T>` or `@InjectRepository` in services.
4. **Throw domain exceptions** such as `EntityNotFoundException` (see [§12](#12-error-handling)).
5. **Return entities**; the controller wraps them in a response DTO.

---

## 7. Repository Pattern

All feature repositories extend `BaseRepository<T>` from `src/database/repositories/base.repository.ts`.

### Feature Repository Template

```typescript
// modules/course/repositories/course.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Course } from '../../../database/entities/course.entity';
import { BaseRepository } from '../../../database/repositories/base.repository';

@Injectable()
export class CourseRepository extends BaseRepository<Course> {
  constructor(dataSource: DataSource) {
    super(dataSource, Course);
  }
}
```

### Repository with Custom Queries

```typescript
// modules/user/repositories/user.repository.ts
@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(dataSource: DataSource) {
    super(dataSource, User);
  }

  async findOneBySlug(slug: RoleSlug): Promise<User | null> {
    return this.orm.findOne({
      where: { Role: { slug } },
      relations: { Role: true },
    });
  }
}
```

### `BaseRepository` Helpers

| Method                                    | Purpose                                                              |
| ----------------------------------------- | -------------------------------------------------------------------- |
| `create(item)`                            | Insert + return the inserted row (bypasses TypeORM's default create) |
| `createWithId(item)`                      | Insert including a caller-provided `id`                              |
| `update(id, values)`                      | Update by id, returns the updated row                                |
| `updateWhere(where, values)`              | Update by conditions, returns the updated row                        |
| `deleteWhere(where)`                      | Delete by conditions                                                 |
| `upsertOne(item, conflictTarget)`         | Merge-then-save upsert driven by a conflict-target column set        |
| `findOne(options)` / `findOneBy(where)`   | Overridden to always build a QueryBuilder with the entity alias      |
| `findOneOrThrowException(options)`        | `findOne` that throws `EntityNotFoundException` when missing         |
| `findOrThrowException(options)`           | `find` that throws when no rows match                                |
| `getOneById(id)` / `getOneByIdOrFail(id)` | Lookup by primary key                                                |
| `getOneBy(conditions)` / `…OrFail`        | Lookup by a map of column equalities                                 |

### Repository Rules

1. **Never inject `Repository<T>` from TypeORM directly** in services. Always go through the feature repository.
2. When a feature needs only a repository (no controller/service yet), expose it through the module's `exports`, as `UserModule` does.
3. Custom query methods belong in the feature repository, not in services.

---

## 8. Database & Entities

### Base Entities

Two base classes live in `src/database/entities/`:

```typescript
// base.entity.ts — BIGINT identity primary key
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id?: string;

  @Column({ type: 'timestamptz' })
  createdAt?: string;

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: string;

  public static getName(): string {
    return this.name;
  }
}

// base-secured.entity.ts — UUID primary key
export class BaseSecuredEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  declare id?: string;
}
```

Choose the base class based on whether the entity's id is exposed to clients:

- **`BaseEntity`** (BIGINT) — reference/lookup data such as `Level`.
- **`BaseSecuredEntity`** (UUID) — user-facing resources such as `User`, `Role`, `Course`, `Lesson`.

### Entity Template

```typescript
// database/entities/course.entity.ts
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseSecuredEntity } from './base-secured.entity';
import { CourseStatus } from '../../modules/course/structs/course-status.enum';
import { Level } from './level.entity';
import { Lesson } from './lesson.entity';
import { User } from './user.entity';

@Entity('Course')
export class Course extends BaseSecuredEntity {
  @Column({ length: 255 })
  name?: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ length: 20, default: CourseStatus.Draft })
  status?: CourseStatus;

  @ManyToOne(() => Level, (level) => level.Courses)
  @JoinColumn({ name: 'LevelId' })
  Level?: Level;

  @Column({ name: 'LevelId' })
  LevelId?: string;

  @ManyToOne(() => User, (user) => user.Courses)
  @JoinColumn({ name: 'OwnerId' })
  Owner?: User;

  @Column({ name: 'OwnerId' })
  OwnerId?: string;

  @OneToMany(() => Lesson, (lesson) => lesson.Course)
  Lessons?: Lesson[];
}
```

### Entity Rules

1. **Every property is optional (`?`)** — columns, FKs, and relations alike. This lets partial objects be assignable and mirrors how data comes back from query builders.
2. **Table name is PascalCase singular**: `@Entity('Course')`, `@Entity('User')`.
3. **Column names are camelCase** (not snake_case). Both the TS property and the DB column share the same camelCase identifier (preserved through double-quoted identifiers in migrations).
4. **Foreign keys are PascalCase**: `RoleId`, `LevelId`, `OwnerId`. The corresponding relation property is also PascalCase: `Role`, `Level`, `Owner`.
5. **Always declare both sides** of a FK — the `@Column({ name: 'LevelId' })` scalar _and_ the `@ManyToOne … @JoinColumn({ name: 'LevelId' })` relation.
6. **Use `timestamptz`** for all timestamps (enforced by `BaseEntity`).
7. **Enums stored as short VARCHAR** with a default, not as Postgres `ENUM`. See `Course.status` (`length: 20, default: CourseStatus.Draft`).
8. **Entities do NOT import DTOs or services** — only other entities and shared structs (enums).

### Column Type Reference

| TypeScript       | PostgreSQL               | Decorator                                        |
| ---------------- | ------------------------ | ------------------------------------------------ |
| `string`         | VARCHAR                  | `@Column({ length: 255 })`                       |
| `string \| null` | TEXT                     | `@Column({ type: 'text', nullable: true })`      |
| `number`         | INTEGER                  | `@Column()` / `@Column({ default: 0 })`          |
| `boolean`        | BOOLEAN                  | `@Column({ default: false })`                    |
| `string` (tz)    | TIMESTAMP WITH TIME ZONE | `@Column({ type: 'timestamptz' })`               |
| enum             | VARCHAR(n)               | `@Column({ length: 20, default: MyEnum.Value })` |
| `T[]` / object   | JSONB                    | `@Column({ type: 'jsonb', default: [] })`        |

### Indexes

Indexes are declared on the entity with `@Index('idx_{table}_{column}')`:

```typescript
@Index('idx_user_email')
@Column({ length: 255, unique: true })
email?: string;
```

Matching `CREATE INDEX` statements are added in the migration (see [§13](#13-database-migrations)).

### Relation Patterns

```typescript
// One-to-Many
@OneToMany(() => Course, (course) => course.Level)
Courses?: Course[];

// Many-to-One
@ManyToOne(() => Level, (level) => level.Courses)
@JoinColumn({ name: 'LevelId' })
Level?: Level;

@Column({ name: 'LevelId' })
LevelId?: string;
```

---

## 9. DTOs & Validation

Request DTOs live in `modules/{feature}/http/dto/` and **implement** the matching struct interface. Validation uses `class-validator`; the global `ValidationPipe` in `main.ts` applies `whitelist`, `forbidNonWhitelisted`, and `transform`.

### Create DTO Pattern

```typescript
// modules/course/http/dto/create-course.dto.ts
import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CourseStatus } from '../../structs/course-status.enum';
import { ICreateCourseParams } from '../../structs/create-course-params.interface';

export class CreateCourseDto implements ICreateCourseParams {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(CourseStatus)
  status?: CourseStatus;

  @IsNumberString()
  @IsNotEmpty()
  LevelId: string;
}
```

### DTO Rules

1. **Every request DTO `implements I{Action}{Feature}Params`** from `structs/`. Services consume the interface — so the DTO is the controller-facing implementation of the same shape.
2. **FK fields keep their PascalCase name** (`LevelId`, `RoleId`) to match the entity contract end-to-end.
3. **Use `@IsNumberString()` for BIGINT FKs** (e.g. `LevelId`) because they are serialized as strings. Use `@IsUUID()` for UUID FKs when applicable.
4. **Mark optional fields with `@IsOptional()`** and make the TS property optional (`?`).
5. **Validation messages** can be localized (Ukrainian is acceptable) when user-facing; otherwise leave default messages.

### Common Validators

| Decorator                    | Purpose                        |
| ---------------------------- | ------------------------------ |
| `@IsString()`                | Must be string                 |
| `@IsNotEmpty()`              | Cannot be empty                |
| `@IsOptional()`              | Can be undefined               |
| `@IsEmail()`                 | Valid email format             |
| `@IsUUID()`                  | UUID primary key value         |
| `@IsNumberString()`          | BIGINT id serialized as string |
| `@IsEnum(E)`                 | Must be enum value             |
| `@IsInt()` / `@Min` / `@Max` | Integer ranges                 |
| `@MinLength` / `@MaxLength`  | String length                  |
| `@Matches(regex)`            | Pattern match                  |

---

## 10. Response DTOs

All controller responses **must** be instances of a class that extends `BaseResponseDto`. Returning an entity directly is not allowed.

### Base Response

```typescript
// common/http/dto/base-response.dto.ts
export class BaseResponseDto {
  constructor(success = true) {
    this.success = success;
  }

  success: boolean;
}
```

### Operation Response

```typescript
// modules/course/http/dto/create-course-response.dto.ts
import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';

export class CreateCourseResponseDto extends BaseResponseDto {
  constructor(id: string) {
    super();
    this.id = id;
  }

  id: string;
}
```

### List Response

```typescript
// modules/level/http/dto/level-list-response.dto.ts
import { BaseResponseDto } from '../../../../common/http/dto/base-response.dto';
import { Level } from '../../../../database/entities/level.entity';

export class LevelListResponseDto extends BaseResponseDto {
  constructor(items: Level[]) {
    super();
    this.items = items;
  }

  items: Level[];
}
```

### Response DTO Rules

1. **Every endpoint return type is a `…ResponseDto` class** that extends `BaseResponseDto`.
2. **The constructor takes the final payload** and assigns fields on `this`; call `super()` first.
3. **List endpoints expose an `items` field**. Operation endpoints expose the relevant ids/fields directly.
4. **It is acceptable to ship entities inside a response DTO field** (e.g. `items: Level[]`). Entities are treated as read-only payload DTOs for the response layer. If a client-facing shape needs to diverge from the entity, introduce a dedicated view DTO.

---

## 11. Structs (Interfaces & Enums)

The `modules/{feature}/structs/` folder holds transport-layer contracts shared between controller, DTO, and service.

### Params Interface

```typescript
// modules/course/structs/create-course-params.interface.ts
import { CourseStatus } from './course-status.enum';

export interface ICreateCourseParams {
  name: string;
  description?: string;
  status?: CourseStatus;
  LevelId: string;
}
```

### Enum

```typescript
// modules/course/structs/course-status.enum.ts
export enum CourseStatus {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived',
}
```

```typescript
// modules/role/structs/role-slug.enum.ts
export enum RoleSlug {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
  SuperAdmin = 'super-admin',
}
```

### Struct Rules

1. **Interface name is `I{Action}{Feature}Params`** for DTO-backed interfaces: `ICreateCourseParams`, `IUpdateCourseParams`.
2. **Enum keys are PascalCase**; string values are kebab-case or lowercase depending on context (`RoleSlug.SuperAdmin = 'super-admin'`, `CourseStatus.Draft = 'draft'`).
3. **Entities may import enums from `structs/`** (see `course.entity.ts`). Entities must **not** import interfaces or DTOs.
4. **Services accept struct interfaces, not DTO classes** as their input type.

---

## 12. Error Handling

The project currently relies on NestJS' built-in HTTP exceptions plus one custom exception.

### EntityNotFoundException

```typescript
// common/exceptions/entity-not-found.exception.ts
import { NotFoundException } from '@nestjs/common';
import { EntityTarget } from 'typeorm';

export interface EntityNotFoundContext {
  entity: EntityTarget<any> | any;
  ctx?: unknown;
}

export class EntityNotFoundException extends NotFoundException {
  constructor({ entity, ctx }: EntityNotFoundContext) {
    const name = typeof entity === 'function' ? entity.name : String(entity);
    super({ message: `${name} not found`, entity: name, ctx });
  }
}
```

Usage:

```typescript
throw new EntityNotFoundException({
  entity: User,
  ctx: { roleSlug: RoleSlug.SuperAdmin },
});
```

This is also thrown automatically by `BaseRepository.findOneOrThrowException`, `findOrThrowException`, `getOneByIdOrFail`, and `getOneByOrFail`.

### Error Codes Reference

| Status | Exception                      | Use Case                   |
| ------ | ------------------------------ | -------------------------- |
| 400    | `BadRequestException`          | Invalid request data       |
| 401    | `UnauthorizedException`        | Missing/invalid auth token |
| 403    | `ForbiddenException`           | Insufficient permissions   |
| 404    | `EntityNotFoundException`      | Resource not found         |
| 409    | `ConflictException`            | Duplicate resource         |
| 422    | `UnprocessableEntityException` | Business logic error       |
| 500    | `InternalServerErrorException` | Unexpected error           |

Global filters, auth guards, decorators, and interceptors are not implemented yet. The folders exist in `src/common/` as placeholders for when they land.

---

## 13. Database Migrations

### Data Source

```typescript
// src/database/data-source.ts
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}', __dirname + '/seeds/**/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
};
```

Both `migrations/` and `seeds/` are loaded as migrations — the only difference is intent (schema vs. data).

### Migration Commands

```bash
# Create empty schema migration
npm run migration:create ./1776100640000-add-something

# Create empty seed migration
npm run seed:create ./1776100640000-seed-something

# Apply all pending migrations (schema + seeds)
npm run migration:up

# Revert the most recently applied migration
npm run migration:down
```

### Migration Template

**Always use raw SQL via `queryRunner.query()`** — do not use TypeORM's `Table` / `TableIndex` builders.

```typescript
// database/migrations/1776100625000-create-course.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourse1776100625000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Course" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "status" VARCHAR(20) NOT NULL DEFAULT 'draft',
        "LevelId" BIGINT NOT NULL REFERENCES "Level" ("id") ON DELETE CASCADE,
        "OwnerId" UUID NOT NULL REFERENCES "User" ("id") ON DELETE CASCADE,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      CREATE INDEX "idx_course_LevelId" ON "Course" ("LevelId");
      CREATE INDEX "idx_course_OwnerId" ON "Course" ("OwnerId");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "Course"`);
  }
}
```

### Migration Rules

1. **Raw SQL only** via `queryRunner.query()`.
2. **Primary key types**:
   - `UUID NOT NULL DEFAULT gen_random_uuid()` for entities extending `BaseSecuredEntity`.
   - `BIGINT GENERATED ALWAYS AS IDENTITY` for entities extending `BaseEntity`.
3. **Timestamps**: `TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()` for `"createdAt"` and `"updatedAt"`.
4. **Identifiers are quoted** to preserve casing — PascalCase tables (`"Course"`), camelCase columns (`"createdAt"`), and PascalCase FK columns (`"LevelId"`, `"OwnerId"`).
5. **Foreign keys are inline** with `REFERENCES "Parent" ("id") ON DELETE …`.
6. **Indexes are named** `idx_{tableLower}_{column}` and created in the same `up()` block.
7. **Always implement `down()`** with `DROP TABLE IF EXISTS "…"` (or the inverse of the schema change).

### Migration Naming Convention

```
{timestamp}-{kebab-action-entity}.ts
```

Class name is PascalCase + the same timestamp suffix: `CreateCourse1776100625000`. Current timestamps use the `17761xxxxxxxx` range.

Examples:

- `1776100610000-create-role.ts` → `CreateRole1776100610000`
- `1776100625000-create-course.ts` → `CreateCourse1776100625000`
- `1776100628000-create-lesson.ts` → `CreateLesson1776100628000`

### Foreign Key Pattern

```sql
"LevelId"  BIGINT NOT NULL REFERENCES "Level" ("id") ON DELETE CASCADE,
"OwnerId"  UUID   NOT NULL REFERENCES "User"  ("id") ON DELETE CASCADE
```

FK column types must match the parent PK type (BIGINT for `BaseEntity`, UUID for `BaseSecuredEntity`).

---

## 14. Seeds

Seeds live in `src/database/seeds/` and use the same `MigrationInterface` contract as schema migrations. They are picked up by the data source's `migrations` glob automatically.

### Seed Template

```typescript
// database/seeds/1776100611000-seed-roles.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRoles1776100611000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "Role" ("name", "slug")
      VALUES
        ('Student', 'student'),
        ('Teacher', 'teacher'),
        ('Admin', 'admin'),
        ('Super Admin', 'super-admin');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "Role" WHERE "slug" IN ('student', 'teacher', 'admin', 'super-admin')`,
    );
  }
}
```

### Seed Rules

1. **Seeds are reversible.** Every `up()` has a matching `down()` that removes only the rows the seed inserted — no blanket `DELETE FROM "Role"`.
2. **Ordering by timestamp.** Seeds that depend on a schema migration must have a later timestamp than that migration; seeds that depend on other seeds likewise.
3. **Derive ids by lookup**, not by hardcoding, when linking rows:

   ```typescript
   const role = await queryRunner.query(`SELECT id FROM "Role" WHERE "slug" = 'super-admin';`);
   const roleId = role[0].id;
   ```

4. **Use the same quoted-identifier discipline** as schema migrations.

---

## 15. Configuration Management

`ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })` is registered once in `AppModule`. There are no registered namespaces yet — access variables via `process.env` (inside `data-source.ts`) or `ConfigService.get('VAR_NAME')`.

### Environment Variables

```bash
# Application
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:5173

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=voqu_dev
```

The `src/config/` folder is reserved for future `registerAs()` config groups (app, database, auth). It is currently empty.

---

## 16. Bootstrap

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
```

Bootstrap responsibilities:

- Set `api` as the global route prefix (so controllers use paths like `@Controller('course')`).
- Enable CORS for the configured origin.
- Register a single global `ValidationPipe` with `whitelist`, `forbidNonWhitelisted`, and `transform` — individual controllers don't need their own pipes.

---

## 17. Code Quality Checklist

### Before Creating a PR

- [ ] No TypeScript errors (`npm run build`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Migrations and seeds apply cleanly on a fresh DB (`npm run migration:up`)
- [ ] No `console.log` in committed code (use NestJS `Logger` if needed)

### Module Checklist

- [ ] Only `{name}.module.ts` at the module root; everything else under `http/`, `services/`, `repositories/`, `structs/`
- [ ] Module registered in `AppModule`
- [ ] Dependent modules imported; only what downstream modules need is re-exported

### Controller Checklist

- [ ] Path is singular feature name (`@Controller('course')`)
- [ ] `@Body()` typed as the request DTO
- [ ] Return type is a `…ResponseDto` extending `BaseResponseDto`
- [ ] No business logic; just service call + response DTO construction

### Service Checklist

- [ ] Parameters typed as the struct interface (`ICreate{Feature}Params`), never as the DTO class
- [ ] Uses feature repositories only — no `@InjectRepository` / raw `Repository<T>`
- [ ] Throws `EntityNotFoundException` (or relies on `BaseRepository.*OrFail` helpers) for missing rows

### Repository Checklist

- [ ] Extends `BaseRepository<T>`
- [ ] Constructor takes `DataSource` and forwards entity to `super()`
- [ ] Custom finders live here, not in the service

### Entity Checklist

- [ ] Extends `BaseEntity` (BIGINT) or `BaseSecuredEntity` (UUID), as appropriate
- [ ] All properties declared optional (`?`)
- [ ] Table name is PascalCase singular (`@Entity('Course')`)
- [ ] FK columns and relation properties are PascalCase (`LevelId`, `Level`)
- [ ] Both sides of every FK are declared (scalar `@Column` + relation)
- [ ] Indexes declared via `@Index('idx_{table}_{column}')` and also created in the migration

### DTO Checklist

- [ ] Request DTO `implements I{Action}{Feature}Params`
- [ ] All fields have `class-validator` decorators
- [ ] Optional fields use `@IsOptional()` and `?`
- [ ] BIGINT FKs validated with `@IsNumberString()`, UUID FKs with `@IsUUID()`
- [ ] Response DTO extends `BaseResponseDto` and is constructed in the controller

### Migration Checklist

- [ ] Raw SQL only (`queryRunner.query()`)
- [ ] Correct PK type (`UUID gen_random_uuid()` vs `BIGINT GENERATED ALWAYS AS IDENTITY`) for the parent entity's base class
- [ ] `createdAt` / `updatedAt` are `TIMESTAMP WITH TIME ZONE DEFAULT NOW()`
- [ ] Table and FK column identifiers quoted to preserve casing
- [ ] Indexes named `idx_{table}_{column}` and created inline with the table
- [ ] `down()` implemented and reversible

---

_Document Version: 2.0_
_Last Updated: 2026-04-19_
