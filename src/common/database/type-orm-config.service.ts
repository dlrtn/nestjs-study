import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {EnvService} from "../env/env.service";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private envService: EnvService) {
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: this.envService.get('DATABASE_TYPE') as any,
            host: this.envService.get('DATABASE_HOST'),
            port: parseInt(this.envService.get('DATABASE_PORT')),
            username: this.envService.get('DATABASE_USERNAME'),
            password: this.envService.get('DATABASE_PASSWORD'),
            database: this.envService.get('DATABASE_SCHEMA'),
            entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
            synchronize: this.envService.get('DATABASE_SYNCHRONIZE') === 'true',
            logging: this.envService.get('DATABASE_LOGGING') === 'true',
            extra: {
                ssl: {
                    rejectUnauthorized: this.envService.get('DATABASE_SSL_REJECT_UNAUTHORIZED') === 'true'
                }
            },
            namingStrategy: new SnakeNamingStrategy(),
        };
    }
}