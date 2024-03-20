/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors'
import { NestExpressApplication } from '@nestjs/platform-express';
// import path from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.use(path.join(__dirname,"./public"))

  const config = new DocumentBuilder()
  .setTitle('Duabi Crypto')
  .setDescription('The Dubai Crypto API description')
  .setVersion('1.0.0')
  .addBasicAuth({type:'http',scheme:'bearer',bearerFormat:"jwt"},"jwt")
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 8000;
  app.use(cors({
    origin:'*'
  }))
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
