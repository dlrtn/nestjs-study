import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { EnvService } from '../env/env.service';

@Injectable()
export class JwtService {
  constructor(private envService: EnvService) {}

  public generateJsonWebToken(payload: unknown, expiresIn: string): string {
    return jwt.sign({ userId: payload }, this.envService.get('JWT_SECRET'), {
      expiresIn: expiresIn,
    });
  }

  public verifyToken(token: string) {
    return jwt.verify(token, this.envService.get('JWT_SECRET'));
  }

  public decodeToken(token: string) {
    return jwt.decode(token);
  }
}
