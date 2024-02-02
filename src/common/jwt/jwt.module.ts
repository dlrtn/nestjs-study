import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { EnvService } from '../env/env.service';

@Module({
  providers: [
    {
      provide: JwtService,
      useValue: new JwtService(new EnvService()),
    },
  ],
  exports: [JwtModule],
})
export class JwtModule {}
