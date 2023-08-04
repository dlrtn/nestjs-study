import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { MemberModule } from './business/member/member.module';

@Module({
  imports: [MemberModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
