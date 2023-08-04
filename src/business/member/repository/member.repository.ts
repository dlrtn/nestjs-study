import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MemberEntity } from '../domain/member.entity';

@Injectable()
export class MemberRepository extends Repository<MemberEntity> {
  constructor(private dataSource: DataSource) {
    super(MemberEntity, dataSource.createEntityManager());
  }

  async findAll(): Promise<MemberEntity[]> {
    return await this.find();
  }
}
