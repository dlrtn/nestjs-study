import { Module } from '@nestjs/common';
import { MemberController } from './business/member/api/member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig)],
  controllers: [MemberController],
  providers: [],
})
export class AppModule {}
