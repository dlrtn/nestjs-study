import {Module} from '@nestjs/common';
import {EnvService} from "./env.service";

@Module({
    providers: [
        {
            provide: EnvService,
            useValue: new EnvService( __dirname + '/default.env'),
        },
    ],
    exports: [EnvService],
})
export class EnvModule {
}