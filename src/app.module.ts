import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PagesModule } from './pages/pages.module';
import { ResourcesModule } from './resources/resources.module';
import { ContainerModule } from './container/container.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

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
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
