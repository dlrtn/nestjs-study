import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MemberService } from '../application/member.service';
import { MemberRegisterRequestDto } from '../model/dto/member-register-request.dto';
import { MemberLoginRequestDto } from '../model/dto/member-login-request.dto';
import { OkResponse } from '../../../common/response/success/ok-response';
import { CreatedResponse } from '../../../common/response/success/created-response';

@Controller('/api/members')
@ApiTags('사용자 API')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @ApiOperation({ summary: '모든 사용자 조회 API' })
  @ApiOkResponse({ description: '모든 사용자를 조회한다.' })
  async findAll(@Res() res: Response) {
    const memberList = await this.memberService.findAll();

    return OkResponse.of(res, '사용자 조회에 성공했습니다.', memberList);
  }

  @Post()
  @ApiOperation({ summary: '사용자 생성 API' })
  @ApiOkResponse({ description: '사용자를 생성한다.' })
  async create(
    @Res() res: Response,
    @Body() request: MemberRegisterRequestDto,
  ) {
    const member = await this.memberService.register(request);

    return CreatedResponse.of(res, '사용자 생성에 성공했습니다.', member);
  }

  @Post('/login')
  @ApiOperation({ summary: '사용자 로그인 API' })
  @ApiOkResponse({ description: '사용자 인증을 통해 사용자 정보를 반환한다.' })
  async login(@Res() res: Response, @Body() request: MemberLoginRequestDto) {
    const accessToken = await this.memberService.login(request);

    return OkResponse.of(res, '사용자 로그인에 성공했습니다.', accessToken);
  }
}
