import { Module } from '@nestjs/common';
import { MemberController } from './business/member/api/member.controller';

@Module({
  imports: [],
  controllers: [MemberController],
  providers: [],
})
export class AppModule {}
