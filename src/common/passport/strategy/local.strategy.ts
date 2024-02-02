import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { MemberService } from '../../../business/member/application/member.service';
import { Injectable } from '@nestjs/common';
import { MemberLoginRequestDto } from '../../../business/member/model/dto/member-login-request.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly memberService: MemberService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    return await this.memberService.login(
      new MemberLoginRequestDto(email, password),
    );
  }
}
