import { Global, Module } from '@nestjs/common';
import { EnvModule } from '../env/env.module';
import { JwtService } from './jwt.service';

@Global()
@Module({
  imports: [EnvModule],
  controllers: [],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
