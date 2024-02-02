import { Injectable } from '@nestjs/common';
import { MemberJwtDto } from '../model/dto/member-jwt.dto';
import { JwtService } from '../../../common/jwt/jwt.service';
import { EnvService } from '../../../common/env/env.service';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { Member } from '../domain/member.entity';

@Injectable()
export class MemberAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly envService: EnvService,
    @InjectRedis('refreshTokenRedis') private readonly refreshTokenRedis: Redis,
  ) {}

  public generateMemberJwtDto(member: Member): MemberJwtDto {
    return MemberJwtDto.of(
      this.jwtService.generateAccessToken(member.getMemberId()),
      this.jwtService.generateRefreshToken(member.getMemberId()),
    );
  }

  public async saveRefreshToken(
    member: Member,
    memberJwtDto: MemberJwtDto,
  ): Promise<void> {
    await this.refreshTokenRedis.set(
      member.getMemberId(),
      memberJwtDto.getRefreshToken(),
      'EX',
      this.envService.get('REFRESH_TOKEN_REDIS_TTL'),
    );
  }
}
