import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MemberService } from '../application/member.service';
import { MemberRegisterRequestDto } from '../dto/member-register-request.dto';
import { MemberLoginRequestDto } from '../dto/member-login-request.dto';
import { Member } from '../domain/member.entity';
import { JwtAuthGuard } from '../../../common/passport/jwt.auth-guard';

@Controller('/api/members')
@ApiTags('사용자 API')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @ApiOperation({ summary: '모든 사용자 조회 API' })
  @ApiOkResponse({
    description: '모든 사용자를 조회한다.',
    type: Member,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard)
  async findAll(@Res() res: Response) {
    const memberList = await this.memberService.findAll();
    return res.status(HttpStatus.OK).json(memberList);
  }

  @Post()
  @ApiOperation({ summary: '사용자 생성 API' })
  @ApiCreatedResponse({
    description: '사용자를 생성한다.',
    type: Member,
    status: 201,
  })
  async create(
    @Res() res: Response,
    @Body() request: MemberRegisterRequestDto,
  ) {
    const createdMember = await this.memberService.register(request);

    return res.status(HttpStatus.CREATED).json(createdMember);
  }

  @Post('/login')
  @ApiOperation({ summary: '사용자 로그인 API' })
  @ApiOkResponse({
    description: '사용자 인증을 통해 Jwt 토큰을 반환한다.',
    type: String,
  })
  @ApiBadRequestResponse({
    description: '입력 정보가 부정확합니다.',
  })
  async login(@Res() res: Response, @Body() request: MemberLoginRequestDto) {
    const accessToken = await this.memberService.login(request);

    return res.status(HttpStatus.OK).json(accessToken);
  }
}
