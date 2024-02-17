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
    return this.teamsService.createTeam(createTeamDto);
  }

  @Post('members')
  addMember(@Body() addMemberDto: AddMemberDto) {
    return this.teamsService.addTeamMember(addMemberDto);
  }

  @Get()
  findAll() {
    return this.teamsService.findAllTeams();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.teamsService.findOneTeam(slug);
  }

  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.updateTeam(slug, updateTeamDto);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.teamsService.deleteTeam(slug);
  }
}
