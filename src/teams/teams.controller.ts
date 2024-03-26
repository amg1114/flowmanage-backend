import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {}

    @Get(':user')
    getUserTeams(@Param('user', ParseIntPipe) user: number) {
        return this.teamsService.getUserTeams(user);
    }

    @Post(':workflow')
    createWorkflowTeam(@Param('workflow', ParseIntPipe) workflow: number, @Body() teamFields: CreateTeamDto) {
        return this.teamsService.createWorkflowTeam(workflow, teamFields);
    }

    @Patch(':id')
    updateTeam(@Param('id', ParseIntPipe) id: number, @Body() teamFields: UpdateTeamDto) {
        return this.teamsService.updateTeam(id, teamFields);
    }

    @Delete(':id')
    deleteTeam(@Param('id', ParseIntPipe) id: number) {
        return this.teamsService.deleteTeam(id);
    }
}
