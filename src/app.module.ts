import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { MemberModule } from './business/member/member.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { EnvService } from './common/env/env.service';

@Module({
  imports: [
    MemberModule,
    DatabaseModule,
    RedisModule.forRoot({
      readyLog: true,
      config: [
        {
          namespace: 'refreshTokenRedis',
          url: new EnvService().get('REFRESH_TOKEN_REDIS_URL'),
        },
      ],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
