import { BadRequestException } from '@nestjs/common';

export class AuthenticationException extends BadRequestException {
  constructor() {
    super('입력 정보가 부정확합니다.');
  }

  public static of(): AuthenticationException {
    return new AuthenticationException();
  }
}
