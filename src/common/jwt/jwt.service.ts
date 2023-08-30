import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { EnvService } from '../env/env.service';

@Injectable()
export class JwtService {
  constructor(private envService: EnvService) {}

  public generateAccessToken(payload: string): string {
    return jwt.sign({ userId: payload }, this.envService.get('JWT_SECRET'), {
      expiresIn: this.envService.get('ACCESS_EXPIRES_IN'),
    });
  }

  public generateRefreshToken(payload: string): string {
    return jwt.sign({ userId: payload }, this.envService.get('JWT_SECRET'), {
      expiresIn: this.envService.get('REFRESH_EXPIRES_IN'),
    });
  }

  public verifyToken(token: string) {
    return jwt.verify(token, this.envService.get('JWT_SECRET'));
  }

  public decodeToken(token: string) {
    return jwt.decode(token);
  }
}
