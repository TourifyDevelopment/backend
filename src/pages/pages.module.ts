import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { Page, PageSchema } from './schemas/pages.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Page', schema: PageSchema }])],
    controllers: [PagesController],
    providers: [PagesService],
})
export class PagesModule {}
