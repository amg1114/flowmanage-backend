import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { DataSourceConfig } from './config/data.source';

import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(DataSourceConfig), ProjectsModule, UsersModule, TeamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
