import { Module } from '@nestjs/common';
import { MemberController } from './api/member.controller';
import { MemberService } from './application/member.service';
import { MemberRepository } from './repository/member.repository';
import { JwtModule } from '../../common/jwt/jwt.module';
import { RedisModule } from '../../common/redis/redis.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    JwtModule,
    RedisModule,
    CacheModule.register({
      url: process.env.REDIS_URL,
      ttl: 31557600,
    }),
  ],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
})
export class MemberModule {}
