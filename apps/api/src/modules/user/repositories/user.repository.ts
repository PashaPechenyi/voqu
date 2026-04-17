import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../../../database/entities/user.entity';
import { BaseRepository } from '../../../database/repositories/base.repository';
import { RoleSlug } from '../../role/structs/role-slug.enum';

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
