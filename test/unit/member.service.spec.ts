import { MemberService } from '../../src/business/member/application/member.service';
import { MemberRepository } from '../../src/business/member/repository/member.repository';
import { Test, TestingModule } from '@nestjs/testing';

describe('MemberService 테스트', () => {
  let memberService: MemberService;
  let memberRepository: MemberRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberService, MemberRepository],
    }).compile();

    memberService = module.get<MemberService>(MemberService);
    memberRepository = module.get<MemberRepository>(MemberRepository);
  });

  describe('사용자 조회 관련 기능 검증', () => {
    it('모든 사용자를 조회한다.', async () => {
      const memberList = await memberService.findAll();
      expect(memberList.length).toBeGreaterThan(0);
    });
  });
});
