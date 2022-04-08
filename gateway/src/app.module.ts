import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';

import { ProjectsController } from './projects.controller';

import { AuthGuard } from './services/guards/auth.guard';

import { ConfigService } from './services/config/config.service';

@Module({
  imports: [],
  controllers: [ProjectsController],
  providers: [
    ConfigService,
    {
      provide: 'PROJECT_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('projectService'));
      },
      inject: [ConfigService],
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}