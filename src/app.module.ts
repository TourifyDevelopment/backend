import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PagesModule } from './pages/pages.module';
import { ResourcesModule } from './resources/resources.module';
import { ContainerModule } from './container/container.module';

@Module({
  imports: [PagesModule, ResourcesModule, ContainerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
