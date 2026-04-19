import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

type Constructor<M> = new (...args: any[]) => M;

export type FieldsMap = Readonly<Record<string, string>>;

export type PaginationMode = 'limit-offset' | 'take-skip';

export enum SearchMode {
  Contains = 'CONTAINS',
  StartWith = 'START_WITH',
  EndWith = 'END_WITH',
}

export interface Sort {
  field: string;
  direction: 'ASC' | 'DESC';
}

export interface SearchInput {
  value: string;
  fields: string[];
  mode?: SearchMode;
  isCaseSensitive?: boolean;
}

export class ListQueryBuilder<T extends ObjectLiteral> {
  constructor(queryBuilder: SelectQueryBuilder<T>, fieldsMap: FieldsMap = {}) {
    this.queryBuilder = queryBuilder;
    this.fieldsMap = fieldsMap;
    this.paginationMode = 'take-skip';
  }

  private queryBuilder: SelectQueryBuilder<T>;

  private readonly fieldsMap: FieldsMap;

  private model?: Constructor<unknown>;

  private paginationMode: PaginationMode;

  public setPagination(
    { page, limit }: { page?: number; limit?: number },
    mode?: PaginationMode,
  ): this {
    if (mode) this.paginationMode = mode;
    const [limitFn, offsetFn] = this.paginationMode.split('-') as [
      'limit' | 'take',
      'offset' | 'skip',
    ];
    if (limit) this.queryBuilder[limitFn](limit);
    if (page && limit) this.queryBuilder[offsetFn]((page - 1) * limit);
    return this;
  }

  public setSorts(sorts?: Sort[]): this {
    if (!sorts?.length) return this;
    for (const { field, direction } of sorts) {
      this.queryBuilder.addOrderBy(this.getFieldOrFail(field), direction);
    }
    return this;
  }

  public setSearch(search?: SearchInput): this {
    if (!search?.value || !search.fields?.length) return this;

    const mode = search.mode ?? SearchMode.Contains;
    const operator = search.isCaseSensitive ? 'LIKE' : 'ILIKE';
    const param = this.wrapSearchValue(search.value, mode);
    const clauses = search.fields.map(
      (field) => `CAST(${this.getFieldOrFail(field)} AS text) ${operator} :search`,
    );

    this.queryBuilder.andWhere(`(${clauses.join(' OR ')})`, { search: param });
    return this;
  }

  public mapToClass<C>(constructor: Constructor<C>) {
    this.model = constructor;
    return {
      getMany: () => this.getMany().then<C[]>((rows) => this.remapList<C>(rows)),
      getManyAndCount: () =>
        this.getManyAndCount().then<[C[], number]>(([rows, total]) => [
          this.remapList<C>(rows),
          total,
        ]),
    };
  }

  public getMany() {
    return this.queryBuilder.getMany();
  }

  public getManyAndCount() {
    return this.queryBuilder.getManyAndCount();
  }

  private getFieldOrFail(field: string): string {
    const actualField = this.fieldsMap[field];
    if (!actualField) {
      throw new Error(`Unknown field "${field}" used in ${ListQueryBuilder.name}`);
    }
    return actualField;
  }

  private wrapSearchValue(value: string, mode: SearchMode): string {
    switch (mode) {
      case SearchMode.StartWith:
        return `${value}%`;
      case SearchMode.EndWith:
        return `%${value}`;
      case SearchMode.Contains:
      default:
        return `%${value}%`;
    }
  }

  private remapList<C>(items: T[]): C[] {
    return items.map((item) => this.remap<C>(item));
  }

  private remap<C>(item: T): C {
    if (!this.model) {
      throw new Error('ListQueryBuilder: mapToClass must be called before remapping rows');
    }
    return new this.model(item) as C;
  }
}
