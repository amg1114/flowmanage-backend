import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { ProjectsService } from 'src/projects/projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from 'src/projects/projects.module';
import { Request } from './request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Request]), ProjectsModule],
  controllers: [RequestsController],
  providers: [RequestsService, ProjectsService]
})
export class RequestsModule {}
