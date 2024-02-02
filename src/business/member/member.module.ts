import { Module } from '@nestjs/common';
import { MemberController } from './api/member.controller';
import { MemberService } from './application/member.service';
import { MemberRepository } from './repository/member.repository';
import { EnvModule } from '../../common/env/env.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../common/passport/strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { EnvService } from '../../common/env/env.service';
import { JwtStrategy } from '../../common/passport/strategy/jwt.strategy';
import { MemberValidService } from './application/member-valid.service';
import { MemberAuthService } from './application/member-auth.service';
import { JwtService } from '../../common/jwt/jwt.service';

@Module({
  controllers: [MemberController],
  imports: [
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        secret: envService.get('JWT_SECRET'),
      }),
    }),
    EnvModule,
    PassportModule,
  ],
  providers: [
    MemberService,
    MemberValidService,
    MemberAuthService,
    MemberRepository,
    LocalStrategy,
    JwtStrategy,
    JwtService,
  ],
})
export class MemberModule {}
