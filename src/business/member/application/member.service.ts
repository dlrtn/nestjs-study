import { BadRequestException, Injectable } from '@nestjs/common';
import { Member } from '../domain/member.entity';
import { MemberRepository } from '../repository/member.repository';
import { MemberRegisterRequestDto } from '../dto/member-register-request.dto';
import { MemberLoginRequestDto } from '../dto/member-login-request.dto';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { EnvService } from '../../../common/env/env.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MemberService {
  constructor(
    private readonly envService: EnvService,
    private readonly memberRepository: MemberRepository,
    private readonly jwtService: JwtService,
    @InjectRedis('refreshTokenRedis') private readonly refreshTokenRedis: Redis,
  ) {}

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

  async login(request: MemberLoginRequestDto): Promise<string> {
    const member = await this.memberRepository.findByEmail(request.email);

    if (member == null || member.checkPassword(request.password) === false) {
      throw new BadRequestException('입력 정보가 부정확합니다.');
    }
    const memberId = member.getMemberId();

    const accessToken = this.jwtService.sign(
      { memberId },
      {
        expiresIn: this.envService.get('ACCESS_EXPIRES_IN'),
      },
    );
    const refreshToken = this.jwtService.sign(
      { memberId },
      {
        expiresIn: this.envService.get('REFRESH_EXPIRES_IN'),
      },
    );

    await this.refreshTokenRedis.set(
      memberId,
      refreshToken,
      'EX',
      this.envService.get('REFRESH_TOKEN_REDIS_TTL'),
    );

    return accessToken;
  }
}
