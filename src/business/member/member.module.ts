import {Module} from "@nestjs/common";
import {MemberController} from "./api/member.controller";
import {MemberService} from "./application/member.service";
import {MemberRepository} from "./repository/member.repository";

@Module({
    controllers: [MemberController],
    providers: [MemberService, MemberRepository],
})
export class MemberModule {
}