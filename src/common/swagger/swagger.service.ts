import { INestApplication, Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvService } from '../env/env.service';

@Injectable()
export class SwaggerService {
  constructor(private envService: EnvService) {}

  public setUpSwagger(app: INestApplication) {
    const document = this.setDocument(app);

    SwaggerModule.setup(this.envService.get('SWAGGER_PATH'), app, document);
  }

  private setOptions() {
    return new DocumentBuilder()
      .setTitle(this.envService.get('SWAGGER_TITLE'))
      .setDescription(this.envService.get('SWAGGER_DESCRIPTION'))
      .setVersion(this.envService.get('SWAGGER_VERSION'))
      .build();
  }

  private setDocument(app: INestApplication) {
    const options = this.setOptions();

    return SwaggerModule.createDocument(app, options);
  }
}
