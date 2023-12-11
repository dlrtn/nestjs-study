import { Injectable } from '@nestjs/common';
import { MemberLoginRequestDto } from '../model/dto/member-login-request.dto';
import { Member } from '../domain/member.entity';
import { AuthenticationException } from '../model/exception/authentication.exception';

@Injectable()
export class MemberValidService {
  public validateCredentials(
    member: Member,
    request: MemberLoginRequestDto,
  ): void {
    if (this.memberExists(member) || this.isPasswordCorrect(member, request)) {
      throw AuthenticationException.of();
    }
  }

  private isPasswordCorrect(member: Member, request: MemberLoginRequestDto) {
    return member.getPassword() !== request.password;
  }

  private memberExists(member: Member) {
    return !member;
  }
}
