import { Module } from '@nestjs/common';
import { MemberController } from './api/member.controller';
import { MemberService } from './application/member.service';
import { MemberRepository } from './repository/member.repository';
import { JwtModule } from '../../common/jwt/jwt.module';
import { EnvService } from '../../common/env/env.service';
import { EnvModule } from '../../common/env/env.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    JwtModule,
    EnvModule,
    CacheModule.register({
      url: new EnvService().get('REFRESH_TOKEN_REDIS_URL'),
    }),
  ],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
})
export class MemberModule {}
