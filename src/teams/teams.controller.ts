import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AddMemberDto } from './dto/add-member.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Post('members')
  addMember(@Body() addMemberDto: AddMemberDto) {
    return this.teamsService.addMember(addMemberDto);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.teamsService.findOne(slug);
  }

  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(slug, updateTeamDto);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.teamsService.remove(slug);
  }
}
