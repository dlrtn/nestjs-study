import { Injectable } from '@nestjs/common';
import { MemberLoginRequestDto } from '../model/dto/member-login-request.dto';
import { Member } from '../domain/member.entity';
import { AuthenticationException } from '../model/exception/authentication.exception';

@Injectable()
export class MemberValidService {
  public validateCredentials(
    member: Member,
    memberLoginRequestDto: MemberLoginRequestDto,
  ): void {
    if (
      this.memberExists(member) ||
      this.isPasswordCorrect(member, memberLoginRequestDto)
    ) {
      throw AuthenticationException.of();
    }
  }

  private memberExists(member: Member) {
    return !member;
  }

  private isPasswordCorrect(member: Member, request: MemberLoginRequestDto) {
    return member.getPassword() !== request.password;
  }
}
