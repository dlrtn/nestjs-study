import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { CacheModule } from '@nestjs/cache-manager';
import { MemberModule } from './business/member/member.module';

@Module({
  imports: [
    MemberModule,
    DatabaseModule,
    CacheModule.register({
      url: process.env.REDIS_URL,
      ttl: 31557600,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
