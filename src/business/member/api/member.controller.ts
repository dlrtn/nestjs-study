import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MemberService } from '../application/member.service';
import { MemberRegisterRequestDto } from '../dto/member-register-request.dto';

@Controller('/api/members')
@ApiTags('사용자 API')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @ApiOperation({ summary: '모든 사용자 조회 API' })
  @ApiOkResponse({ description: '모든 사용자를 조회한다.' })
  async findAll(@Res() res: Response) {
    const memberList = await this.memberService.findAll();
    return res.json({
      message: '모든 사용자를 조회한다.',
      memberList: memberList,
    });
  }

  @Post()
  @ApiOperation({ summary: '사용자 생성 API' })
  @ApiOkResponse({ description: '사용자를 생성한다.' })
  async create(
    @Res() res: Response,
    @Body() request: MemberRegisterRequestDto,
  ) {
    const member = await this.memberService.register(request);

    return res.json({
      message: '사용자를 생성한다.',
      member: member,
    });
  }
}
