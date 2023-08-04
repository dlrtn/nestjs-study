import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../repository/member.repository';
import { Member } from '../domain/member.entity';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async findAll(): Promise<Member[]> {
    return await this.memberRepository.findAll();
  }
}
