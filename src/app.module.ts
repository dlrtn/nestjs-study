import {Module} from '@nestjs/common';
import {MemberController} from './business/member/api/member.controller';
import {DatabaseModule} from "./common/database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [MemberController],
    providers: [],
})
export class AppModule {
}
