import {Controller, Get, Res} from '@nestjs/common';
import {Response} from 'express';
import {ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {MemberService} from "../application/member.service";

@Controller('/api/members')
@ApiTags('사용자 API')
export class MemberController {
    constructor(private readonly memberService: MemberService) {
    };

    @Get()
    @ApiOperation({summary: '모든 사용자 조회 API'})
    @ApiOkResponse({description: '모든 사용자를 조회한다.'})
    async findAll(@Res() res: Response) {
        const memberList = await this.memberService.findAll();
        return res.json({ message: '모든 사용자를 조회한다.', memberList: memberList });
    }
}
