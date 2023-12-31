import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Member } from '../domain/member.entity';

@Injectable()
export class MemberRepository extends Repository<Member> {
  constructor(private dataSource: DataSource) {
    super(Member, dataSource.createEntityManager());
  }

  async findAll(): Promise<Member[]> {
    return await this.find();
  }

  async findByEmail(email: string): Promise<Member> {
    return await this.createQueryBuilder('member')
      .where('member.email = :email', { email })
      .getOne();
  }
}
