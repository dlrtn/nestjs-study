import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../repository/member.repository';
import { MemberEntity } from '../domain/member.entity';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async findAll(): Promise<MemberEntity[]> {
    return await this.memberRepository.findAll();
  }
}
