import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { MemberModule } from './business/member/member.module';
import { EnvService } from './common/env/env.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { EnvModule } from './common/env/env.module';

@Module({
  imports: [
    MemberModule,
    DatabaseModule,
    RedisModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        config: [
          {
            namespace: 'refreshTokenRedis',
            url: envService.get('REFRESH_TOKEN_REDIS_URL'),
          },
        ],
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
