import { NestFactory } from '@nestjs/core';
import { AppModule } from './main.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const port = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Fiap Pos Tech Challenge')
    .setDescription('Restaurante API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
