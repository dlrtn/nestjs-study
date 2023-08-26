import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { CacheModule } from '@nestjs/cache-manager';
import { MemberModule } from './business/member/member.module';

@Module({
  imports: [
    MemberModule,
    DatabaseModule,
    CacheModule.register({
      url: 'redis://default:b9d36cd2bd3f4ba487d87a5ba6fea015@relieved-serval-44529.upstash.io:44529',
      ttl: 31557600,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
