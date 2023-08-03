import * as dotenv from "dotenv";

import * as process from "process";
import * as fs from "fs";

export class EnvService {
    private readonly envConfig: { [key: string]: string };

    constructor(filePath: string = 'default.env') {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }

    get nodeEnv(): string {
        return process.env.NODE_ENV || 'development';
    }

    get(key: string): string {
        return this.envConfig[key];
    }

    isEnv(env: string): boolean {
        return this.nodeEnv === env;
    }
}