import { MemberService } from '../../src/business/member/application/member.service';
import { MemberRepository } from '../../src/business/member/repository/member.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { MemberModule } from '../../src/business/member/member.module';
import { find } from 'rxjs';

describe('MemberService 테스트', () => {
  let memberService: MemberService;
  let mockMemberRepository: jest.Mocked<MemberRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberService,
        {
          provide: MemberRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
              },
            ]),
            find: jest.fn().mockResolvedValue([
              {
                id: 1,
              },
            ]),
          },
        },
      ],
    }).compile();

    memberService = module.get<MemberService>(MemberService);
  });

  describe('사용자 조회 관련 기능 검증', () => {
    it('모든 사용자를 조회한다.', async () => {
      const memberList = await memberService.findAll();
      expect(memberList.length).toBeGreaterThan(0);
    });
  });
});
