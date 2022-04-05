import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PagesModule } from './pages/pages.module';
import { ResourcesModule } from './resources/resources.module';
import { ContainerModule } from './container/container.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { AppLoggerMiddleware } from './utils/logger.middleware';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { SeqTransport } from '@datalust/winston-seq';

@Module({
    imports: [
        PagesModule,
        ResourcesModule,
        ContainerModule,
        ProjectsModule,
        AuthModule,
        UsersModule,
        ConfigModule.forRoot({
            isGlobal: true
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('DB_URL'),
            }),
            inject: [ConfigService],
        }),
        PrometheusModule.register(),
        WinstonModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                transports: [
                    new SeqTransport({
                        serverUrl: "http://seq:5341",
                        onError: (e => { console.error(e) }),
                    })
                ],
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AppLoggerMiddleware).forRoutes('*'); 
    } 
}
