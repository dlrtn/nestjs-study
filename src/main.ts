import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './common/env/env.service';
import { SwaggerService } from './common/swagger/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envService = app.get<EnvService>(EnvService);
  const swaggerService = new SwaggerService(envService);

  swaggerService.setUpSwagger(app);

  const port = envService.get('SERVER_PORT');
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

void bootstrap();
