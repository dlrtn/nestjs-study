import { Global, Module } from '@nestjs/common';
import { EnvModule } from '../env/env.module';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [EnvModule],
  controllers: [],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
