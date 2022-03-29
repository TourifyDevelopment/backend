import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Tourify-Backend')
        .setDescription('API description of the Tourify Backend')
        .setVersion('1.0')
        .addTag('Tourify')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    app.enableShutdownHooks();

    await app.listen(80);
}
bootstrap();
