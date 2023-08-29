import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { MemberModule } from './business/member/member.module';
import { EnvService } from './common/env/env.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    MemberModule,
    DatabaseModule,
    RedisModule.forRoot({
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
