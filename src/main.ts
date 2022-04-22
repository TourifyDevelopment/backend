import { Inject, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true
    });

    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Tourify-Backend')
        .setDescription('API description of the Tourify Backend')
        .setVersion('1.0')
        .addTag('container')
        .addTag('pages')
        .addTag('projects')
        .addTag('resources')
        .addTag('users')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    app.enableShutdownHooks();

    await app.listen(80);
}
bootstrap();
