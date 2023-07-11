import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { API, MEMBER } from '../../../common/constants/UrlPrefix';

@Controller(API + MEMBER)
@ApiTags('사용자 API')
export class MemberController {
  @Get()
  @ApiOperation({ summary: '모든 사용자 조회 API' })
  @ApiOkResponse({ description: '모든 사용자를 조회한다.' })
  async findAll(@Res() res: Response) {
    return res.send('모든 사용자를 조회한다.');
  }
}
