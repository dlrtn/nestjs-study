import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {setupSwagger} from './config/swagger/SwaggerConfig';
import {EnvService} from "./common/env/env.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const envService = app.get<EnvService>(EnvService);

    setupSwagger(app);

    const port = envService.get('SERVER_PORT');
    await app.listen(port);

    console.log(`Application is running on: ${await app.getUrl()}`);
}

void bootstrap();
