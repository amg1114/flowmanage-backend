import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { RequestsModule } from './requests/requests.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(DataSourceConfig), ProjectsModule, RequestsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
