import { BadRequestException, Injectable } from '@nestjs/common';
import { Member } from '../domain/member.entity';
import { MemberRepository } from '../repository/member.repository';
import { MemberRegisterRequestDto } from '../dto/member-register-request.dto';
import { MemberLoginRequestDto } from '../dto/member-login-request.dto';
import { JwtService } from '../../../common/jwt/jwt.service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { EnvService } from '../../../common/env/env.service';

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

    if (!member || member.getPassword() !== request.password) {
      throw new BadRequestException('입력 정보가 부정확합니다.');
    }
    const memberId = member.getMemberId();

    const accessToken = this.jwtService.generateAccessToken(memberId);
    const refreshToken = this.jwtService.generateRefreshToken(memberId);

    await this.refreshTokenRedis.set(
      memberId,
      refreshToken,
      'EX',
      this.envService.get('REFRESH_TOKEN_REDIS_TTL'),
    );

    return accessToken;
  }
}
