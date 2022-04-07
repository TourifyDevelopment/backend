import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContainerController } from './container.controller';
import { ContainerService } from './container.service';
import { Container, ContainerSchema } from './schemas/container.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Container', schema: ContainerSchema },
        ]),
    ],
    controllers: [ContainerController],
    providers: [ContainerService],
})
export class ContainerModule {}
