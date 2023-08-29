import { MemberService } from '../../src/business/member/application/member.service';
import { MemberRepository } from '../../src/business/member/repository/member.repository';
import { Test } from '@nestjs/testing';
import { JwtService } from '../../src/common/jwt/jwt.service';
import { Member } from '../../src/business/member/domain/member.entity';
import { EnvService } from '../../src/common/env/env.service';
import { getRedisToken } from '@liaoliaots/nestjs-redis';

describe('MemberService 테스트', () => {
  let memberService: MemberService;
  let mockMemberRepository: jest.Mocked<MemberRepository>;
  let mockJwtService: jest.Mocked<JwtService>;
  let mockEnvService: jest.Mocked<EnvService>;
  let mockMember: jest.Mocked<Member>;
  let set: jest.Mock;

  beforeEach(async () => {
    set = jest.fn();

    const module = await Test.createTestingModule({
      providers: [
        MemberService,
        {
          provide: EnvService,
          useValue: {
            get: jest.fn().mockReturnValue('test'),
          },
        },
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
            save: jest.fn().mockResolvedValue({
              id: 1,
            }),
            findByEmail: jest.fn().mockResolvedValue(mockMember),
          },
        },
        {
          provide: JwtService,
          useValue: {
            generateAccessToken: jest.fn().mockReturnValue('accessToken'),
            generateRefreshToken: jest.fn().mockReturnValue('refreshToken'),
          },
        },
        {
          provide: Member,
          useValue: {
            getMemberId: jest.fn().mockReturnValue(1),
            getPassword: jest.fn().mockReturnValue('test'),
          },
        },
        {
          provide: getRedisToken('refreshTokenRedis'),
          useValue: {
            set,
          },
        },
      ],
    }).compile();

    memberService = module.get<MemberService>(MemberService);
    mockMemberRepository = module.get(MemberRepository);
    mockJwtService = module.get(JwtService);
    mockMember = module.get(Member);
    mockEnvService = module.get(EnvService);
  });

  describe('사용자 조회 관련 기능 검증', () => {
    it('모든 사용자를 조회한다.', async () => {
      const memberList = await memberService.findAll();
      expect(memberList.length).toBeGreaterThan(0);
      expect(mockMemberRepository.findAll).toBeCalledTimes(1);
    });
  });

  describe('사용자 생성 관련 기능 검증', () => {
    it('사용자를 생성한다.', async () => {
      const member = await memberService.register({
        email: 'test@test.test',
        password: 'test',
        nickname: 'test',
        phoneNumber: '010-1234-5678',
      });

      expect(member).toBeDefined();
      expect(mockMemberRepository.save).toBeCalledTimes(1);
    });
  });

  describe('사용자 로그인 관련 기능 검증', () => {
    it('사용자 인증을 통해 사용자 정보를 반환한다.', async () => {
      const accessToken = await memberService.login({
        email: 'test@test.test',
        password: 'test',
      });

      expect(accessToken).toBeDefined();
      expect(accessToken).toBe('accessToken');
      expect(set).toHaveBeenCalledTimes(1);
      expect(mockEnvService.get).toHaveBeenCalledTimes(1);
      expect(mockJwtService.generateAccessToken).toBeCalledTimes(1);
      expect(mockJwtService.generateRefreshToken).toBeCalledTimes(1);
    });
  });
});
