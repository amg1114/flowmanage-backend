import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/common/enums/user-roles';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('teams')
@UseGuards(RolesGuard)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.createTeam(createTeamDto);
  }
  
  @Roles(Role.ADMIN, Role.MANAGER)
  @Post('members')
  addMember(@Body() addMemberDto: AddMemberDto) {
    return this.teamsService.addTeamMember(addMemberDto);
  }
  
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.teamsService.findAllTeams();
  }
  
  @Roles(Role.ADMIN, Role.MANAGER)
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.teamsService.findOneTeam(slug);
  }
  
  @Roles(Role.ADMIN, Role.MANAGER)
  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.updateTeam(slug, updateTeamDto);
  }
  
  @Roles(Role.ADMIN)
  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.teamsService.deleteTeam(slug);
  }
}
