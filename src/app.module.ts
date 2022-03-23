import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PagesModule } from './pages/pages.module';
import { ResourcesModule } from './resources/resources.module';
import { ContainerModule } from './container/container.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';

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
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
