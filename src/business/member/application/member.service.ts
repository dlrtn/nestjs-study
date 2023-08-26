import { Inject, Injectable } from '@nestjs/common';
import { Member } from '../domain/member.entity';
import { MemberRepository } from '../repository/member.repository';
import { MemberRegisterRequestDto } from '../dto/member-register-request.dto';
import { MemberLoginRequestDto } from '../dto/member-login-request.dto';
import { JwtService } from '../../../common/jwt/jwt.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class MemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly jwtService: JwtService,
    // private readonly redisService: RedisService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
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

  async login(request: MemberLoginRequestDto) {
    const member = await this.memberRepository.findByEmail(request.email);

    if (!member || member.getPassword() !== request.password) {
      throw new Error('입력 정보가 부정확합니다.');
    }

    const accessToken = this.jwtService.generateAccessToken(
      member.getMemberId(),
    );
    const refreshToken = this.jwtService.generateRefreshToken(
      member.getMemberId(),
    );

    // await this.redisService.set(refreshToken, member.getMemberId());
    await this.cacheManager.set(refreshToken, member.getMemberId());

    return accessToken;
  }
}
