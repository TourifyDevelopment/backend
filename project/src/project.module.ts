import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from './project.controller';
import { ProjectService } from './services/project.service';
import { ProjectSchema } from './schemas/project.schema';
import { MongoConfigService } from './services/config/mongo-config.service';
import { WinstonModule } from 'nest-winston';
import { SeqTransport } from '@datalust/winston-seq';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [],
            useClass: MongoConfigService,
        }),
        MongooseModule.forFeature([
            {
                name: 'Project',
                schema: ProjectSchema,
            },
        ]),
        WinstonModule.forRoot({
            transports: [
                new SeqTransport({
                    serverUrl: 'http://seq:5341',
                    onError: (e) => {
                        console.error(e);
                    },
                }),
            ],
        }),
    ],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule { }
