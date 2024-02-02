import { MemberValidService } from '../../../src/business/member/application/member-valid.service';
import { MemberLoginRequestDto } from '../../../src/business/member/model/dto/member-login-request.dto';
import { Member } from '../../../src/business/member/domain/member.entity';
import { AuthenticationException } from '../../../src/business/member/model/exception/authentication.exception';
import { Test } from '@nestjs/testing';
import { MemberFixture } from '../fixture';

describe('MemberValidService', () => {
  let memberValidService: MemberValidService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MemberValidService],
    }).compile();

    memberValidService = moduleRef.get<MemberValidService>(MemberValidService);
  });

  it('유효한 사용자가 아닌 경우, 예외 발생', () => {
    const member = null;
    const request = MemberLoginRequestDto.of(
      MemberFixture.email,
      MemberFixture.password,
    );

    expect(() =>
      memberValidService.validateCredentials(member, request),
    ).toThrow(AuthenticationException);
  });

  it('유효한 사용자이나 비밀번호가 일치하지 않는 경우', () => {
    const member = Member.of(
      MemberFixture.email,
      MemberFixture.password,
      MemberFixture.nickname,
      MemberFixture.phoneNumber,
    );
    const request = MemberLoginRequestDto.of(
      MemberFixture.email,
      MemberFixture.incorrectPassword,
    );

    expect(() =>
      memberValidService.validateCredentials(member, request),
    ).toThrow(AuthenticationException);
  });

  it('유효한 사용자이면서 비밀번호도 일치하는 경우', () => {
    const member = Member.of(
      MemberFixture.email,
      MemberFixture.password,
      MemberFixture.nickname,
      MemberFixture.phoneNumber,
    );
    const request = MemberLoginRequestDto.of(
      MemberFixture.email,
      MemberFixture.password,
    );

    expect(() =>
      memberValidService.validateCredentials(member, request),
    ).not.toThrow();
  });
});
