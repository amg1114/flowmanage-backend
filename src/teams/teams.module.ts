import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), UsersModule, ProjectsModule],
  controllers: [TeamsController],
  providers: [TeamsService, UsersService],
  exports: [TeamsService, TypeOrmModule],
})
export class TeamsModule {}
