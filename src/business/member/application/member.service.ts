import { Injectable } from '@nestjs/common';
import { Member } from '../domain/member.entity';
import { MemberRepository } from '../repository/member.repository';
import { MemberRegisterRequestDto } from '../dto/member-register-request.dto';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async findAll(): Promise<Member[]> {
    return await this.memberRepository.findAll();
  }

  async register(request: MemberRegisterRequestDto): Promise<Member> {
    const member = new Member(
      request.email,
      request.password,
      request.nickname,
      request.phoneNumber,
    );

    return await this.memberRepository.save(member);
  }
}
