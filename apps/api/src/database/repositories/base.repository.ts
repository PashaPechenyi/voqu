import {
  DataSource,
  EntityTarget,
  FindManyOptions,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EntityNotFoundException } from '../../common/exceptions/entity-not-found.exception';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  protected readonly Entity: EntityTarget<T> | any;
  public readonly orm: Repository<T>;

  constructor(connection: DataSource, Entity: EntityTarget<T>) {
    super(Entity, connection.createEntityManager());
    this.orm = connection.getRepository<T>(Entity);
    this.Entity = Entity;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public async create(item: T): Promise<T> {
    return this.orm
      .createQueryBuilder()
      .insert()
      .into(this.Entity)
      .values([item])
      .returning('*')
      .execute()
      .then(({ raw }: InsertResult) => raw.at(0));
  }

  public async createWithId(item: T): Promise<T> {
    const columnNames = this.orm.metadata.columns.map((column) => column.propertyName);
    return this.orm
      .createQueryBuilder()
      .insert()
      .into(this.Entity, columnNames)
      .values([item])
      .returning('*')
      .execute()
      .then(({ raw }: InsertResult) => raw.at(0));
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public async update(itemId: string, values: QueryDeepPartialEntity<T>): Promise<T> {
    return this.orm
      .createQueryBuilder()
      .update(this.Entity)
      .set(values)
      .where('id = :id', { id: itemId })
      .returning('*')
      .execute()
      .then(({ raw }: UpdateResult) => raw.at(0));
  }

  public async updateWhere(where: any, values: QueryDeepPartialEntity<T>): Promise<T> {
    return this.orm
      .createQueryBuilder()
      .update(this.Entity)
      .set(values)
      .where({ ...where })
      .returning('*')
      .execute()
      .then(({ raw }: UpdateResult) => raw.at(0));
  }

  public async deleteWhere(where: any) {
    return this.orm.createQueryBuilder().delete().from(this.Entity).where({ ...where }).returning('*').execute();
  }

  public async upsertOne(item: T, conflictTarget: (keyof T)[]): Promise<T> {
    const criteria = conflictTarget.reduce<Partial<T>>((acc, key) => {
      (acc as any)[key] = item[key];
      return acc;
    }, {});
    const existingItem = await this.orm.findOneBy(criteria as any);
    const itemToSave = existingItem ? this.merge(existingItem, item) : item;
    return this.orm.save(itemToSave, { reload: true });
  }

  public override async findOne(options?: FindOneOptions<T>): Promise<T | null> {
    const alias = this.orm.metadata.name;
    return this.createQueryBuilder(alias).setFindOptions(options ?? {}).getOne();
  }

  public override async findOneBy(where: Parameters<Repository<T>['findOneBy']>[0]): Promise<T | null> {
    const alias = this.orm.metadata.name;
    return this.createQueryBuilder(alias).setFindOptions({ where }).getOne();
  }

  public async findOneOrThrowException(options?: FindOneOptions<T>): Promise<T> {
    const entity = await this.findOne(options);
    if (!entity) {
      throw new EntityNotFoundException({ entity: this.Entity, ctx: options });
    }
    return entity;
  }

  public async findOrThrowException(options?: FindManyOptions<T>): Promise<T[]> {
    const entities = await this.find(options);
    if (!entities.length) {
      throw new EntityNotFoundException({ entity: this.Entity, ctx: options });
    }
    return entities;
  }

  public async getOneById(id: string): Promise<T | null> {
    return this.createQueryBuilder('entity').where('entity.id = :id', { id }).getOne();
  }

  public async getOneByIdOrFail(id: string): Promise<T> {
    const entity = await this.getOneById(id);
    if (!entity) {
      throw new EntityNotFoundException({ entity: this.Entity, ctx: { id } });
    }
    return entity;
  }

  public async getOneBy(conditions: Partial<Record<keyof T, T[keyof T]>>): Promise<T | null> {
    const qb = this.buildConditionsQuery(conditions);
    return qb ? qb.getOne() : null;
  }

  public async getOneByOrFail(conditions: Partial<Record<keyof T, T[keyof T]>>): Promise<T> {
    const entity = await this.getOneBy(conditions);
    if (!entity) {
      throw new EntityNotFoundException({ entity: this.Entity, ctx: conditions });
    }
    return entity;
  }

  private buildConditionsQuery(
    conditions: Partial<Record<keyof T, T[keyof T]>>,
  ): SelectQueryBuilder<T> | null {
    const entries = Object.entries(conditions);
    if (entries.length === 0) return null;
    const qb = this.createQueryBuilder('entity');
    for (const [key, value] of entries) {
      qb.andWhere(`entity.${key} = :${key}`, { [key]: value });
    }
    return qb;
  }
}
