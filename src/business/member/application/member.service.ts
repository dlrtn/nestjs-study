import { Injectable } from '@nestjs/common';
import { Member } from '../domain/member.entity';
import { MemberRepository } from '../repository/member.repository';
import { MemberRegisterRequestDto } from '../model/dto/member-register-request.dto';
import { MemberLoginRequestDto } from '../model/dto/member-login-request.dto';
import { MemberAuthService } from './member-auth.service';
import { MemberValidService } from './member-valid.service';

@Injectable()
export class MemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly memberAuthService: MemberAuthService,
    private readonly memberValidService: MemberValidService,
  ) {}

  async findAll(): Promise<Member[]> {
    return await this.memberRepository.findAll();
  }

  async register(
    memberRegisterRequestDto: MemberRegisterRequestDto,
  ): Promise<Member> {
    return await this.memberRepository.save(
      Member.of(
        memberRegisterRequestDto.email,
        memberRegisterRequestDto.password,
        memberRegisterRequestDto.nickname,
        memberRegisterRequestDto.phoneNumber,
      ),
    );
  }

  async login(request: MemberLoginRequestDto): Promise<string> {
    const member = await this.memberRepository.findByEmail(request.email);
    this.memberValidService.validateCredentials(member, request);

    const memberJwtDto = this.memberAuthService.generateMemberJwtDto(member);
    await this.memberAuthService.saveRefreshToken(member, memberJwtDto);
    return memberJwtDto.getAccessToken();
  }
}
